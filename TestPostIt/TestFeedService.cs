using Microsoft.EntityFrameworkCore;
using PostIt.Controllers.API;
using PostIt.Domain;
using PostIt.Models;

namespace TestPostIt;

public class TestFeedService
{
    [Fact]
    public void FeedService_GetUserUploadedFeedsOnly_ShouldGetGetUserUploadedFeedsOnly()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "FeedService_GetUserUploadedFeedsOnly_ShouldGetGetUserUploadedFeedsOnly")
            .Options;
        using var context = new ApplicationDbContext(options);
        context.Users.Add(new User() { Id = 1, Email = "", Username = "", Password = ""});
        context.SaveChanges();
        
        var feedService = new FeedService(context);
        feedService.CreateFeed(new CreateFeedRequest() { Description = "ABC", Id = 1, ImageUrl = ""}, 1);
        var y = feedService.GetUserUploadedFeedsOnly(1, 10, 1);

        var x = y.Feed.All(t => t.UserId == 1);
        Assert.True(x);
    }

    [Fact]
    public void FeedService_DeleteFeedItem_shouldBeAbleToDelete()
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: "FeedService_DeleteFeedItem_shouldBeAbleToDelete")
            .Options;
        using var context = new ApplicationDbContext(options);
        context.Users.Add(new User() { Id = 1, Email = "", Username = "", Password = ""});
        context.SaveChanges();
        
        var feedService = new FeedService(context);
        feedService.CreateFeed(new CreateFeedRequest() { Description = "ABC", Id = 1, ImageUrl = ""}, 1);
        var findFeed = context.Posts.First();
        feedService.DeleteFeedItem((int) findFeed.Id, 1);
    }
}