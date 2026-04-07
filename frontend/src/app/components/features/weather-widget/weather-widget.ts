import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe, UpperCasePipe } from '@angular/common';
import { UiCard } from '../../ui/ui-card/ui-card';

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  condition: string;
}

@Component({
  selector: 'app-weather-widget',
  imports: [UiCard, DecimalPipe, UpperCasePipe],
  templateUrl: './weather-widget.html',
  styleUrl: './weather-widget.scss',
})
export class WeatherWidget implements OnInit {
  data: WeatherData | null = null;
  error = false;
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<WeatherData>('/api/weather').subscribe({
      next: (res) => {
        this.data = res;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }
}
