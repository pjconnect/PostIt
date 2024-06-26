using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PostIt.Domain;
using PostIt.utils;

namespace PostIt.Controllers.API;

[Route("/api/auth")]
[ApiController]
public class AuthController : Controller
{
    private readonly AuthenticationService authenticationService;
    private readonly IConfiguration configuration;

    public AuthController(AuthenticationService authenticationService, IConfiguration configuration)
    {
        this.authenticationService = authenticationService;
        this.configuration = configuration;
    }


    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest registerRequest)
    {
        var result = authenticationService.Register(registerRequest);
        return this.Send(result);
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest loginRequest)
    {
        var result = authenticationService.Login(loginRequest,
            jwtSecret:configuration["Jwt:Secret"],
            jwtIssuer:configuration["Jwt:Issuer"],
            jwtAudience:configuration["Jwt:Audience"],
            expirationMinutes:Convert.ToDouble(configuration["Jwt:ExpirationMinutes"]));
        return this.Send(result);
    }

    [HttpGet("my-info")]
    [Authorize]
    public IActionResult GetMyInfo()
    {
        var result = authenticationService.GetMyInfo(User.GetUserId());
        return this.Send(result);
    }
}