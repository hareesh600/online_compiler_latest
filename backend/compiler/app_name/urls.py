from django.contrib import admin
from django.urls import path,include
from . views import RunCode,SignUp,Login,test
urlpatterns = [
    
     path('api/code',RunCode.as_view(),name="Login"),
     path('signin',SignUp.as_view(),name='signin'),
     path('login',Login.as_view(),name='signin'),
     path('test',test,name="test"),
]