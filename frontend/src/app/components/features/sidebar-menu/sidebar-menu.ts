import { Component } from '@angular/core';

interface NavItem {
  id: string;
  label: string;
  icon: string;
  active: boolean;
  available: boolean;
}

@Component({
  selector: 'app-sidebar-menu',
  imports: [],
  templateUrl: './sidebar-menu.html',
  styleUrl: './sidebar-menu.scss',
})
export class SidebarMenu {
  readonly navItems: NavItem[] = [
    { id: 'dashboard',  label: 'DASHBOARD',        icon: '◈', active: true,  available: true  },
    { id: 'network',    label: 'NETWORK MONITOR',   icon: '◉', active: false, available: false },
    { id: 'syslogs',    label: 'SYSTEM LOGS',       icon: '▤', active: false, available: false },
    { id: 'alerts',     label: 'ALERTS',            icon: '◬', active: false, available: false },
    { id: 'settings',   label: 'SETTINGS',          icon: '◧', active: false, available: false },
  ];
}
