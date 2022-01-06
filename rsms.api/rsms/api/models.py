from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
from .user_manager import UserManager
from .utils import DayOfWeek


class User(AbstractUser):
    email = models.EmailField(max_length=128, unique=True)
    password = models.CharField(max_length=256)
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = UserManager()

    def __str__(self):
        return self.email


class Restaurant(models.Model):
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class RestaurantOpenClosedInfo(models.Model):
    open_time = models.TimeField()
    close_time = models.TimeField()
    day_of_week = models.IntegerField(choices=DayOfWeek.choices(), default=1)
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE, related_name='open_closed_infos')

    def __str__(self):
        return str(self.pk)
