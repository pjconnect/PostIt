namespace PostIt.Controllers.API;

public class FeedDto
{
    public DateTime Created { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
    public UserResponse? User { get; set; }
    public int? Id { get; set; }
    public bool HaveUserLiked { get; set; }
    public int TotalLikes { get; set; }
    public int UserId { get; set; }
}