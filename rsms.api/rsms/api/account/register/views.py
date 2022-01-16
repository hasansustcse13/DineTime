from rest_framework import viewsets, status
from rest_framework.response import Response

from .serializers import UserRegisterSerializer
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema


class UserRegisterViewSet(viewsets.ViewSet):

    @swagger_auto_schema(request_body=UserRegisterSerializer,
                         responses={201: openapi.Response('', UserRegisterSerializer)})
    def create(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
