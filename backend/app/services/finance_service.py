import asyncio
import yfinance as yf
from datetime import datetime, timedelta, timezone

# Allied Telesis Holdings Corp (TSE: 6425)
TICKERS = {
    "sp500": "^GSPC",
    "allied_telesis": "6425.T",
    "btc": "BTC-USD",
}

_cache: dict = {}
_cache_duration = timedelta(minutes=5)


def _fetch_ticker(symbol: str) -> dict | None:
    ticker = yf.Ticker(symbol)
    hist = ticker.history(period="2d")
    if hist.empty:
        return None
    latest = hist.iloc[-1]
    prev = hist.iloc[-2] if len(hist) > 1 else hist.iloc[0]
    price = float(latest["Close"])
    prev_price = float(prev["Close"])
    change = price - prev_price
    change_pct = (change / prev_price * 100) if prev_price != 0 else 0.0
    return {
        "symbol": symbol,
        "price": round(price, 2),
        "change": round(change, 2),
        "change_pct": round(change_pct, 2),
    }


async def get_finance_data() -> dict:
    now = datetime.now(timezone.utc)
    cached = _cache.get("finance")
    if cached and now - cached["timestamp"] < _cache_duration:
        return cached["data"]

    loop = asyncio.get_running_loop()
    names = list(TICKERS.keys())
    symbols = list(TICKERS.values())
    fetched = await asyncio.gather(
        *[loop.run_in_executor(None, _fetch_ticker, s) for s in symbols]
    )
    result = dict(zip(names, fetched))  # None = データ取得失敗（市場休場等）

    _cache["finance"] = {"data": result, "timestamp": now}
    return result
