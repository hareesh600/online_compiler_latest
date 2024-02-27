from django.urls import path

from . import consumers

ws_patterns=[
    path('ws/<token_group_name>', consumers.TestConsumer.as_asgi()),

]