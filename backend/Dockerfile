FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --timeout 120 --upgrade pip setuptools wheel
RUN pip install --timeout 120 --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
