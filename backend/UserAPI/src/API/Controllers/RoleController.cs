using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using UserAuth.API.DTOs;
using UserAuth.Application.Interfaces;

namespace UserAuth.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "users:admin")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;

        public RoleController(IRoleService roleService)
        {
            _roleService = roleService;
        }

        [HttpGet]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _roleService.GetAllRoles();
            return Ok(roles);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetRole(int id)
        {
            var role = await _roleService.GetRoleById(id);
            if (role == null) return NotFound();
            return Ok(role);
        }

        [HttpPost]
        public async Task<IActionResult> CreateRole(RoleDTO roleDTO)
        {
            await _roleService.AddRole(roleDTO);
            return CreatedAtAction(nameof(GetRole), new { id = roleDTO.Id }, roleDTO);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRole(int id, RoleDTO roleDTO)
        {
            var existingRole = await _roleService.GetRoleById(id);
            if (existingRole == null) return NotFound();

            await _roleService.UpdateRole(id, roleDTO);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteRole(int id)
        {
            var existingRole = await _roleService.GetRoleById(id);
            if (existingRole == null) return NotFound();

            await _roleService.DeleteRole(id);
            return NoContent();
        }
    }
}
