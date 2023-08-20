using lesson_1.Controllers;
using lesson_1.Interfaces;
using lesson_1.Services;

namespace lesson_1.Utilities
{
    public static class Helper
    {
        public static void addTasks(this IServiceCollection services)
        {
            services.AddSingleton<ITask, TaskService>();
        }

        public static void addUsers(this IServiceCollection services)
        {
            services.AddSingleton<IUser, UserService>();
        }

        public static void addLog(this IServiceCollection services)
        {
            services.AddTransient<ILogService, LogService>();
        }


    }
}