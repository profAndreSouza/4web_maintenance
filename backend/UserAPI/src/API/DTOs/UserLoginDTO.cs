namespace UserAuth.API.DTOs
{
    public class UserLoginDTO
    {
        public required string Username { get; set; }
        public required string Password { get; set; }
    }
}