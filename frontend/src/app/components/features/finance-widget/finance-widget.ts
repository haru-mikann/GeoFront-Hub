import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DecimalPipe } from '@angular/common';
import { UiCard } from '../../ui/ui-card/ui-card';

interface TickerData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  change_pct: number;
  currency: string;
}

interface FinanceData {
  [key: string]: TickerData;
}

@Component({
  selector: 'app-finance-widget',
  imports: [UiCard, DecimalPipe],
  templateUrl: './finance-widget.html',
  styleUrl: './finance-widget.scss',
})
export class FinanceWidget implements OnInit {
  tickers: TickerData[] = [];
  error = false;
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<FinanceData>('/api/finance').subscribe({
      next: (res) => {
        this.tickers = Object.values(res);
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }
}
