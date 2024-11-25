namespace MachineAPI.Domain.Entities
{
    public class Place
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Observation { get; set; }

        public List<Machine> Machines { get; set; } = new List<Machine>();
    }
}
