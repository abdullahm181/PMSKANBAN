using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using API.Models;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Context;
using Microsoft.OpenApi.Models;
using API.Repositories.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

using Microsoft.AspNetCore.Http;
using API.Middleware;
//using Microsoft.AspNetCore.Authentication;

namespace API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<MyContext>(options => options.UseSqlServer(Configuration.GetConnectionString("connection")));
            services.AddScoped<AccountRepository>();
            services.AddScoped<ActivitiesRepository>();
            services.AddScoped<BoardsRepository>();
            services.AddScoped<CardRepository>();
            services.AddScoped<CommentsRepository>();
            services.AddScoped<DepartmentsRepository>();
            services.AddScoped<EmployeesRepository>();
            services.AddScoped<InvitedMembersRepository>();
            services.AddScoped<JobsRepository>();
            services.AddScoped<LevelRepository>();
            services.AddScoped<ListRepository>();
            services.AddScoped<MemberBoardRepository>();
            services.AddScoped<MemberCardRepository>();
            services.AddScoped<RoleRepository>();
            services.AddScoped<TaskCardRepository>();
            services.AddScoped<UserRepository>();
            services.AddScoped<UserRoleRepository>();
            services.AddControllers();
            services.JWTConfigure(Configuration);

            services.AddSwaggerGen(config =>
            {
                config.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Description =
        "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\"",
                    Name = "Authorization",
                    In = ParameterLocation.Header,
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT"
                });

                
                config.AddSecurityRequirement(new OpenApiSecurityRequirement()
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            },
                            Scheme = "oauth2",
                            Name = "Bearer",
                            In = ParameterLocation.Header,

                        },
                        new List<string>()
                    }
                });


                var titleBase = "Test API";


                config.SwaggerDoc("v1", new OpenApiInfo
                {
                    Version = "v1",
                    Title = titleBase + " v1"

                });



            });

            services.AddCors(option => option.AddPolicy("DefaultPolicy", builder => {
                builder.WithOrigins("https://localhost:44358", "http://127.0.0.1:5500").WithMethods("GET", "POST", "PUT", "DELETE");
            }));
            services.AddControllers().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            );

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });

            app.UseRouting();

            app.UseCors("DefaultPolicy");

            //app.UseSession();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
