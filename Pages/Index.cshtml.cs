using CalendarApp.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Web;

namespace CalendarApp.Pages
{
    public class IndexModel : PageModel
    {
        static HttpClient myAppHTTPClient = new HttpClient();
        private readonly ILogger<IndexModel> _logger;
        public List<EventTypeModel>? EvenTypeList { get; set; }
        public List<CalendarModel>? CalendarList { get; set; }

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }



        public async Task OnGetAsync()
        {

            string host = "https://localhost:7261/";
            //string host = "https://apicalendar20230415010154.azurewebsites.net/";
            string pathnameEventType = "api/calendar/getEventTypesAsync";
            string pathnameCalendar = "api/calendar/getCalendarAsync";

            string requestUrlEventType = host + pathnameEventType;
            //string requestUrlCalendar = host + pathnameCalendar;

            try
            {
                var message = "";
                HttpResponseMessage responseMessage;
                HttpContent content;
                JArray objRpta;


                responseMessage = await myAppHTTPClient.GetAsync(requestUrlEventType);
                content = responseMessage.Content;
                message = await content.ReadAsStringAsync();

                objRpta = JsonConvert.DeserializeObject<JArray>(message);
                this.EvenTypeList = objRpta.Value<JArray>().ToObject<List<EventTypeModel>>();


                //responseMessage = await myAppHTTPClient.GetAsync(requestUrlCalendar);
                //content = responseMessage.Content;
                //message = await content.ReadAsStringAsync();

                //objRpta = JsonConvert.DeserializeObject<JArray>(message);
                //this.CalendarList = objRpta.Value<JArray>().ToObject<List<CalendarModel>>();

                RedirectToPage();
            }
            catch (HttpRequestException exception)
            {
                Console.WriteLine("An HTTP request exception occurred. {0}", exception.Message);
            }
        }

    }
}




