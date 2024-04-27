using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using PostIt.Domain;
using PostIt.Models;

namespace TestPostIt;

public class TestAuthService
{
    [Fact]
    public void AuthenticationService_RegisterRequestShouldHashPassword()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "ApplicationDbContext")
            .Options;
        using var context = new ApplicationDbContext(options);
        
        var feedService = new AuthenticationService(context);
        var user = feedService.Register(new RegisterRequest()
            { Email = "email", Password = "abc123", Username = "test user 1" });
        Assert.NotEqual("abc123", context.Users.First().Password); 
    }
}