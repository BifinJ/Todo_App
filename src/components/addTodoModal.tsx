import { useAuth } from '@/app/Context/AuthContext';
import { SpinnerIcon } from '@/app/icons/icons';
import axios from 'axios';
import React, { useState } from 'react';

interface AddTodoModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getTodos: () => void; // Add getTodos as a prop
}

interface Form {
  title: string;
  description: string;
  dueDate: string; // Storing date as a string for easier handling with input
  priority: string;
}

export default function AddTodoModal({ setModalOpen, getTodos }: AddTodoModalProps) {
  
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<Form>({
    title: '',
    description: '',
    dueDate: new Date().toISOString().split('T')[0], // Default to today's date
    priority: 'low',
  });

  // Function to handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async(e: React.FormEvent) => {
    setIsLoading(true)
    e.preventDefault();
    try {
        const newTodo = await axios.post('/api/todo/create', {
            id: user?.id, // Get user ID from local storage
            title: formData.title,
            description: formData.description,
            dueDate: formData.dueDate,
            priority: formData.priority,
        })
        console.log('Todo created:', newTodo);
        getTodos();
    } catch (error) {
        if(error instanceof Error) 
            console.error(error.message);
        else
        console.error(error)
}

    // After submission, close the modal
    setModalOpen(false);
    setIsLoading(false)
};

return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md text-black">
        <h2 className="text-2xl font-bold mb-4">Add New Todo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleInputChange}
              required
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
            {isLoading ? 
                (<span className="flex items-center text-white">
                  <SpinnerIcon />
                  Processing...
                </span>): 
                <span className="flex items-center text-white">
                  Create Todo
                </span>
            }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
