import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task, TaskStatus } from '../../models/task.model';
import { StorageService } from '../../services/storage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  needReviewTasks: Task[] = [];
  completedTasks: Task[] = [];
  
  showModal: boolean = false;
  selectedColumn: TaskStatus = TaskStatus.TODO;
  
  TaskStatus = TaskStatus;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('BoardComponent initialized');
    this.loadTasks();
  }

  loadTasks(): void {
    try {
      const allTasks = this.storageService.getTasks();
      console.log('Loaded tasks:', allTasks);
      this.todoTasks = allTasks.filter(task => task.status === TaskStatus.TODO);
      this.inProgressTasks = allTasks.filter(task => task.status === TaskStatus.IN_PROGRESS);
      this.needReviewTasks = allTasks.filter(task => task.status === TaskStatus.NEED_REVIEW);
      this.completedTasks = allTasks.filter(task => task.status === TaskStatus.COMPLETED);
      console.log('Tasks loaded successfully:', {
        todo: this.todoTasks.length,
        inProgress: this.inProgressTasks.length,
        needReview: this.needReviewTasks.length,
        completed: this.completedTasks.length
      });
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  }

  saveTasks(): void {
    const allTasks = [
      ...this.todoTasks,
      ...this.inProgressTasks,
      ...this.needReviewTasks,
      ...this.completedTasks
    ];
    this.storageService.saveTasks(allTasks);
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      
      const task = event.container.data[event.currentIndex];
      const newStatus = this.getStatusFromContainerId(event.container.id);
      task.status = newStatus;
    }
    this.saveTasks();
  }

  getStatusFromContainerId(containerId: string): TaskStatus {
    switch (containerId) {
      case 'todo-list': return TaskStatus.TODO;
      case 'in-progress-list': return TaskStatus.IN_PROGRESS;
      case 'need-review-list': return TaskStatus.NEED_REVIEW;
      case 'completed-list': return TaskStatus.COMPLETED;
      default: return TaskStatus.TODO;
    }
  }

  openAddTaskModal(column: TaskStatus): void {
    this.selectedColumn = column;
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
  }

  onTaskAdded(task: Task): void {
    task.status = this.selectedColumn;
    
    switch (this.selectedColumn) {
      case TaskStatus.TODO:
        this.todoTasks.push(task);
        break;
      case TaskStatus.IN_PROGRESS:
        this.inProgressTasks.push(task);
        break;
      case TaskStatus.NEED_REVIEW:
        this.needReviewTasks.push(task);
        break;
      case TaskStatus.COMPLETED:
        this.completedTasks.push(task);
        break;
    }
    
    this.saveTasks();
    this.closeModal();
  }

  logout(): void {
    this.authService.logout();
  }
}

