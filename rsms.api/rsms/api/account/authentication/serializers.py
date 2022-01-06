from django.contrib.auth import get_user_model
from rest_framework import serializers


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=128)
    password = serializers.CharField(max_length=128)


class UserSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = get_user_model()
        fields = ['id', 'email', 'full_name']

    def get_full_name(self, obj):
        full_name = '%s %s' % (obj.first_name, obj.last_name)
        return full_name.strip()
