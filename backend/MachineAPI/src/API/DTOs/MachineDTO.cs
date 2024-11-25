namespace MachineAPI.API.DTOs
{
    public class MachineDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Model { get; set; }
        public DateTime ManufactureDate { get; set; }
        public string SerialNumber { get; set; }
        public string Status { get; set; }
        public int PlaceId { get; set; }
    }
}
