using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace PostIt.Models;

public class Post
{
    [Key] [NotNull] public int? Id { get; set; }

    public string? Description { get; set; }
    public string ImageUrl { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

    public PostStatus Status { get; set; } = PostStatus.Public;

    public int UserId { get; set; }
    public User? User { get; set; }

    public List<Like> Likes { get; set; } = new List<Like>();
}

public enum PostStatus
{
    Public
}