using MachineService.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;
using MachineService.Application.DTOs;

namespace MachineService.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MachineController : ControllerBase
    {
        private readonly IMachineService _machineService;

        public MachineController(IMachineService machineService)
        {
            _machineService = machineService;
        }

        [HttpPost]
        public IActionResult RegisterMachine([FromBody] MachineDto machineDto)
        {
            _machineService.RegisterMachine(machineDto);
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetMachineDetails(int id)
        {
            var machine = _machineService.GetMachineDetails(id);
            if (machine == null)
                return NotFound();

            return Ok(machine);
        }
    }
}
