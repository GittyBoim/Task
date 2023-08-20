using Microsoft.AspNetCore.Hosting;
using lesson_1.Interfaces;

namespace lesson_1.Services;
public class LogService : ILogService
{
    private readonly string filePath;
    public LogService(IWebHostEnvironment web)
    {
        filePath = Path.Combine(web.ContentRootPath, "Logs", "task.log");
    }
    public void Log(LogLevel level, string message)
    {
        using (var sr = new StreamWriter(filePath, true))
        {
            sr.WriteLine(
                $"{DateTime.Now.ToString("yyyy-MM-dd hh:mm:ss")} [{level}] {message}");
        }

    }

}