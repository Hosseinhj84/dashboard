from django.shortcuts import render
from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.timezone import now, timedelta
from .serializers import TaskSerializer , ActivitySerializer
from .models import Activity , Task
from django.db.models import Count
from django.db.models.functions import TruncDate
import requests

@api_view(['GET'])
def tasks_stats(request):
    total = Task.objects.count()
    done = Task.objects.filter(done=True).count()

    percent = int((done / total) * 100) if total > 0 else 0

    data = {
        "total": total,
        "done": done,
        "percent": percent
    }

    return Response(data)

class TaskListCreateAPIView(generics.ListCreateAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        queryset = Task.objects.all()

        # search
        search = self.request.query_params.get('search')
        if search:
            queryset = queryset.filter(text__icontains=search)

        # filter by done
        done = self.request.query_params.get('done')
        if done == "true":
            queryset = queryset.filter(done=True)
        elif done == "false":
            queryset = queryset.filter(done=False)

        # sorting
        ordering = self.request.query_params.get('ordering')
        if ordering:
            queryset = queryset.order_by(ordering)

        return queryset
    
    def perform_create(self, serializer):
        task = serializer.save()
        Activity.objects.create(action="created", task=task)

class WeeklyStatsAPIView(APIView):
    def get(self, request):
        today = now().date()
        data = []

        for i in range(7):
            day = today - timedelta(days=i)
            done = Task.objects.filter(done=True, created_at__date=day).count()
            not_done = Task.objects.filter(done=False, created_at__date=day).count()

            data.append({
                "day": day.strftime("%Y-%m-%d"),
                "done": done,
                "not_done": not_done
            })

        data.reverse()
        return Response(data)

# PATCH و DELETE
class TaskRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
    def perform_update(self, serializer):
        task = serializer.save()
        Activity.objects.create(
            action="completed" if task.done else "updated",
            task=task
        )

    def perform_destroy(self, instance):
        Activity.objects.create(action="deleted", task=instance)
        instance.delete()
        

class ActivityListAPIView(generics.ListAPIView):
    queryset = Activity.objects.all().order_by('-timestamp')[:10]
    serializer_class = ActivitySerializer


class ActivityStatsAPIView(generics.GenericAPIView):
    serializer_class = ActivitySerializer

    def get(self, request):
        last_30_days = now() - timedelta(days=30)

        data = (
            Activity.objects.filter(timestamp__gte=last_30_days)
            .annotate(day=TruncDate("timestamp"))
            .values("day")
            .annotate(count=Count("id"))
            .order_by("day")
        )

        return Response(data)
    
class MarketAPIView(APIView):
    def get(self, request):
        try:
            # دلار
            dollar_res = requests.get("https://api.tgju.online/v1/market/price_dollar_rl").json()
            dollar = dollar_res["data"]["price_dollar_rl"]

            # سکه
            gold_res = requests.get("https://api.tgju.online/v1/market/gold").json()
            gold = gold_res["data"]["sekeb"]

            return Response({
                "dollar": {
                    "price": dollar["p"],
                    "change": dollar["d"],
                },
                "gold": {
                    "price": gold["p"],
                    "change": gold["d"],
                }
            })

        except Exception as e:
            return Response({"error": str(e)}, status=500)