from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'restaurants', views.RestaurantViewSet, basename='restaurants')
router.register(r'restaurant_infos', views.RestaurantInfoViewSet, basename='restaurant_infos')

urlpatterns = [
    path('', include(router.urls)),
]
