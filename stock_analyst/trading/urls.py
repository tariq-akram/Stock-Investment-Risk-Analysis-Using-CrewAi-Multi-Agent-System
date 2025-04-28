from django.urls import path
from .views import AnalyzeTradeView

urlpatterns = [
    path('analyze/', AnalyzeTradeView.as_view(), name='analyze_trade'),
]