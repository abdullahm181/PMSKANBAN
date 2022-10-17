using client.Models;
using client.ViewModels;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;

namespace client.Repositories.Data
{
    public class BoardsRepository:GeneralRepository<Boards>
    {
        private readonly string request;
        private readonly string address;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;
        public BoardsRepository(string request = "Boards/") : base(request)
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
        public HttpStatusCode Create(CreateBoardVM createBoardVM)
        {
            //HTTP POST
            var postTask = httpClient.PostAsJsonAsync<CreateBoardVM>(request+ "Create", createBoardVM);
            postTask.Wait();

            var result = postTask.Result;
            return result.StatusCode;
        }
        public IEnumerable<Boards> GetbyOwner(int OwnerId)
        {
            IEnumerable<Boards> boards = null;
            //HTTP GET
            var responseTask = httpClient.GetAsync(request + "GetbyOwner"+ "?OwnerId="+ OwnerId.ToString());
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                JObject rss = JObject.Parse(ResultJsonString.Result);
                JArray data = (JArray)rss["data"];
                boards = JsonConvert.DeserializeObject<List<Boards>>(JsonConvert.SerializeObject(data));
            }
            else //web api sent error response 
            {
                boards = Enumerable.Empty<Boards>();
            }
            return boards;
        }
        public IEnumerable<Boards> GetbyMember(int MemberId)
        {
            IEnumerable<Boards> boards = null;
            //HTTP GET
            var responseTask = httpClient.GetAsync(request + "GetbyMember" + "?MemberId=" + MemberId.ToString());
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                JObject rss = JObject.Parse(ResultJsonString.Result);
                JArray data = (JArray)rss["data"];
                boards = JsonConvert.DeserializeObject<List<Boards>>(JsonConvert.SerializeObject(data));
            }
            else //web api sent error response 
            {
                boards = Enumerable.Empty<Boards>();
            }
            return boards;
        }


    }
}
