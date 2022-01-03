from rest_framework import serializers

from ..models import Restaurant, RestaurantOpenClosedInfo


class RestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = '__all__'


class RestaurantOpenClosedInfoSerializer(serializers.ModelSerializer):
    restaurant_id = serializers.IntegerField(source='restaurant.id', required=True)
    restaurant_name = serializers.CharField(source='restaurant.name', required=True)
    open_time = serializers.SerializerMethodField()
    close_time = serializers.SerializerMethodField()

    def get_open_time(self, obj):
        return obj.open_time.strftime("%I:%M %p")

    def get_close_time(self, obj):
        return obj.close_time.strftime("%I:%M %p")

    class Meta:
        model = RestaurantOpenClosedInfo
        exclude = ('restaurant',)
