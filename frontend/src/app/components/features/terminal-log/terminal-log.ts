import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { UiCard } from '../../ui/ui-card/ui-card';

interface LogEntry {
  timestamp: Date;
  level: 'INFO' | 'WARN' | 'ERROR' | 'OK';
  message: string;
}

@Component({
  selector: 'app-terminal-log',
  imports: [UiCard, DatePipe],
  templateUrl: './terminal-log.html',
  styleUrl: './terminal-log.scss',
})
export class TerminalLog implements OnInit {
  logs: LogEntry[] = [];

  ngOnInit() {
    this.addLog('OK', 'MAGI SYSTEM INITIALIZED');
    this.addLog('INFO', 'GEOFRONT HUB v0.1.0 ONLINE');
    this.addLog('INFO', 'LOADING WEATHER SUBSYSTEM...');
    this.addLog('INFO', 'LOADING FINANCE SUBSYSTEM...');
    this.addLog('INFO', 'LOADING TASK MANAGEMENT SUBSYSTEM...');
    this.addLog('OK', 'ALL SYSTEMS NOMINAL — AWAITING INPUT');
  }

  addLog(level: LogEntry['level'], message: string) {
    this.logs.unshift({ timestamp: new Date(), level, message });
    if (this.logs.length > 50) this.logs.pop();
  }
}
