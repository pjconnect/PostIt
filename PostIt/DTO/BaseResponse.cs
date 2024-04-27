namespace PostIt.Domain;

public class BaseResponse
{
    public BaseResponse()
    {
    }
    
    public BaseResponse(string err)
    {
        this.err = err;
    }
    
    public string err { get; set; }
}