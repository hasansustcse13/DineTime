from django.contrib.auth import get_user_model
from rest_framework import serializers


class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=128)
    password = serializers.CharField(max_length=128)

    class Meta:
        model = get_user_model()
        fields = ['email', 'password']


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'full_name']

    def get_full_name(self, obj):
        full_name = '%s %s' % (obj.first_name, obj.last_name)
        return full_name.strip()


class CustomUserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    email = serializers.EmailField()
    full_name = serializers.CharField()
    access_token = serializers.CharField()
    refresh_token = serializers.CharField()

    class Meta:
        model = get_user_model()
        fields = fields = ['id', 'email', 'id', 'full_name', 'access_token', 'refresh_token']
