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
    public class InvitedMembersRepository:GeneralRepository<InvitedMembers>
    {
        private readonly string request;
        private readonly string address;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;
        public InvitedMembersRepository(string request = "InvitedMembers/") : base(request)
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
        public IEnumerable<InvitedMembers> GetRequestByUserId(int UserId)
        {
            IEnumerable<InvitedMembers> invitedMembers = null;
            //HTTP GET
            var responseTask = httpClient.GetAsync(request + "GetRequestByUserId" + "?UserId=" + UserId.ToString());
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                JObject rss = JObject.Parse(ResultJsonString.Result);
                JArray data = (JArray)rss["data"];
                invitedMembers = JsonConvert.DeserializeObject<List<InvitedMembers>>(JsonConvert.SerializeObject(data));
            }
            else //web api sent error response 
            {
                invitedMembers = Enumerable.Empty<InvitedMembers>();
            }
            return invitedMembers;
        }
        public IEnumerable<InvitedMembers> GetHistoryByUserId(int UserId)
        {
            IEnumerable<InvitedMembers> invitedMembers = null;
            //HTTP GET
            var responseTask = httpClient.GetAsync(request + "GetHistoryByUserId" + "?UserId=" + UserId.ToString());
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                JObject rss = JObject.Parse(ResultJsonString.Result);
                JArray data = (JArray)rss["data"];
                invitedMembers = JsonConvert.DeserializeObject<List<InvitedMembers>>(JsonConvert.SerializeObject(data));
            }
            else //web api sent error response 
            {
                invitedMembers = Enumerable.Empty<InvitedMembers>();
            }
            return invitedMembers;
        }
    }
}
