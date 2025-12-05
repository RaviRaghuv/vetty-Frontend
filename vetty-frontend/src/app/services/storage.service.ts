import { Injectable } from '@angular/core';
import { Task, TaskStatus } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private readonly STORAGE_KEY = 'vetty_tasks';

  getTasks(): Task[] {
    const tasksJson = localStorage.getItem(this.STORAGE_KEY);
    if (tasksJson) {
      return JSON.parse(tasksJson);
    }
    return this.getDefaultTasks();
  }

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tasks));
  }

  private getDefaultTasks(): Task[] {
    return [
      { id: 'DW-345', title: 'Layout usability test', description: '', status: TaskStatus.TODO },
      { id: 'CW-300', title: 'GANTT UI explanation', description: '', status: TaskStatus.TODO },
      { id: 'CW-405', title: 'Fields spec - Priority', description: '', status: TaskStatus.TODO },
      { id: 'DW-345', title: 'Workflow spec - editing transition', description: '', status: TaskStatus.IN_PROGRESS },
      { id: 'CW-345', title: 'Fields spec - Show more custom fields', description: '', status: TaskStatus.IN_PROGRESS },
      { id: 'DW-200', title: 'Rule 3: Update an assignee', description: '', status: TaskStatus.IN_PROGRESS },
      { id: 'DW-310', title: 'Terminology testing - issues', description: '', status: TaskStatus.NEED_REVIEW },
      { id: 'DW-300', title: 'Project settings - navigation test', description: '', status: TaskStatus.NEED_REVIEW },
      { id: 'DW-105', title: 'Terminology testing - issues new', description: '', status: TaskStatus.COMPLETED },
      { id: '1204', title: 'Project settings - navigation test new', description: '', status: TaskStatus.COMPLETED }
    ];
  }
}

