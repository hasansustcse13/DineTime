from django.conf import settings
from django.contrib.auth.password_validation import validate_password, get_password_validators
from rest_framework import serializers, exceptions
from django.contrib.auth import get_user_model


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):
        try:
            validate_password(
                data.get("password"),
                user=None,
                password_validators=get_password_validators(settings.AUTH_PASSWORD_VALIDATORS)
            )
        except Exception as e:
            raise exceptions.ValidationError({
                'password': e.messages
            })

        return super(UserRegisterSerializer, self).validate(data)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        instance.set_password(password)
        instance.save()
        return instance
