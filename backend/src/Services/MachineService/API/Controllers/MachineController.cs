using MachineService.Application.Interfaces;
using MachineService.Application.DTOs;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace MachineService.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachineController : ControllerBase
    {
        private readonly IMachineService _machineService;

        public MachineController(IMachineService machineService)
        {
            _machineService = machineService;
        }

        [HttpPost]
        public async Task<IActionResult> RegisterMachine([FromBody] MachineDto machineDto)
        {
            var result = await _machineService.RegisterMachine(machineDto);
            if (result)
                return Ok();
            return BadRequest();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetMachineDetails(int id)
        {
            var machine = await _machineService.GetMachineDetails(id);
            if (machine != null)
                return Ok(machine);
            return NotFound();
        }
    }
}
