using PostIt.Domain;

namespace PostIt.Controllers.API;

public class UserResponse : BaseResponse
{
    public string Username { get; set; }
}