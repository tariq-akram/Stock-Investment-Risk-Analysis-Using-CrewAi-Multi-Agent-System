# Stock Trading Analyzer

![Stock Trading Analyzer](frontend/src/assets/hero-bg.jpg) <!-- Update with actual screenshot or logo -->

A full-stack web application for analyzing stock market data and providing AI-driven trade recommendations. Built with **Django** (backend) and **React** (frontend), this project integrates real-time stock data from **Alpha Vantage**, sentiment analysis via **Hugging Face**, and interactive visualizations to empower investors, especially beginners, to make informed decisions.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features
- **Stock Analysis**: Input a stock symbol (e.g., AAPL, TSLA) and risk tolerance to receive trade advice, risk assessments, and visualizations (price charts, cumulative returns).
- **Sentiment Analysis**: Analyzes news articles using Hugging Face’s NLP models to gauge market sentiment.
- **Modern UI**: Responsive React frontend with animations, glassmorphism cards, and a UK-inspired color scheme (blue, red, gold).
- **Secure Configuration**: API keys and sensitive data stored in `.env` files.
- **Real-Time Data**: Fetches stock data and news via Alpha Vantage API.
- **Interactive Components**: Animated navbar, hero section, and form with skeleton loaders for a smooth UX.

## Technologies
- **Backend**:
  - Django 4.x
  - Django REST Framework
  - Python libraries: `yfinance`, `matplotlib`, `pandas`, `requests`
  - `python-decouple` for environment variables
- **Frontend**:
  - React 18.x
  - Bootstrap 5.x
  - Framer Motion (animations)
  - Font Awesome (icons)
  - React Spinners (loaders)
  - React Select, React Toastify
- **APIs**:
  - Alpha Vantage (stock data and news)
  - Hugging Face (sentiment analysis)
- **Tools**:
  - Git, npm, pip
  - SQLite (development database)

## Prerequisites
- **Python** 3.8+
- **Node.js** 16.x+
- **npm** 8.x+
- **Git**
- API keys for:
  - [Alpha Vantage](https://www.alphavantage.co/support/#api-key)
  - [Hugging Face](https://huggingface.co/settings/tokens)

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/stock-trading-analyzer.git
   cd stock-trading-analyzer
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd stock_analyst
     ```
   - Create and activate a virtual environment:
     ```bash
     python -m venv .venv
     .venv\Scripts\activate  # Windows
     source .venv/bin/activate  # Mac/Linux
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Create a `.env` file in `stock_analyst/`:
     ```
     SECRET_KEY=your_django_secret_key
     DEBUG=True
     ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
     HUGGING_FACE_API_KEY=your_hugging_face_key
     DATABASE_URL=sqlite:///db.sqlite3
     ```
   - Run migrations:
     ```bash
     python manage.py migrate
     ```

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd ../frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - (Optional) Create a `.env` file in `frontend/` for frontend-specific keys:
     ```
     REACT_APP_API_URL=http://localhost:8000
     ```

4. **Start the Servers**:
   - **Backend**:
     ```bash
     cd stock_analyst
     .venv\Scripts\activate
     python manage.py runserver
     ```
   - **Frontend** (in a new terminal):
     ```bash
     cd frontend
     npm start
     ```

5. **Access the App**:
   - Open `http://localhost:3000` in your browser.

## Usage
1. **Analyze a Stock**:
   - On the homepage, select a stock (e.g., AAPL) from the dropdown.
   - Choose your investment goal, time horizon, and loss comfort level.
   - Click **Analyze Now** to view trade advice, risk assessment, charts, and news.
2. **Toggle Theme**:
   - Use the theme toggle button to switch between light and dark modes.
3. **View News**:
   - Scroll to the news section to see sentiment-analyzed articles for the selected stock.
4. **Interact with UI**:
   - Explore the animated navbar, hero section, and responsive design.

## Project Structure
```
stock-trading-analyzer/
├── stock_analyst/           # Django backend
│   ├── stock_analyzer/      # Django app
│   │   ├── migrations/
│   │   ├── views.py
│   │   └── ...
│   ├── stock_trading/       # Django project settings
│   ├── manage.py
│   ├── requirements.txt
│   └── .env                 # Sensitive data (not tracked)
├── frontend/                # React frontend
│   ├── src/
│   │   ├── assets/          # Images, logo
│   │   ├── components/      # React components
│   │   ├── services/        # API calls
│   │   ├── styles.css
│   │   └── App.js
│   ├── public/
│   ├── package.json
│   └── .env                 # Frontend env (optional)
├── .gitignore
└── README.md
```

## API Endpoints
- **POST `/api/analyze/`**:
  - **Request**:
    ```json
    {
      "symbol": "AAPL",
      "risk_tolerance": "Medium"
    }
    ```
  - **Response**:
    ```json
    {
      "symbol": "AAPL",
      "trade_advice": "Based on trends and positive sentiment, consider buying AAPL...",
      "risk_assessment": "Risk level for AAPL is moderate...",
      "chart_data": {
        "price_chart": "data:image/png;base64,...",
        "returns_chart": "data:image/png;base64,..."
      },
      "news": [...],
      "sentiment": ["POSITIVE", "NEGATIVE", ...]
    }
    ```

## Screenshots
<!-- Add screenshots or update paths -->
- **Home Page**:
  ![Home Page](frontend/src/assets/screenshot-home.png)
- **Analysis Results**:
  ![Results](frontend/src/assets/screenshot-results.png)

## Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md) and ensure tests pass.

## License
This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgements
- **Alpha Vantage** for stock data and news APIs.
- **Hugging Face** for sentiment analysis models.
- **Django** and **React** communities for robust frameworks.
- **Font Awesome** and **Bootstrap** for UI components.

---

Built as a final year project to simplify stock trading for beginners. Feedback and contributions are welcome!