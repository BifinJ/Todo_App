export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthContextType {
  user: User | null;
  setUser(user: User): void;
}
export interface Todo {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  priority: "low" | "medium" | "high";
  completed: boolean;
}
