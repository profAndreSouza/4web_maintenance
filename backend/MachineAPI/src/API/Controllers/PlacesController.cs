using Microsoft.AspNetCore.Mvc;
using MachineAPI.API.DTOs;
using MachineAPI.Application.Interfaces;

namespace MachineAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlacesController : ControllerBase
    {
        private readonly IPlaceService _placeService;

        public PlacesController(IPlaceService placeService)
        {
            _placeService = placeService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPlaces()
        {
            var places = await _placeService.GetAllPlaces();
            return Ok(places);
        }

        [HttpPost]
        public async Task<IActionResult> AddPlace([FromBody] PlaceDTO placeDto)
        {
            var place = await _placeService.AddPlace(placeDto);
            return CreatedAtAction(nameof(GetAllPlaces), new { id = place.Id }, place);
        }
    }
}
