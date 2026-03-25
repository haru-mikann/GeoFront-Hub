from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import weather, stocks, tasks

app = FastAPI(title="GeoFront Hub API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(weather.router)
app.include_router(stocks.router)
app.include_router(tasks.router)


@app.get("/")
async def health_check():
    return {"status": "System Online", "message": "MAGI System is monitoring..."}
