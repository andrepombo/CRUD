from rest_framework import serializers
from blog.models import Post
from django.conf import settings


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        fields = ('category','id', 'sobrenome','image','slug', 'author', 'nome', 'hobbies', 'status', 
        'naturalidade', 'nascimento'
        )
        model = Post

class UserRegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True)
    username = serializers.CharField(required=True)
    password = serializers.CharField(min_length=8, write_only=True)

    class Meta:
        model = settings.AUTH_USER_MODEL
        fields = ('email', 'user_name', 'first_name')
        extra_kwargs = {'password': {'write_only': True}}