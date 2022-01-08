from django.contrib.auth import authenticate, login, logout
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserLoginSerializer, UserSerializer


class AuthenticationViewSet(viewsets.ViewSet):

    @action(methods=['post'], detail=False)
    def login(self, request):
        login_serializer = UserLoginSerializer(data=request.data)
        login_serializer.is_valid(raise_exception=True)

        email = login_serializer.validated_data["email"]
        password = login_serializer.validated_data["password"]

        auth_user = authenticate(request, email=email, password=password)

        if auth_user is None:
            return Response({'invalid_email_password': ["Email or Password not valid."]},
                            status=status.HTTP_400_BAD_REQUEST)

        login(request, auth_user)

        refresh = RefreshToken.for_user(auth_user)
        access = refresh.access_token
        access['email'] = auth_user.email
        access['id'] = auth_user.id

        serializer = UserSerializer(auth_user)
        serialized_data = serializer.data

        serialized_data["refresh_token"] = str(refresh)
        serialized_data["access_token"] = str(access)

        return Response(serialized_data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=False, permission_classes=[IsAuthenticated])
    def logout(self, request):
        logout(request)
        return Response({'detail': "Logout successful."}, status=status.HTTP_200_OK)
