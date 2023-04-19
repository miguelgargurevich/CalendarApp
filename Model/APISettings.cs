using System.ComponentModel.DataAnnotations;

namespace CalendarApp.Model
{
    public class APISettings
    {
        public string SectionName { get; set; }
        public bool ShowDetails { get; set; }
        public string[] AllowedHosts { get; set; }
        public Roles Roles { get; set; }
        public string UrlDesarrollo { get; set; }
        public string UrlProduccion { get; set; }
    }

    //Nested classes help manage groups of properties
    public class Roles
    {
        public string User { get; set; } = String.Empty;
        public string Admin { get; set; } = String.Empty;
    }
}

