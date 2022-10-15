using client.Repositories.Interface;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace client.Repositories
{
    public class GeneralRepository<Entity> : IGeneralRepository<Entity>
         where Entity : class, IEntity
    {
        private readonly string request;
        private readonly string address;
        private readonly IHttpContextAccessor _contextAccessor;
        private readonly HttpClient httpClient;

        public GeneralRepository(string request)
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

        public HttpStatusCode Delete(int id)
        {
            var result = httpClient.DeleteAsync(request + id).Result;
            return result.StatusCode;
        }

        public IEnumerable<Entity> Get()
        {
            IEnumerable<Entity> entity = null;
            //HTTP GET
            var responseTask = httpClient.GetAsync(request);
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                JObject rss = JObject.Parse(ResultJsonString.Result);
                JArray data = (JArray)rss["data"];
                entity = JsonConvert.DeserializeObject<List<Entity>>(JsonConvert.SerializeObject(data));
            }
            else //web api sent error response 
            {
                entity = Enumerable.Empty<Entity>();
            }


            return entity;
        }

        public Entity Get(int? id)
        {
            Entity entity = null;

            var responseTask = httpClient.GetAsync(request + id.ToString());
            responseTask.Wait();

            var result = responseTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                JObject rss = JObject.Parse(ResultJsonString.Result);
                JObject data = (JObject)rss["data"];
                entity = JsonConvert.DeserializeObject<Entity>(JsonConvert.SerializeObject(data));
            }
            else //web api sent error response 
            {
                entity = null;
            }

            return entity;

        }

        public Entity Post(Entity entity)
        {
            //HTTP POST
            Entity newEntity = null;
            var postTask = httpClient.PostAsJsonAsync<Entity>(request, entity);
            postTask.Wait();

            var result = postTask.Result;
            if (result.IsSuccessStatusCode)
            {
                // Get the response
                var ResultJsonString = result.Content.ReadAsStringAsync();
                ResultJsonString.Wait();
                JObject rss = JObject.Parse(ResultJsonString.Result);
                JObject data = (JObject)rss["data"];
                newEntity = JsonConvert.DeserializeObject<Entity>(JsonConvert.SerializeObject(data));
            }
            else //web api sent error response 
            {
                newEntity = null;
            }
            return newEntity;
        }

        public HttpStatusCode Put(Entity entity)
        {
            //HTTP POST
            var putTask = httpClient.PutAsJsonAsync<Entity>(request + entity.Id.ToString(), entity);
            putTask.Wait();

            var result = putTask.Result;
            return result.StatusCode;
        }
    }
}
