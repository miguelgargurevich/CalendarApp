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
        public BaseModel _BaseModel { get; set; }
        public IConfiguration _configuration;

        public IndexModel(ILogger<IndexModel> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        public async Task OnGetAsync()
        {

            var host = _configuration["APISettings:urlLocalProd"];

            string pathnameEventType = "api/calendar/getEventTypesAsync";
            //string pathnameCalendar = "api/calendar/getCalendarAsync";

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
                this._BaseModel = new BaseModel() { hostName = host};

                //responseMessage = await myAppHTTPClient.GetAsync(requestUrlCalendar);
                //content = responseMessage.Content;
                //message = await content.ReadAsStringAsync();

                //objRpta = JsonConvert.DeserializeObject<JArray>(message);
                //this.CalendarList = objRpta.Value<JArray>().ToObject<List<CalendarModel>>();

                RedirectToPage();
            }
            catch (HttpRequestException exception)
            {
                _logger.LogError("An HTTP request exception occurred. {0}", exception.Message);

            }
        }

    }
}




