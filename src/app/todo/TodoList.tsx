import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '@/app/types';

interface TodoListProps {
  todos: Todo[];
  setDeleteConfirmation: (id: number | null) => void;
  setCompleteConfirmation: (id: number | null) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, setDeleteConfirmation, setCompleteConfirmation }) => (
  <div className="space-y-4">
    {todos.length === 0 ? (
      <div className="text-center text-gray-500 py-8">No todos found. Start adding some tasks!</div>
    ) : (
      todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          setDeleteConfirmation={setDeleteConfirmation} 
          setCompleteConfirmation={setCompleteConfirmation} 
        />
      ))
    )}
  </div>
);

export default TodoList;
