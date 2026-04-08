import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarMenu } from './components/features/sidebar-menu/sidebar-menu';
import { WeatherWidget } from './components/features/weather-widget/weather-widget';
import { FinanceWidget } from './components/features/finance-widget/finance-widget';
import { TaskWidget } from './components/features/task-widget/task-widget';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarMenu, WeatherWidget, FinanceWidget, TaskWidget],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
