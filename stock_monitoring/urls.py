from django.urls import path
from .views import LoginAPIView, WatchlistAPIView

urlpatterns = [
    path('login/', LoginAPIView.as_view(), name='login'),
    path('watchlist/', WatchlistAPIView.as_view(), name='watchlist'),
]
