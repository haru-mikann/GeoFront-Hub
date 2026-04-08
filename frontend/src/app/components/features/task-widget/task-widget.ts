import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService, Task } from '../../../services/api.service';
import { UiCard } from '../../ui/ui-card/ui-card';
import { UiButton } from '../../ui/ui-button/ui-button';

@Component({
  selector: 'app-task-widget',
  imports: [UiCard, UiButton, FormsModule],
  templateUrl: './task-widget.html',
  styleUrl: './task-widget.scss',
})
export class TaskWidget implements OnInit {
  tasks: Task[] = [];
  newTaskTitle = '';
  loading = true;
  error = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.api.getTasks().subscribe({
      next: (res) => {
        this.tasks = res;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      },
    });
  }

  addTask() {
    const title = this.newTaskTitle.trim();
    if (!title) return;
    this.api.addTask(title).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.newTaskTitle = '';
      },
    });
  }

  toggleTask(task: Task) {
    this.api.updateTask(task.id, { done: !task.done }).subscribe({
      next: (updated) => {
        const idx = this.tasks.findIndex((t) => t.id === updated.id);
        if (idx !== -1) this.tasks[idx] = updated;
      },
    });
  }

  deleteTask(task: Task) {
    this.api.deleteTask(task.id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
    });
  }
}
