using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Localization;
using System.Globalization;

namespace ASPLokaliseDemo.Controllers
{
    public class HomeController(IStringLocalizer<HomeController> localizer) : Controller
    {
        public IActionResult Index()
        {
            ViewData["greeting"] = localizer["welcome"];
            // ViewData["currentDate"] = DateTime.Now.ToString("D", CultureInfo.CurrentCulture);  // "D" stands for long date format
            var userTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Central European Standard Time"); // Example for CET
            ViewData["currentDate"] = TimeZoneInfo.ConvertTime(DateTime.Now, userTimeZone).ToString("F", CultureInfo.CurrentCulture);

            int appleCount = 1;  // Example count
            string appleMessage = appleCount == 1
                ? localizer["AppleCount", appleCount]
                : localizer["AppleCountPlural", appleCount];

            ViewData["appleMessage"] = appleMessage;

            return View();
        }
    }
}