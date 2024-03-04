from channels.generic.websocket import AsyncWebsocketConsumer
import json
import asyncio
import time
from asgiref.sync import async_to_sync
from channels.consumer import AsyncConsumer
from rest_framework import status
from rest_framework_simplejwt.tokens import AccessToken
from .models import CustomUser
from channels.db import database_sync_to_async
class TestConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("connected")
        await self.accept()
        url_path = self.scope['path']
        token = url_path.split('/')[-2]
        await self.channel_layer.group_add(token, self.channel_name)
        print(self.channel_name)
        print(self.channel_layer)
        response={"message":"your websocket connection is succefully established","status":status.HTTP_201_CREATED}
        await self.send(text_data=json.dumps(response))

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        url_path = self.scope['path']
        token = url_path.split('/')[-2]
        check=text_data_json.get('Message',None)
        if check:
             await self.channel_layer.group_send(token, {
            'type': 'chat.message',
            'Message': text_data_json['Message'],
            'from':text_data_json['jwt']
            })
        else:
            await self.channel_layer.group_send(token, {
            'type': 'chat.message',
            'message': text_data_json['code']
            })

    async def chat_message(self, event):
        print(event)
        print(type(event))
        if event.get("Message",None):
            token_payload = AccessToken(event['from']).payload
            userid = token_payload.get('user_id')
            user = await database_sync_to_async(CustomUser.objects.get)(id=userid)

            await self.send(text_data=json.dumps({
                'Message': event['Message'],
                'from':user.email
            })) 
        else:
            await self.send(text_data=json.dumps({
                'code': event['message'],
            }))

    async def disconnect(self, close_code):
        url_path = self.scope['path']
        token = url_path.split('/')[-2]
        print(token)
        await self.channel_layer.group_discard(token, self.channel_name)
        print("disconnected")
