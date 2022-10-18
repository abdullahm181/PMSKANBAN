using client.Models;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;

namespace client.Repositories.Data
{
    public class MemberBoardRepository:GeneralRepository<MemberBoard>
    {
        private readonly string request;
        private readonly string address;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;
        public MemberBoardRepository(string request = "MemberBoard/") : base(request)
        {
            this.address = "https://localhost:5001/api/";
            this.request = request;
            _contextAccessor = new HttpContextAccessor();
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address)
            };

            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _contextAccessor.HttpContext.Session.GetString("Token"));
        }
        public IEnumerable<MemberBoard> GetByBoardId(int BoardId)
        {
            IEnumerable<MemberBoard> memberBoards = null;
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
                memberBoards = JsonConvert.DeserializeObject<List<MemberBoard>>(JsonConvert.SerializeObject(data));
            }
            else //web api sent error response 
            {
                memberBoards = Enumerable.Empty<MemberBoard>();
            }
            return memberBoards;
        }
        public MemberBoard GetOwnerByBoardId(int BoardId)
        {
            MemberBoard memberBoard = null;

            var responseTask = httpClient.GetAsync(request + "GetOwnerByBoardId?BoardId=" + BoardId.ToString());
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                JObject rss = JObject.Parse(ResultJsonString.Result);
                JObject data = (JObject)rss["data"];
                memberBoard = JsonConvert.DeserializeObject<MemberBoard>(JsonConvert.SerializeObject(data));
            }

            return memberBoard;

        }
    }
}
