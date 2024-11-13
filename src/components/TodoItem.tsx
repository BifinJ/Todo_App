import { Todo } from '@/app/types';
import React from 'react';

interface TodoItemProps {
  todo: Todo;
  setDeleteConfirmation: (id: number | null) => void;
  setCompleteConfirmation: (id: number | null) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, setDeleteConfirmation, setCompleteConfirmation }) => {
  const dueDate = new Date(todo.dueDate); // Convert dueDate to a Date object

  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-md flex justify-between items-center ${
        todo.completed ? 'opacity-50' : ''
      } ${dueDate < new Date() && !todo.completed ? 'border-2 border-red-300' : ''}`}
    >
      <div>
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold text-black">{todo.id}    {todo.title}</h3>
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              todo.priority === 'high'
                ? 'bg-red-100 text-red-700'
                : todo.priority === 'medium'
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-green-100 text-green-700'
            }`}
          >
            {todo.priority.toUpperCase()}
          </span>
        </div>
        <p className="text-gray-600 mt-1">{todo.description}</p>
        <p
          className={`text-sm mt-2 ${
            dueDate < new Date() && !todo.completed ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          Due: {dueDate.toLocaleDateString()}
        </p>
      </div>
      <div className="flex space-x-2">
        {!todo.completed && (
          <button
            onClick={() => setCompleteConfirmation(todo.id)}
            className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition"
          >
            Complete
          </button>
        )}
        <button
          onClick={() => setDeleteConfirmation(todo.id)}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
