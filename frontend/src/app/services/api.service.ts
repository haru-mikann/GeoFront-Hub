import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  condition: string;
}

export interface TickerData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  change_pct: number;
  currency: string;
}

export interface FinanceData {
  [symbol: string]: TickerData;
}

export interface Task {
  id: number;
  title: string;
  done: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly base = 'http://localhost:8000';

  constructor(private http: HttpClient) {}

  getWeather(): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${this.base}/api/weather`);
  }

  getFinance(): Observable<FinanceData> {
    return this.http.get<FinanceData>(`${this.base}/api/finance`);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.base}/api/tasks`);
  }

  addTask(title: string): Observable<Task> {
    return this.http.post<Task>(`${this.base}/api/tasks`, { title });
  }

  updateTask(id: number, data: { title?: string; done?: boolean }): Observable<Task> {
    return this.http.put<Task>(`${this.base}/api/tasks/${id}`, data);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/api/tasks/${id}`);
  }
}
