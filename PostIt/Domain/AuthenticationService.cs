using Microsoft.AspNetCore.Mvc;
using PostIt.Controllers.API;
using PostIt.Controllers.utils;
using PostIt.Models;

namespace PostIt.Domain;

public class AuthenticationService
{
    private readonly ApplicationDbContext context;

    public AuthenticationService(ApplicationDbContext context)
    {
        this.context = context;
    }

    public RegisterResponse Register(RegisterRequest registerRequest)
    {
        var pw = Crypt.HashPassword(registerRequest.Password);
        var user = context.Users
            .FirstOrDefault(t => t.Username == registerRequest.Username || t.Email == registerRequest.Email);
        if (user != null)
        {
            return new RegisterResponse()
            {
                err = "User already exist"
            };
        }

        var newUser = new User
        {
            Email = registerRequest.Email,
            Username = registerRequest.Username,
            Password = pw
        };
        context.Users.Add(newUser);
        context.SaveChanges();

        return new RegisterResponse();
    }

    public BaseResponse Login(LoginRequest loginRequest, string jwtSecret, string jwtIssuer, string jwtAudience,
        double expirationMinutes)
    {
        var pw = Crypt.HashPassword(loginRequest.Password);
        var user = context.Users.FirstOrDefault(t => t.Email == loginRequest.Email);
        if (user == null || user.Password != pw) return new BaseResponse("User not found");

        var token = Crypt.GenerateAuthToken(user.Id, jwtSecret, jwtIssuer, jwtAudience, expirationMinutes);
        var response = new LoginResponse() { token = token, Username = user.Username };
        return response;
    }

    public UserResponse GetMyInfo(int userId)
    {
        var user = context.Users.Find(userId);
        var userRes = new UserResponse()
        {
            Username = user?.Username,
        };

        return userRes;
    }
}

public class LoginResponse : BaseResponse
{
    public string token { get; set; }
    public string Username { get; set; }
}