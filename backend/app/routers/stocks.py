from fastapi import APIRouter, HTTPException
from app.services.finance_service import get_finance_data

router = APIRouter(prefix="/api/finance", tags=["finance"])


@router.get("")
async def finance():
    try:
        return await get_finance_data()
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Finance API error: {e}")
