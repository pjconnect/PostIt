using PostIt.Domain;

namespace PostIt.DTO;

public class PostResponse : BaseResponse
{
    public int? Id { get; set; }
    public int UserId { get; set; }
    public string? Description { get; set; }
    public string ImageUrl { get; set; }
}