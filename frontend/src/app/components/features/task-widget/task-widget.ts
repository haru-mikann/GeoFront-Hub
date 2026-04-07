import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { UiCard } from '../../ui/ui-card/ui-card';
import { UiButton } from '../../ui/ui-button/ui-button';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

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

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.http.get<Task[]>('/api/tasks').subscribe({
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
    this.http.post<Task>('/api/tasks', { title }).subscribe({
      next: (task) => {
        this.tasks.push(task);
        this.newTaskTitle = '';
      },
    });
  }

  toggleTask(task: Task) {
    this.http.put<Task>(`/api/tasks/${task.id}`, { done: !task.done }).subscribe({
      next: (updated) => {
        const idx = this.tasks.findIndex((t) => t.id === updated.id);
        if (idx !== -1) this.tasks[idx] = updated;
      },
    });
  }

  deleteTask(task: Task) {
    this.http.delete(`/api/tasks/${task.id}`).subscribe({
      next: () => {
        this.tasks = this.tasks.filter((t) => t.id !== task.id);
      },
    });
  }
}
