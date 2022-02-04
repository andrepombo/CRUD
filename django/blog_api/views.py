from rest_framework import viewsets , filters, generics, permissions
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from blog.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import (SAFE_METHODS, IsAuthenticated, IsAuthenticatedOrReadOnly, 
BasePermission, IsAdminUser, DjangoModelPermissions, AllowAny)
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import status


class PostList(generics.ListAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    
    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user)

class PostDetail(generics.RetrieveAPIView):

    serializer_class = PostSerializer

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(Post, id=item)

class PostListDetailfilter(generics.ListAPIView):

    serializer_class = PostSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['^nome']

    def get_queryset(self):
        user = self.request.user
        return Post.objects.filter(author=user)

    # '^' Starts-with search.
    # '=' Exact matches.
    # '@' Full-text search. (Currently only supported Django's PostgreSQL backend.)
    # '$' Regex search.

# Post Admin

# class CreatePost(generics.CreateAPIView):
#     permission_classes = [permissions.IsAuthenticated]
#     queryset = Post.objects.all()
#     serializer_class = PostSerializer

class CreatePost(APIView):
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, format=None):
        print(request.data)
        serializer = PostSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminPostDetail(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class EditPost(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

class DeletePost(generics.RetrieveDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()



""" Concrete View Classes
# CreateAPIView
Used for create-only endpoints.
# ListAPIView
Used for read-only endpoints to represent a collection of model instances.
# RetrieveAPIView
Used for read-only endpoints to represent a single model instance.
# DestroyAPIView
Used for delete-only endpoints for a single model instance.
# UpdateAPIView
Used for update-only endpoints for a single model instance.
# ListCreateAPIView
Used for read-write endpoints to represent a collection of model instances.
RetrieveUpdateAPIView
Used for read or update endpoints to represent a single model instance.
# RetrieveDestroyAPIView
Used for read or delete endpoints to represent a single model instance.
# RetrieveUpdateDestroyAPIView
Used for read-write-delete endpoints to represent a single model instance.
"""