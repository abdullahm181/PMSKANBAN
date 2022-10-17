using client.Models;
using client.ViewModels;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;

namespace client.Repositories.Data
{
    public class CardRepository:GeneralRepository<Card>
    {
        private readonly string request;
        private readonly string address;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;
        public CardRepository(string request = "Card/") : base(request)
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
        public IEnumerable<CardDisplayVM> GetByListId(int ListId)
        {
            IEnumerable<CardDisplayVM> card = null;
            //HTTP GET
            var responseTask = httpClient.GetAsync(request + "GetByListId" + "?ListId=" + ListId.ToString());
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                JObject rss = JObject.Parse(ResultJsonString.Result);
                JArray data = (JArray)rss["data"];
                card = JsonConvert.DeserializeObject<List<CardDisplayVM>>(JsonConvert.SerializeObject(data));
            }
            else //web api sent error response 
            {
                card = Enumerable.Empty<CardDisplayVM>();
            }
            return card;
        }
        public CardDisplayVM GetCard(int CardId)
        {
            CardDisplayVM cardDisplayVM = null;

            var responseTask = httpClient.GetAsync(request + "GetCard?CardId=" + CardId.ToString());
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                JObject rss = JObject.Parse(ResultJsonString.Result);
                JObject data = (JObject)rss["data"];
                cardDisplayVM = JsonConvert.DeserializeObject<CardDisplayVM>(JsonConvert.SerializeObject(data));
            }
            else //web api sent error response 
            {
                cardDisplayVM = null;
            }

            return cardDisplayVM;

        }

    }
}
