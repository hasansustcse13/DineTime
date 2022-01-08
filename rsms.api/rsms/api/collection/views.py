from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import CollectionSerializer, RestaurantCollectionSerializer
from ..models import Collection, RestaurantCollection


class CollectionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = CollectionSerializer

    def get_queryset(self):
        return Collection.objects.filter(user=self.request.user)


class RestaurantCollectionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = RestaurantCollectionSerializer

    def get_queryset(self):
        return RestaurantCollection.objects.filter(collection__user=self.request.user)

    @action(methods=['delete'], detail=False)
    def delete(self, request, *args, **kwargs):
        restaurant_id = request.data.get('restaurant_id', None)
        collection_id = request.data.get('collection_id', None)
        instance = get_object_or_404(RestaurantCollection, restaurant_id=restaurant_id, collection_id=collection_id)
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)
