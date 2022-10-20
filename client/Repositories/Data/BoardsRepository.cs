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

            httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", _contextAccessor.HttpContext.Session.GetString("Token"));
        }
        public HttpStatusCode DeleteBoard(int BoardId)
        {
            var result = httpClient.DeleteAsync(request+ "DeleteBoard" + "?BoardId=" + BoardId).Result;
            return result.StatusCode;
        }
        public CreateBoardResponses Create(CreateBoardVM createBoardVM)
        {
            //HTTP POST
            CreateBoardResponses createBoardResponses = null;
            var postTask = httpClient.PostAsJsonAsync(request+ "Create", createBoardVM);
            postTask.Wait();

            var result = postTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                createBoardResponses = JsonConvert.DeserializeObject<CreateBoardResponses>(ResultJsonString.Result);
            }
            return createBoardResponses;
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
        public DoughnutChartVM GetDataDoughnutChart(int BoardId)
        {
            //HTTP POST
            DoughnutChartVM doughnutChartVM = null;
            var responseTask = httpClient.GetAsync(request + "GetDataDoughnutChart" + "?BoardId=" + BoardId.ToString());
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                JObject rss = JObject.Parse(ResultJsonString.Result);
                JObject data = (JObject)rss["data"];
                doughnutChartVM = JsonConvert.DeserializeObject<DoughnutChartVM>(JsonConvert.SerializeObject(data));
            }
            return doughnutChartVM;
        }

    }
}
