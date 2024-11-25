using System.Security.Cryptography;
using System.Text;

namespace UserAuth.Application.Helpers
{

    public class PasswordHelper
    {
        public static string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                byte[] bytes = Encoding.UTF8.GetBytes(password);
                byte[] hash = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }

        public static bool VerifyPassword(string enteredPassword, string storedHash)
        {
            string enteredHash = HashPassword(enteredPassword);
            return enteredHash == storedHash;
        }
    }

}
