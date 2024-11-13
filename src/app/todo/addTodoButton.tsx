import React from 'react';
import AddTodoModal from './addTodoModal';

interface AddTodo {
  modalopen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  getTodos: () => void; // Add getTodos as a prop
}

export default function AddTodoButton({ modalopen, setModalOpen, getTodos }: AddTodo) {
  return (
    <>
      {modalopen && <AddTodoModal setModalOpen={setModalOpen} getTodos={getTodos} />}
      <button
        onClick={() => setModalOpen(!modalopen)}
        className="absolute right-6 bottom-6 w-14 h-14 rounded-full bg-blue-500 text-white flex items-center justify-center text-3xl font-bold"
      >
        +
      </button>
    </>
  );
}
