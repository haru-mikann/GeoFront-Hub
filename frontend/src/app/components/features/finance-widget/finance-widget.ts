import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { ApiService, TickerData } from '../../../services/api.service';
import { UiCard } from '../../ui/ui-card/ui-card';

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

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getFinance().subscribe({
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
