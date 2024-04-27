namespace PostIt.Controllers.API;

public class CreateFeedRequest
{
    public int Id { get; set; }

    public string? Description { get; set; }

    public string ImageUrl { get; set; }
}