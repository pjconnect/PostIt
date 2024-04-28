using Microsoft.EntityFrameworkCore;
using PostIt.Controllers.API;
using PostIt.DTO;
using PostIt.Models;

namespace PostIt.Domain;

public class FeedService
{
    private readonly ApplicationDbContext context1;

    public FeedService(ApplicationDbContext context)
    {
        context1 = context;
    }

    public FeedResponse GetFeed(int pageNumber, int pageSize, int userId)
    {
        var feed = context1.Posts
            .Include(t => t.User)
            .Include(t => t.Likes)
            .OrderByDescending(t => t.CreatedDate)
            .Skip(pageSize * (pageNumber - 1)).Take(pageSize)
            .Select(t => new FeedDto
            {
                Id = t.Id,
                Created = t.CreatedDate,
                Description = t.Description,
                ImageUrl = t.ImageUrl,
                User = new UserResponse
                {
                    Username = t.User!.Username
                },
                HaveUserLiked = t.Likes.Any(t => t.UserId == userId),
                TotalLikes = t.Likes.Count,
            })
            .ToList();

        return new FeedResponse
        {
            Feed = feed,
            PageNumber = pageNumber
        };
    }

    public FeedResponse GetUserUploadedFeedsOnly(int pageNumber, int pageSize, int userId)
    {
        var feed = context1.Posts
            .Include(t => t.User)
            .OrderByDescending(t => t.CreatedDate)
            .Skip(pageSize * (pageNumber - 1)).Take(pageSize)
            .Where(t => t.UserId == userId)
            .Select(t => new FeedDto
            {
                Id = t.Id,
                Created = t.CreatedDate,
                Description = t.Description,
                ImageUrl = t.ImageUrl,
                User = new UserResponse
                {
                    Username = t.User.Username
                },
                UserId = t.UserId,
            })
            .ToList();

        return new FeedResponse
        {
            Feed = feed,
            PageNumber = pageNumber
        };
    }

    public LikeResponse Like(int feedId, int userId)
    {
        var likeInDb = context1.Likes.FirstOrDefault(
            t => t.UserId == userId && t.PostId == feedId
        );
        if (likeInDb is not null)
        {
            return new LikeResponse()
            {
                err = "user already exist"
            };
        }

        var like = new Like()
        {
            UserId = userId,
            PostId = feedId,
        };
        context1.Likes.Add(like);
        context1.SaveChanges();

        return new LikeResponse();
    }

    public LikeResponse Unlike(int feedId, int userId)
    {
        var likeInDb = context1.Likes.FirstOrDefault(
            t => t.UserId == userId && t.PostId == feedId
        );
        if (likeInDb == null)
        {
            return new LikeResponse() { AdditionalDetails = "already liked" };
        }

        context1.Likes.Remove(likeInDb);
        context1.SaveChanges();

        return new LikeResponse();
    }

    public PostResponse CreateFeed(CreateFeedRequest request, int userId)
    {
        var newPost = new Post
        {
            Id = null,
            UserId = userId,
            User = null,
            Description = request.Description,
            ImageUrl = request.ImageUrl
        };
        context1.Posts.Add(newPost);
        context1.SaveChanges();

        return new PostResponse()
        {
            Id = newPost.Id,
            UserId = newPost.UserId,
            Description = newPost.Description,
            ImageUrl = newPost.ImageUrl
        };
    }

    public DeleteFeedResponse DeleteFeedItem(int feedId, int userId)
    {
        var feed = context1.Posts.FirstOrDefault(t => t.Id == feedId && t.UserId == userId);
        context1.Posts.Remove(feed);
        context1.SaveChanges();
        return new DeleteFeedResponse();
    }
}