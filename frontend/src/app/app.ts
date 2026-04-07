import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherWidget } from './components/features/weather-widget/weather-widget';
import { FinanceWidget } from './components/features/finance-widget/finance-widget';
import { TaskWidget } from './components/features/task-widget/task-widget';
import { TerminalLog } from './components/features/terminal-log/terminal-log';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WeatherWidget, FinanceWidget, TaskWidget, TerminalLog],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
