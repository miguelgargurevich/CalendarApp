using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using testApi.Models;

namespace testApi.Controllers;

public class DailyController : Controller
{
    private readonly ILogger<DailyController> _logger;

    public DailyController(ILogger<DailyController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}

