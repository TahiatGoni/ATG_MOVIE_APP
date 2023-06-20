from django.urls import path
from .views import (
    MovieView,
    SignupView,
    LoginView,
)

urlpatterns = [
    path('signup/', SignupView.as_view()),
    path('login/', LoginView.as_view()),
    path('movies/', MovieView.as_view()),
    path('movies/<int:id>/', MovieView.as_view()),
]