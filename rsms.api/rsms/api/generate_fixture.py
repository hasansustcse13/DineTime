# This file is only for generate and save RestaurantOpenClosedInfo data

from .models import Restaurant, RestaurantOpenClosedInfo
import random
import datetime

from .utils import DayOfWeek


def generate_open_close_info():
    restaurants = Restaurant.objects.all()
    i = 1
    for restaurant in restaurants.iterator():
        for key in DayOfWeek:
            start = random.randint(0, 8)
            end = random.randint(16, 23)
            oc_info = RestaurantOpenClosedInfo(pk=i, day_of_week=key.value, open_time=datetime.time(start, 0, 0),
                                               close_time=datetime.time(end, 0, 0), restaurant=restaurant)
            oc_info.save()
            i = i + 1
