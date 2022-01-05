from datetime import datetime

from rest_framework import viewsets
from rest_framework.response import Response

from ..models import Restaurant, RestaurantOpenClosedInfo
from .serializers import RestaurantSerializer, RestaurantOpenClosedInfoSerializer


class RestaurantViewSet(viewsets.ViewSet):

    def get_queryset(self):
        queryset = Restaurant.objects.all()

        restaurant_name = self.request.GET.get('restaurant_name')
        if restaurant_name:
            restaurant_name = restaurant_name.strip()
            queryset = queryset.filter(name__icontains=restaurant_name)

        return queryset

    def list(self, request):
        restaurants = self.get_queryset()
        serializer = RestaurantSerializer(restaurants, many=True)
        return Response(serializer.data)


class RestaurantInfoViewSet(viewsets.ViewSet):

    def get_queryset(self):
        queryset = RestaurantOpenClosedInfo.objects.all()

        restaurant_name = self.request.GET.get('restaurant_name')
        date_time = self.request.GET.get('date_time')

        if restaurant_name:
            restaurant_name = restaurant_name.strip()
            queryset = queryset.filter(restaurant__name__icontains=restaurant_name)

        if date_time:
            date_time = datetime.strptime(date_time, "%Y-%m-%dT%H:%M")
            day_of_week = date_time.weekday()
            time = date_time.time()
            queryset = queryset.filter(day_of_week=day_of_week, open_time__lte=time, close_time__gte=time)

        return queryset

    def list(self, request):
        restaurants = self.get_queryset()
        serializer = RestaurantOpenClosedInfoSerializer(restaurants, many=True)
        return Response(serializer.data)
