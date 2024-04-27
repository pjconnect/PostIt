using System.ComponentModel.DataAnnotations;

namespace PostIt.Domain;

public class RegisterRequest
{
    [Required] public string Email { get; set; }

    [Required]
    [RegularExpression(@"\S+", ErrorMessage = "Username required")]
    public string Username { get; set; }

    public string Password { get; set; }
}