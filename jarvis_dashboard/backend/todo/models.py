from django.db import models

class Task(models.Model):
    text = models.CharField(max_length=255)
    done = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.text

class Activity(models.Model):
    ACTIONS = (
        ("created", "Created"),
        ("updated", "Updated"),
        ("completed", "Completed"),
        ("deleted", "Deleted"),
    )

    action = models.CharField(max_length=20, choices=ACTIONS)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)
