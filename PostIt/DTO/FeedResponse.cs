using PostIt.Domain;

namespace PostIt.Controllers.API;

public class FeedResponse : BaseResponse
{
    public List<FeedDto>? Feed { get; set; }
    public int PageNumber { get; set; }
}