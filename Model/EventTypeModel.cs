using System.ComponentModel.DataAnnotations;

namespace CalendarApp.Model
{
    public class EventTypeModel
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Color { get; set; }

    }
}

