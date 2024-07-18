from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path(
        "email_template_completions/",
        views.email_template_completions,
        name="email_template_completions",
    ),
]
