import pandas as pd
import os
import numpy as np
import matplotlib
matplotlib.use('Agg')  # Non-interactive backend
import matplotlib.pyplot as plt
import io
import base64
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import AnalysisRequestSerializer, AnalysisResultSerializer
from .models import AnalysisResult
from alpha_vantage.timeseries import TimeSeries
from transformers import AutoModelForCausalLM, AutoTokenizer
from crewai import Agent
from huggingface_hub import login

# Initialize external services
login(os.getenv("HUGGING_FACE_API_KEY"))
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-1B")
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-1B")
ALPHA_VANTAGE_API_KEY = os.getenv("ALPHA_VANTAGE_API_KEY")
ts = TimeSeries(key=ALPHA_VANTAGE_API_KEY, output_format='pandas')

# Your Agent classes (DataAnalystAgent, TradingStrategyDeveloper, etc.)
# [Copy your agent classes here as provided in the original code]

class DataAnalystAgent(Agent):
    def analyze_market_data(self, symbol="AAPL"):
        data, meta_data = ts.get_intraday(symbol=symbol, interval='5min', outputsize='full')
        return data

data_analyst = DataAnalystAgent(
    name="Data Analyst",
    description="Monitors and analyzes market data.",
    role="Monitor and analyze market data in real-time.",
    goal="Provide critical insights for trading decisions.",
    backstory="An expert in financial markets with a focus on statistical modeling."
)

class TradingStrategyDeveloper(Agent):
    def develop_strategy(self, market_data, risk_tolerance):
        market_data['SMA_10'] = market_data['4. close'].rolling(window=10).mean()
        market_data['SMA_50'] = market_data['4. close'].rolling(window=50).mean()
        market_data['Signal'] = np.where(market_data['SMA_10'] > market_data['SMA_50'], "Buy", "Sell")
        return market_data[['4. close', 'SMA_10', 'SMA_50', 'Signal']]

strategy_developer = TradingStrategyDeveloper(
    name="Trading Strategy Developer",
    description="Develops and refines trading strategies.",
    role="Create profitable and risk-averse trading strategies.",
    goal="Optimize trading performance based on market insights.",
    backstory="A quantitative analyst with a strong background in financial markets."
)

class TradeAdvisor(Agent):
    def advise_trade(self, strategy_data):
        signals = strategy_data[strategy_data['Signal'] == "Buy"]
        return signals.tail(5)  # Example: Last 5 buy signals

trade_advisor = TradeAdvisor(
    name="Trade Advisor",
    description="Provides advice on trade execution.",
    role="Recommend optimal trade execution strategies.",
    goal="Ensure trades are executed efficiently.",
    backstory="An experienced trader focused on execution strategies."
)

class RiskAdvisor(Agent):
    def assess_risks(self, strategy_data):
        close_column = next((col for col in strategy_data.columns if 'close' in col.lower()), None)

        if not close_column:
            raise KeyError("Close price column not found in the data. Ensure the close column is passed.")

        clean_data = strategy_data[close_column].dropna()
        risk_metric = clean_data.pct_change().std()

        if risk_metric > 0.02:  # Example threshold
            risk_level = "High Risk"
            explanation = (
                "The calculated risk metric (standard deviation of price changes) "
                f"is {risk_metric:.4f}, which exceeds the acceptable threshold. "
                "This indicates significant price volatility."
            )
            suggestion = "Consider reducing your investment or diversifying to mitigate risk."
        else:
            risk_level = "Low Risk"
            explanation = (
                "The calculated risk metric (standard deviation of price changes) "
                f"is {risk_metric:.4f}, which is within the acceptable range. "
                "This indicates relatively stable price behavior."
            )
            suggestion = "You may proceed with investment as per your strategy."

        # Combine detailed information
        additional_info = f"{explanation}\nSuggestion: {suggestion}"
        return risk_level, additional_info

risk_advisor = RiskAdvisor(
    name="Risk Advisor",
    description="Evaluates trading risks.",
    role="Assess risks associated with trading strategies.",
    goal="Deliver comprehensive risk analysis.",
    backstory="A risk management specialist with a deep understanding of market dynamics."
)


class LLMResponder:
    def generate_response(self, prompt):
        if tokenizer.pad_token is None:
            tokenizer.pad_token = tokenizer.eos_token
        inputs = tokenizer(prompt, return_tensors="pt", padding=True, truncation=True)
        outputs = model.generate(inputs['input_ids'], max_length=200, num_return_sequences=1, no_repeat_ngram_size=2, attention_mask=inputs['attention_mask'])
        return tokenizer.decode(outputs[0], skip_special_tokens=True)

llm_responder = LLMResponder()

