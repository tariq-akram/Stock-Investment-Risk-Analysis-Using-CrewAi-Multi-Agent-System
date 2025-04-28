from rest_framework import serializers
from .models import AnalysisResult

class AnalysisRequestSerializer(serializers.Serializer):
    symbol = serializers.CharField(max_length=10)
    risk_tolerance = serializers.ChoiceField(choices=['Low', 'Medium', 'High'])

class AnalysisResultSerializer(serializers.ModelSerializer):
    chart_data = serializers.JSONField(default=dict)  # To store chart data

    class Meta:
        model = AnalysisResult
        fields = '__all__'