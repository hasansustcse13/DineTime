from django.urls import path, include
from rest_framework import routers

from . import views

router = routers.DefaultRouter()
router.register(r'authentication', views.AuthenticationViewSet, basename='authentication')

urlpatterns = [
    path('', include(router.urls))
]
