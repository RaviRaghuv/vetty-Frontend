import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task, TaskStatus } from '../../models/task.model';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent {
  @Input() selectedColumn: TaskStatus = TaskStatus.TODO;
  @Output() close = new EventEmitter<void>();
  @Output() taskAdded = new EventEmitter<Task>();

  taskTitle: string = '';
  taskId: string = '';
  taskDescription: string = '';

  onSubmit(): void {
    if (!this.taskTitle.trim() || !this.taskId.trim()) {
      return;
    }

    const newTask: Task = {
      id: this.taskId.trim(),
      title: this.taskTitle.trim(),
      description: this.taskDescription.trim(),
      status: this.selectedColumn
    };

    this.taskAdded.emit(newTask);
    this.resetForm();
  }

  onCancel(): void {
    this.resetForm();
    this.close.emit();
  }

  private resetForm(): void {
    this.taskTitle = '';
    this.taskId = '';
    this.taskDescription = '';
  }

  onBackdropClick(event: MouseEvent): void {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.onCancel();
    }
  }
}

