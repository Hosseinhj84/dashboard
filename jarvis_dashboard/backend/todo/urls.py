from django.urls import path
from .views import tasks_stats , MarketAPIView , TaskListCreateAPIView, TaskRetrieveUpdateDestroyAPIView , WeeklyStatsAPIView , ActivityStatsAPIView , ActivityListAPIView

urlpatterns = [
    path('tasks/', TaskListCreateAPIView.as_view(), name='task-list'),
    path('tasks/<int:pk>/', TaskRetrieveUpdateDestroyAPIView.as_view(), name='task-detail'),
    path('stats/weekly/', WeeklyStatsAPIView.as_view() , name="weekly-stats"),    
    path("activity/", ActivityListAPIView.as_view(), name="activity-list"),
    path("stats/activity/", ActivityStatsAPIView.as_view() , name="activity-stats"),
    path("market/", MarketAPIView.as_view(), name="market"),
    path("tasks/stats/", tasks_stats, name="tasks-stats"),
]
