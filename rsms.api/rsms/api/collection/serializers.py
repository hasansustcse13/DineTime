from rest_framework import serializers

from ..models import Collection, RestaurantCollection


class CollectionSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Collection
        fields = '__all__'

        depth = 1


class RestaurantCollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = RestaurantCollection
        fields = '__all__'
