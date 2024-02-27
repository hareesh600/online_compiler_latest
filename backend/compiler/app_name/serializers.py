from rest_framework import serializers
from .models import CustomUser

class SignupSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['email','password']



class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()