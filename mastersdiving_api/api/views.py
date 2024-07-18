from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from django.conf import settings

# from langchain_openai import ChatOpenAI
# from langchain_core.pydantic_v1 import BaseModel, Field


# openai_api_key = settings.OPENAI_API_KEY

# llm = ChatOpenAI(model="gpt-3.5-turbo")
# import ipdb

# ipdb.set_trace()


# class EmailTemplateAIResponse(BaseModel):
#     email: str = Field(description="The generated email")


# llm.with_structured_output(EmailTemplateAIResponse)

# sample_response = {
#     "First Name": "derek",
#     "Last Name": "moore",
#     "Email": "derek@findthebrink.com",
#     "Which club or organization are you affiliated with? Please select all that apply.": [
#         "iDive Diving Academy",
#         "South Surrey White Rock Divers",
#     ],
#     "Which of the following best describes you?": "I am a diver in a Masters Diving program",
#     "How long have you been involved in the sport of diving?": "10+ years",
#     "Are you currently training?": True,
#     "How often do you train?": "3+ times a week",
#     "Have you competed?": True,
#     "Select all that apply to you:": [
#         "I have competed in my province",
#         "I have competed in Canada outside of my province",
#         "I have competed internationally",
#     ],
#     "Competition Rankings": "2024 / BC / Winter Provincials / 3m / 8th\n2024 / BC / Summer Provincials / Mixed Boards / 1st\n2023 / Japan / World Masters Championships / Platform / 5th place\n2022 / Croatia / Croatian Masters Championchips / 3m / 2nd",
#     "Why is diving important to you?": "it keeps me in shape\nit improves my mental health\nI really, really enjoy it!",
#     "How would losing your masters or learn to dive program impact you?": "It would cause me to have to commute for 2.5 hours a training session to be able to train on the platforms that I need to maintain my rankings\nIt would break up a community that I love and depend on\nIt would reduce my fitness levels",
# }


def generate_email_template_completion(data):
    return None


@api_view(["GET"])
@renderer_classes([JSONRenderer])
def email_template_completions(request):
    response = {
        "data": {
            "completion": generate_email_template_completion(request.data),
            "request": request.data,
        },
        "error": False,
    }
    return Response(response, status=status.HTTP_200_OK)


# Create your views here.
@api_view(["GET"])
@renderer_classes([JSONRenderer])
def index(request):
    return Response({"data": "Hello world!"}, status=status.HTTP_200_OK)
