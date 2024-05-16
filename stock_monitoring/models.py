from django.db import models
from django.contrib.auth.models import User

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    symbol = models.CharField(max_length=10)

class Stock(models.Model):
    symbol = models.CharField(max_length=10)
    price = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)
