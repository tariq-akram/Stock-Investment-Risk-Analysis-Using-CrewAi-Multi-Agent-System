from django.db import models

class AnalysisResult(models.Model):
    symbol = models.CharField(max_length=10)
    risk_tolerance = models.CharField(max_length=10)
    trade_advice = models.TextField()
    risk_assessment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.symbol} - {self.created_at}"