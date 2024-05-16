from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import authenticate

class LoginAPIView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user:
            return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class WatchlistAPIView(APIView):
    def get(self, request, *args, **kwargs):
        # Implement logic to retrieve watchlist data for the authenticated user
        # Sample logic:
        watchlist = Watchlist.objects.filter(user=request.user)
        data = [{'symbol': item.symbol} for item in watchlist]
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        # Implement logic to add a symbol to the authenticated user's watchlist
        # Sample logic:
        symbol = request.data.get('symbol')
        Watchlist.objects.create(user=request.user, symbol=symbol)
        return Response({'message': 'Symbol added to watchlist'}, status=status.HTTP_201_CREATED)
