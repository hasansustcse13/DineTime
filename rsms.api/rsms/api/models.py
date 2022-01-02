from django.db import models

# Create your models here.
from .utils import DayOfWeek


class Restaurant(models.Model):
    name = models.CharField(max_length=128)


class RestaurantOpenClosedInfo(models.Model):
    open_time = models.TimeField()
    close_time = models.TimeField()
    day_of_week = models.IntegerField(choices=DayOfWeek.choices(), default=1)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='restaurants')
