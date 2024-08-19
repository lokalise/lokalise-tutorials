using Microsoft.AspNetCore.Localization;
using System.Globalization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

// Add localization services
builder.Services.AddLocalization(options => options.ResourcesPath = "Resources");

// Register View Localization
builder.Services.AddMvc()
    .AddViewLocalization();  // This adds support for IViewLocalizer

var app = builder.Build();

// Define the supported cultures
var supportedCultures = new[] { new CultureInfo("en-US"), new CultureInfo("fr-FR") };

// Configure the Request Localization options
var requestLocalizationOptions = new RequestLocalizationOptions
{
    DefaultRequestCulture = new RequestCulture("en-US"),
    SupportedCultures = supportedCultures,
    SupportedUICultures = supportedCultures,
    // Explicitly specifying the type for RequestCultureProviders
    RequestCultureProviders =
    [
        new QueryStringRequestCultureProvider(),
        new CookieRequestCultureProvider(),
        new AcceptLanguageHeaderRequestCultureProvider()
    ]
};

app.UseRequestLocalization(requestLocalizationOptions);

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.MapRazorPages();

app.Run();
