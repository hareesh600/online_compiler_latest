FROM python:3



RUN apt-get update
#RUN apt-get install python3 python3-pip -y

WORKDIR ./backend


COPY ./requirements.txt .

RUN pip install -r requirements.txt

COPY ./ ./

EXPOSE 8000



CMD ["bash" , "script.sh"]


