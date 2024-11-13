"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { Todo } from '../types';
import axios from 'axios';
import { SpinnerIcon } from '../icons/icons';
import Header from './Header';
import Filters from './Filters';
import TodoList from './TodoList';
import ConfirmationModal from './ConfirmationModal';
import AddTodoButton from './addTodoButton';

const TodoPage = () => {
  const { user } = useAuth();

  // Sample initial todos
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false)

  // State for filter and sort
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'overdue'>('all');
  const [sortBy, setSortBy] = useState<'priority' | 'dueDate'>('dueDate');

  // State for confirmation modals
  const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(null);
  const [completeConfirmation, setCompleteConfirmation] = useState<number | null>(null);
  const [addTodoModalOpen, setAddTodoModalOpen] = useState(false);

  // Filtered and sorted todos
  const filteredAndSortedTodos = useMemo(() => {
  const now = new Date();
  return todos
    .filter(todo => {
      switch (filter) {
        case 'pending':
          return !todo.completed && new Date(todo.dueDate) >= now;
        case 'completed':
          return todo.completed;
        case 'overdue':
          return !todo.completed && new Date(todo.dueDate) < now;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      if (sortBy === 'priority') {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      }
      // Convert dueDate to Date object for accurate comparison
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
}, [todos, filter, sortBy]);



  // Handlers
  const handleDeleteTodo = async(id: number) => {
    try {
      const deletedTodo = await axios.delete(`/api/todo/deleteTodo`, {
        data: { todoId: id }
      });
      console.log("Deleted todo", deletedTodo);
    } catch (error) {
      console.error('Error deleting todo:', error);
      // Optionally: Revert state if delete fails
      setTodos(todos); // Revert to the previous todos state
    }
    setTodos(todos.filter(todo => todo.id !== id));
    setDeleteConfirmation(null);
  };

  const handleCompleteTodo = async(id: number) => {
    console.log("in handle complete todo", id);
    try {
      const completedTodo = await axios.put('/api/todo/updateComplete', {
        todoId: id 
      });
      console.log("Completed todo", completedTodo);
    } catch (error) {
      console.error('Error Completed todo:', error);
      // Optionally: Revert state if delete fails
      setTodos(todos); // Revert to the previous todos state
    }
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: true } : todo
    ));
    setCompleteConfirmation(null);
  };

  const getTodos = async (id: number | undefined) => {
    setLoading(true);
    try {
      const response = await axios.put('/api/todo/getTodo', {
        userId: id
      });
      console.log("getTodos response", response.data.todos);
      setTodos(response.data.todos || []);
    } catch (error) {
      console.error("An error occurred while fetching todos:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user?.id) {
      getTodos(user.id);
    }
  }, [user]);

  if (!user) 
    return (
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 to-indigo-300 p-8 flex flex-col items-center justify-center text-center">
        <div className="bg-white shadow-lg rounded-lg p-10 max-w-md mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-800 mb-4">Access Restricted</h1>
          <p className="text-gray-600 mb-6">
            Please sign in to continue to this page and unlock all features.
          </p>
          <a 
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition duration-300 ease-in-out shadow-lg"
          >
            Sign In
          </a>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen w-dvw bg-gray-100 p-6 relative">
      <Header name={user?.name} />  
      <Filters filter={filter} setFilter={setFilter} sortBy={sortBy} setSortBy={setSortBy} />
      {loading ? 
        <div className=' w-full h-full flex items-center justify-center !text-blue-600'>
          <SpinnerIcon /> Loading...
        </div> : 
        <TodoList 
          todos={filteredAndSortedTodos} 
          setDeleteConfirmation={setDeleteConfirmation} 
          setCompleteConfirmation={setCompleteConfirmation} 
        />
      }
      {deleteConfirmation && (
        <ConfirmationModal 
          title="Confirm Deletion" 
          message="Are you sure you want to delete this todo?" 
          onConfirm={() => handleDeleteTodo(deleteConfirmation)} 
          onCancel={() => setDeleteConfirmation(null)} 
          confirmLabel="Delete" 
          confirmColor="bg-red-500" 
        />
      )}
      {completeConfirmation && (
        <ConfirmationModal 
          title="Mark as Complete" 
          message="Are you sure you want to mark this todo as complete?" 
          onConfirm={() => handleCompleteTodo(completeConfirmation)} 
          onCancel={() => setCompleteConfirmation(null)} 
          confirmLabel="Complete" 
          confirmColor="bg-green-500" 
        />
      )}
    <AddTodoButton 
      modalopen={addTodoModalOpen} 
      setModalOpen={setAddTodoModalOpen} 
      getTodos={() => getTodos(user?.id)} // Pass getTodos function here
    />
    </div>
  );
};

export default TodoPage;
