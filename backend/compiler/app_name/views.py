from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import requests
from .serializers import SignupSerializer,LoginSerializer
from .models import CustomUser
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework import serializers
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.tokens import AccessToken
import json
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.http import HttpResponse
@method_decorator(csrf_exempt, name='dispatch')
class SignUp(APIView):
    def post(self,request):
        serializer=SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":"user sucefully created","status":status.HTTP_200_OK})
        else:
            return Response({"message":"something went wrong","status":status.HTTP_400_BAD_REQUEST})
        
class Login(APIView):

    def post(self,request):
        serializer=LoginSerializer(data=request.data)

        if serializer.is_valid():
            username = serializer.validated_data.get('email')
            password = serializer.validated_data.get('password') 
            user = authenticate(request, email=username, password=password)
            try:
                user = CustomUser.objects.get(email=username)
                if user is not None:

                    user_token=user.token
                    refresh = RefreshToken.for_user(user)
                    access_token = str(refresh.access_token)
                    token_payload = AccessToken(access_token).payload
                    return Response({"message":"you are logged in succefully","token":user_token,"jwt_token":access_token,"status":status.HTTP_200_OK})
                else:
                    return Response({"message": "Invalid credentials", "status": status.HTTP_400_BAD_REQUEST})
            except:
                return Response({"message": "Invalid credentials", "status": status.HTTP_400_BAD_REQUEST})

        else:
            return Response({"message": "Invalid credentials", "status": status.HTTP_400_BAD_REQUEST})
           

import re

def replace_input_statements(input_string, replacement_values):
    # Define a regular expression pattern to match various forms of input() calls
    pattern = re.compile(r'input\s*\([^)]*\)')

    # Replace matched patterns with values from the list
    def replace_callback(match):
        return f'"{replacement_values.pop(0)}"' if replacement_values else '2'

    modified_string = pattern.sub(replace_callback, input_string)

    return modified_string

def modified_code(data):
    input_data = list(data['inputdata'].split('\n'))
    for i in range(len(input_data)):
        input_data[i] = str(input_data[i].strip())
    data['code'] = replace_input_statements(data['code'],input_data)
  
class RunCode(APIView):
    authentication_classes = [JWTAuthentication]
    def post(self,request):
        data=request.data
        modified_code(data)
        print(data)

        url = "http://compiler:8080/2015-03-31/functions/function/invocations"
        response = requests.post(url, json=data)
        json_data=response.json()
        return Response({'message':'compiled succesfully','output':json_data['body'],'status':status.HTTP_200_OK})

        
        
        

       
