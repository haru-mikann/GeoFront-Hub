import os
import httpx
from datetime import datetime, timedelta, timezone

OPENWEATHERMAP_API_KEY = os.getenv("OPENWEATHERMAP_API_KEY", "")
_cache: dict = {}
_cache_duration = timedelta(minutes=10)


async def get_tokyo_weather() -> dict:
    now = datetime.now(timezone.utc)
    cached = _cache.get("weather")
    if cached and now - cached["timestamp"] < _cache_duration:
        return cached["data"]

    if not OPENWEATHERMAP_API_KEY:
        raise ValueError("OPENWEATHERMAP_API_KEY is not set")

    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {
        "q": "Tokyo",
        "appid": OPENWEATHERMAP_API_KEY,
        "units": "metric",
        "lang": "ja",
    }

    async with httpx.AsyncClient() as client:
        response = await client.get(url, params=params, timeout=10.0)
        response.raise_for_status()
        raw = response.json()

    result = {
        "location": raw["name"],
        "temperature": raw["main"]["temp"],
        "humidity": raw["main"]["humidity"],
        "condition": raw["weather"][0]["description"],
    }

    _cache["weather"] = {"data": result, "timestamp": now}
    return result
