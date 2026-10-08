export type Priority = 'low' | 'medium' | 'high';

export type Todo = {
  id: string;
  title: string;
  done: boolean;
  priority: Priority;
  dueDate: string | null; // YYYY-MM-DD
  createdAt: number;
};

export type Filter = 'all' | 'active' | 'completed';
