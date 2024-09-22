namespace MachineService.Domain.Entities
{
    public class Machine
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Model { get; set; }
        public string SerialNumber { get; set; }
        public string Location { get; set; }
    }
}
