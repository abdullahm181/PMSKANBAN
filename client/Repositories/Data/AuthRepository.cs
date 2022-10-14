
using client.ViewModels;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Text;

namespace client.Repositories.Data
{
    public class AuthRepository
    {
        private readonly string request;
        private readonly string address;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;
        public AuthRepository()
        {
            this.address = "https://localhost:5001/api/";
            this.request= "Account/";
            httpClient = new HttpClient
            {
                BaseAddress = new Uri(address)
            };
        }
        public LoginResponsesVM Auth(LoginVM login)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(login), Encoding.UTF8, "application/json");
            var postTask = httpClient.PostAsync(address + request + "Login", content);
            postTask.Wait();
            var result = postTask.Result;
            var ResultJsonString = result.Content.ReadAsStringAsync();
            ResultJsonString.Wait();
            JObject rss = JObject.Parse(ResultJsonString.Result);
            var response = JsonConvert.DeserializeObject<LoginResponsesVM>(rss.Value<string>());
            return response;
        }
        public RegisterResponsesVM Register(RegisterVM register)
        {
            StringContent content = new StringContent(JsonConvert.SerializeObject(register), Encoding.UTF8, "application/json");
            var postTask = httpClient.PostAsync(address + request + "Register", content);
            postTask.Wait();
            var result = postTask.Result;
            var ResultJsonString = result.Content.ReadAsStringAsync();
            ResultJsonString.Wait();
            JObject rss = JObject.Parse(ResultJsonString.Result);
            var response = JsonConvert.DeserializeObject<RegisterResponsesVM>(rss.Value<string>());
            return response;
        }
    }
}
