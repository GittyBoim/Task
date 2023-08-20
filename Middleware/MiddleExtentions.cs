namespace lesson_1.Middleware;

public static class MiddlewareExtensions
{

    public static IApplicationBuilder UseLogMiddleware(
        this IApplicationBuilder app
    )
    {
        return app.UseMiddleware<LogMiddleware>();

    }
}