def get_risk_tolerance_word(risk_tolerance):
    if risk_tolerance == "Low":
        return 0.33
    elif risk_tolerance == "Medium":
        return 0.5
    elif risk_tolerance == "High":
        return 0.8
    raise ValueError("Invalid risk tolerance value.")

class AnalyzeTradeView(APIView):
    def post(self, request):
        serializer = AnalysisRequestSerializer(data=request.data)
        if serializer.is_valid():
            symbol = serializer.validated_data['symbol']
            risk_tolerance = serializer.validated_data['risk_tolerance']
            numeric_risk_tolerance = get_risk_tolerance_word(risk_tolerance)

            try:
                # Step 1: Analyze market data
                data_analyst = DataAnalystAgent(name="Data Analyst", description="...", role="...", goal="...", backstory="...")
                market_data = data_analyst.analyze_market_data(symbol)

                # Step 2: Develop strategy
                strategy_developer = TradingStrategyDeveloper(name="Strategy Developer", description="...", role="...", goal="...", backstory="...")
                strategy = strategy_developer.develop_strategy(market_data, numeric_risk_tolerance)

                # Calculate returns
                strategy['Returns'] = strategy['4. close'].pct_change()
                strategy['Cumulative Returns'] = (1 + strategy['Returns']).cumprod()

                # Step 3: Advise trades
                trade_advisor = TradeAdvisor(name="Trade Advisor", description="...", role="...", goal="...", backstory="...")
                trade_signals = trade_advisor.advise_trade(strategy)

                # Step 4: Assess risks
                risk_advisor = RiskAdvisor(name="Risk Advisor", description="...", role="...", goal="...", backstory="...")
                risk_report, additional_info = risk_advisor.assess_risks(strategy)

                # Generate charts
                plt.figure(figsize=(12, 6))
                plt.plot(strategy['4. close'], label='Close Price', color='blue', alpha=0.8)
                plt.plot(strategy['SMA_10'], label='10-period SMA', color='green', linestyle='--')
                plt.plot(strategy['SMA_50'], label='50-period SMA', color='red', linestyle='--')
                buy_signals = strategy[strategy['Signal'] == "Buy"]
                sell_signals = strategy[strategy['Signal'] == "Sell"]
                plt.scatter(buy_signals.index, buy_signals['4. close'], label='Buy Signal', marker='^', color='green')
                plt.scatter(sell_signals.index, sell_signals['4. close'], label='Sell Signal', marker='v', color='red')
                plt.title(f"Buy/Sell Signals for {symbol}")
                plt.xlabel("Time")
                plt.ylabel("Price")
                plt.legend()
                plt.grid(alpha=0.3)
                buf = io.BytesIO()
                plt.savefig(buf, format='png')
                plt.close()
                buf.seek(0)
                price_chart = base64.b64encode(buf.getvalue()).decode('utf-8')

                plt.figure(figsize=(10, 6))
                plt.plot(strategy['Cumulative Returns'], label='Cumulative Returns', color='orange')
                plt.title("Cumulative Returns Over Time")
                plt.xlabel("Time")
                plt.ylabel("Cumulative Returns")
                plt.grid(alpha=0.3)
                plt.legend()
                buf = io.BytesIO()
                plt.savefig(buf, format='png')
                plt.close()
                buf.seek(0)
                returns_chart = base64.b64encode(buf.getvalue()).decode('utf-8')

                # LLM responses
                llm_prompts = {
                    "trade_advice": f"Stock: {symbol}\nCurrent Price: {strategy['4. close'].iloc[-1]:.2f}\nBased on recent market data, the recommended trade signal is: {trade_signals['Signal'].iloc[-1]}.\nThe 10-period and 50-period SMAs are: {strategy['SMA_10'].iloc[-1]:.2f}, {strategy['SMA_50'].iloc[-1]:.2f}.",
                    "risk_assessment": f"Risk Assessment for {symbol} (Risk tolerance: {risk_tolerance}): The calculated risk is: {risk_report}. Recent price movements indicate a risk of {additional_info}. Based on current trends, the stock is expected to {additional_info.lower()}."
                }
                trade_advice_response = llm_responder.generate_response(llm_prompts["trade_advice"])
                risk_assessment_response = llm_responder.generate_response(llm_prompts["risk_assessment"])

                # Save result
                result = AnalysisResult.objects.create(
                    symbol=symbol,
                    risk_tolerance=risk_tolerance,
                    trade_advice=trade_advice_response,
                    risk_assessment=risk_assessment_response
                )

                # Prepare response
                response_data = AnalysisResultSerializer(result).data
                response_data['chart_data'] = {
                    'price_chart': f"data:image/png;base64,{price_chart}",
                    'returns_chart': f"data:image/png;base64,{returns_chart}"
                }
                return Response(response_data, status=status.HTTP_200_OK)

            except Exception as e:
                return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)