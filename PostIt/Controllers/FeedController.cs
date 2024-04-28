using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PostIt.Domain;
using PostIt.utils;

namespace PostIt.Controllers.API;

[Route("/api/feed")]
[ApiController]
[Authorize]
public class FeedController : Controller
{
    private readonly FeedService service1;

    public FeedController(FeedService service)
    {
        service1 = service;
    }

    [HttpGet("paged/{pageNumber}/{pageSize}")]
    public IActionResult GetFeed(int pageNumber, int pageSize)
    {
        var userId = User.GetUserId();
        var res = service1.GetFeed(pageNumber, pageSize, userId);
        return this.Send(res);
    }
    
    [HttpGet("user/paged/{pageNumber}/{pageSize}")]
    public IActionResult GetUserUploadedFeedsOnly(int pageNumber, int pageSize)
    {
        var userId = User.GetUserId();
        var res = service1.GetUserUploadedFeedsOnly(pageNumber, pageSize, userId);
        return this.Send(res);
    }

    [HttpPost("like/{feedId}")]
    public IActionResult Like(int feedId)
    {
        var userId = User.GetUserId();
        var res = service1.Like(feedId, User.GetUserId());
        return this.Send(res);
    }
    
    [HttpPost("unlike/{feedId}")]
    public IActionResult Unlike(int feedId)
    {
        var userId = User.GetUserId();
        var res = service1.Unlike(feedId, User.GetUserId());
        return this.Send(res);
    }

    [HttpPost]
    public IActionResult CreateFeed([FromBody] CreateFeedRequest request)
    {
        var userId = User.GetUserId();
        var res = service1.CreateFeed(request, User.GetUserId());
        return this.Send(res);
    }

    [HttpDelete("delete/{feedId}")]
    public IActionResult DeleteFeedItem(int feedId)
    {
        var userId = User.GetUserId();
        var res = service1.DeleteFeedItem(feedId, User.GetUserId());
        return this.Send(res);
    }
}