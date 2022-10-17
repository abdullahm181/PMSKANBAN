using client.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;

namespace client.Repositories.Data
{
    public class ListRepository:GeneralRepository<List>
    {
        private readonly string request;
        private readonly string address;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;
        public ListRepository(string request = "List/") : base(request)
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
        public IEnumerable<List> GetByBoardId(int BoardId)
        {
            IEnumerable<List> list = null;
            //HTTP GET
            var responseTask = httpClient.GetAsync(request + "GetByBoardId" + "?BoardId=" + BoardId.ToString());
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                JObject rss = JObject.Parse(ResultJsonString.Result);
                JArray data = (JArray)rss["data"];
                list = JsonConvert.DeserializeObject<List<List>>(JsonConvert.SerializeObject(data));
            }
            else //web api sent error response 
            {
                list = Enumerable.Empty<List>();
            }
            return list;
        }

        public List GetByName(string ListName, int BoardId)
        {
            List list = null;
    
            var responseTask = httpClient.GetAsync(request + "GetByName" + "?ListName=" + ListName+ "&BoardId="+BoardId.ToString());
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                JObject rss = JObject.Parse(ResultJsonString.Result);
                JObject data = (JObject)rss["data"];
                list = JsonConvert.DeserializeObject<List>(JsonConvert.SerializeObject(data));
            }
            else //web api sent error response 
            {
                list = null;
            }

            return list;

        }
        public HttpStatusCode Create(List list)
        {
            //HTTP POST
            var postTask = httpClient.PostAsJsonAsync<List>(request + "Create", list);
            postTask.Wait();

            var result = postTask.Result;
            return result.StatusCode;
        }
    }
}
