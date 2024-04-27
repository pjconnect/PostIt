using System.ComponentModel.DataAnnotations;

namespace PostIt.Domain;

public class LoginRequest
{
    [Required] public string Email { get; set; }
    [Required] public string Password { get; set; }
}