from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'collections', views.CollectionViewSet, basename='collections')
router.register(r'collection/restaurants', views.RestaurantCollectionViewSet, basename='collection_restaurants')

urlpatterns = [
    path('', include(router.urls))
]
