using System.Security.Claims;

namespace PostIt.Controllers.API;

public static class ClaimsPrincipalExtension
{
    public static int GetUserId(this ClaimsPrincipal principal)
    {
        var val = principal?.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        int.TryParse(val, out var result);
        return result;
    }
}