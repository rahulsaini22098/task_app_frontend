export interface TaskType {
  id: string;
  taskname: string;
  taskDescription: string;
  isDone: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InitialState {
  tasks: TaskType[];
  taskListLoader: Boolean;
  selectedTask: TaskType | null;
}

export interface CreateTodoProps {
  selectedTask: TaskType | null;
  onTaskCreate: (value: FormValues, cb: Function) => void;
  onTaskUpdate: (id: string, values: FormValues, cb: Function) => void;
}

export interface FormValues {
  taskname?: string;
  taskDescription?: string;
}

export interface TodoListInterface {
  tasks: TaskType[];
  onTaskDelete: (id: string) => void;
  onEditTask: (id: string) => void
}
