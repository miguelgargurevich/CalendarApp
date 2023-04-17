using CalendarApp;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System.Web;

namespace CalendarApp.Pages
{
    public class IndexModel : PageModel
    {
        static HttpClient myAppHTTPClient = new HttpClient();
        private readonly ILogger<IndexModel> _logger;
        public List<EventTypeModel>? EvenTypeList { get; set; }

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }



        public async Task OnGetAsync()
        {
            //Populate Model from Database.
            //this.Fruits = PopulateFruits();

            string firstName, lastName, email;
            string host = "https://localhost:7261/";
            string pathname = "api/calendar/getEventTypesAsync";

            firstName = "Test";
            //LastName = "User";
            email = "TestUser@email.com";

            string path = pathname + "&first_name=" + firstName + "&last_name=";//+ lastName + "&email=" + email;
            string requestUrl = host + pathname;

            HttpRequestMessage httpRequestMessage = new HttpRequestMessage();

            try
            {
                HttpResponseMessage responseMessage = await myAppHTTPClient.GetAsync(requestUrl);
                HttpContent content = responseMessage.Content;
                var message = await content.ReadAsStringAsync();

                var o = JsonConvert.DeserializeObject<JArray>(message);
                this.EvenTypeList = o.Value<JArray>().ToObject<List<EventTypeModel>>();

                //Console.WriteLine("The output from thirdparty is: {0}", message);
                //ViewData["EventTypeModel"] = this.EvenTypeList;
                RedirectToPage();
            }
            catch (HttpRequestException exception)
            {
                Console.WriteLine("An HTTP request exception occurred. {0}", exception.Message);
            }
        }
    

        public void OnPostSubmit(int fruit)
        {
            //Populate Model from Database.
            this.EvenTypeList = PopulateFruits();

            //Fetch the ID and the TEXT value.
            string message = "Selected Fruit Id: " + fruit;
            message += "\\nFruit Name: " + this.EvenTypeList.Find(p => p.Id == fruit).Name;

            //Set the value in ViewData.
            ViewData["Message"] = message;
        }

        private static List<EventTypeModel> PopulateFruits()
        {
            string constr = @"Data Source=.\SQL2019;Initial Catalog=AjaxSamples;Integrated Security=true";
            List<EventTypeModel> fruits = new List<EventTypeModel>();
            //using (SqlConnection con = new SqlConnection(constr))
            //{
            //    string query = "SELECT FruitName, FruitId FROM Fruits";
            //    using (SqlCommand cmd = new SqlCommand(query))
            //    {
            //        cmd.Connection = con;
            //        con.Open();
            //        using (SqlDataReader sdr = cmd.ExecuteReader())
            //        {
            //            while (sdr.Read())
            //            {
            //                fruits.Add(new FruitModel
            //                {
            //                    FruitName = sdr["FruitName"].ToString(),
            //                    FruitId = Convert.ToInt32(sdr["FruitId"])
            //                });
            //            }
            //        }
            //        con.Close();
            //    }
            //}

            return fruits;
        }
    }
}






