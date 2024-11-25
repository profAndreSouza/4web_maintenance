namespace UserAuth.API.DTOs
{
    public class UserDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public List<RoleDTO> Roles { get; set; } = new List<RoleDTO>();
    }
}