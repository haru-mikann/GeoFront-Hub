import { Component, OnInit } from '@angular/core';
import { DecimalPipe, UpperCasePipe } from '@angular/common';
import { ApiService, WeatherData } from '../../../services/api.service';
import { UiCard } from '../../ui/ui-card/ui-card';

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

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getWeather().subscribe({
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
