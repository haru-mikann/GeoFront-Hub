from fastapi import APIRouter, HTTPException
from app.services.weather_service import get_tokyo_weather

router = APIRouter(prefix="/api/weather", tags=["weather"])


@router.get("")
async def weather():
    try:
        return await get_tokyo_weather()
    except ValueError as e:
        raise HTTPException(status_code=503, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Weather API error: {e}")
