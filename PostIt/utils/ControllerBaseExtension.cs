using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using PostIt.Domain;

namespace PostIt.utils;

public static class ControllerExtension
{
    public static IActionResult Send(this ControllerBase controller, BaseResponse response)
    {
        if (!response.err.IsNullOrEmpty())
        {
            return controller.BadRequest(response);
        }

        return controller.Ok(response);
    }
}