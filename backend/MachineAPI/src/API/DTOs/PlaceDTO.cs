namespace MachineAPI.API.DTOs
{
    public class PlaceDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Observation { get; set; }
        public List<MachineDTO>? Machines { get; set; }
    }
}
