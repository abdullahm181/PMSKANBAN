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
    public class CommentsRepository:GeneralRepository<Comments>
    {
        private readonly string request;
        private readonly string address;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;
        public CommentsRepository(string request = "Comments/") : base(request)
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
        public IEnumerable<Comments> GetByCardId(int CardId)
        {
            IEnumerable<Comments> comments = null;
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
                comments = JsonConvert.DeserializeObject<List<Comments>>(JsonConvert.SerializeObject(data));
            }
            else //web api sent error response 
            {
                comments = Enumerable.Empty<Comments>();
            }
            return comments;
        }
    }
}
