using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Mvc;

namespace PostIt.Controllers.API;

[Route("/api/image-upload")]
public class ImageUploadController : Controller
{
    private readonly IConfiguration configuration;

    public ImageUploadController(IConfiguration configuration)
    {
        this.configuration = configuration;
    }

    public static async Task UploadFromFileAsync(
        BlobContainerClient containerClient,
        string localFilePath)
    {
        string fileName = Path.GetFileName(localFilePath);
        BlobClient blobClient = containerClient.GetBlobClient(fileName);

        await blobClient.UploadAsync(localFilePath, true);
    }

    [HttpPost("feed/image")]
    public async Task<IActionResult> UploadFeedImage()
    {
        try
        {
            // Check if the request contains a file
            if (Request.Form.Files.Count == 0) return BadRequest("No file uploaded");

            var file = Request.Form.Files[0]; // Assuming only one file is being uploaded

            // Check file size (optional)
            if (file.Length <= 0) return BadRequest("File is empty");

            // Get the file extension
            var fileExtension = Path.GetExtension(file.FileName);

            // Check if the file is an image (you can add more image formats if needed)
            if (fileExtension != ".jpg" && fileExtension != ".jpeg" && fileExtension != ".png")
                return BadRequest("Only JPG, JPEG, and PNG files are allowed");

            // Define the folder where the image will be saved
            var uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");

            // Create the folder if it doesn't exist
            if (!Directory.Exists(uploadsFolder)) Directory.CreateDirectory(uploadsFolder);

            // Generate a unique file name to prevent overwriting
            var uniqueFileName = Guid.NewGuid() + fileExtension;

            // Combine the folder path with the file name
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            // Save the file to disk
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(fileStream);
            }

            // Return the path to the saved image
            var imageUrl = Url.Content(configuration["DomainConfig:ServerURL"] + "images/" + uniqueFileName);
            return Ok(new { imageUrl });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex}");
        }
    }
}