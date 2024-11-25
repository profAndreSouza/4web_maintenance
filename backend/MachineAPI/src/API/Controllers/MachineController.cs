using Microsoft.AspNetCore.Mvc;
using MachineAPI.Application.Interfaces;
using MachineAPI.API.DTOs;

namespace MachineAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MachinesController : ControllerBase
    {
        private readonly IMachineService _machineService;

        public MachinesController(IMachineService machineService)
        {
            _machineService = machineService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMachines()
        {
            var machines = await _machineService.GetAllMachines();
            return Ok(machines);
        }

        [HttpPost]
        public async Task<IActionResult> AddMachine([FromBody] MachineDTO machineDto)
        {
            var machine = await _machineService.AddMachine(machineDto);
            return CreatedAtAction(nameof(GetAllMachines), new { id = machine.Id }, machine);
        }
    }
}
