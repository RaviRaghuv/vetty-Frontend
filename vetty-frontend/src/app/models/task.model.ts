export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  NEED_REVIEW = 'need-review',
  COMPLETED = 'completed'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

