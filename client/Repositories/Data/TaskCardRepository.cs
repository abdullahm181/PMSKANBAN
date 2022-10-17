using client.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace client.Repositories.Data
{
    public class TaskCardRepository:GeneralRepository<TaskCard>
    {
        private readonly string request;
        private readonly string address;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;
        public TaskCardRepository(string request = "TaskCard/") : base(request)
        {
            this.address = "https://localhost:5001/api/";
            this.request = request;
            _contextAccessor = new HttpContextAccessor();
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address)
            };

            //httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _contextAccessor.HttpContext.Session.GetString("Token"));
        }
        public IEnumerable<TaskCard> GetByCardId(int CardId)
        {
            IEnumerable<TaskCard> taskCards = null;
            //HTTP GET
            var responseTask = httpClient.GetAsync(request + "GetByCardId" + "?CardId=" + CardId.ToString());
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                JObject rss = JObject.Parse(ResultJsonString.Result);
                JArray data = (JArray)rss["data"];
                taskCards = JsonConvert.DeserializeObject<List<TaskCard>>(JsonConvert.SerializeObject(data));
            }
            else //web api sent error response 
            {
                taskCards = Enumerable.Empty<TaskCard>();
            }
            return taskCards;
        }
    }
}
