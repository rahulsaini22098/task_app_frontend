export interface TaskType {
  id: string;
  taskname: string;
  taskDescription: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InitialState {
  tasks: TaskType[];
  taskListLoader: boolean;
  selectedTask: TaskType | null;
}

export interface CreateTodoProps {
  selectedTask: TaskType | null;
  onTaskCreate: (value: FormValues, cb: () => void) => void;
  onTaskUpdate: (id: string, values: FormValues, cb?: () => void) => void;
}

export interface FormValues {
  taskname?: string;
  taskDescription?: string;
  isDone?: boolean
}

export interface TodoListInterface {
  tasks: TaskType[];
  onTaskDelete: (id: string) => void;
  onEditTask: (id: string) => void;
  onTaskUpdate: (id: string, values: FormValues) => void;
}
