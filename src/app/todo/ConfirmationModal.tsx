import React from 'react';

interface ConfirmationModalProps {
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLabel: string;
  confirmColor: string;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title, message, onConfirm, onCancel, confirmLabel, confirmColor
}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className="bg-white p-6 rounded-lg text-black">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="mb-6">{message}</p>
      <div className="flex justify-end space-x-2">
        <button onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded-md">Cancel</button>
        <button onClick={onConfirm} className={`px-4 py-2 text-white rounded-md ${confirmColor}`}>{confirmLabel}</button>
      </div>
    </div>
  </div>
);

export default ConfirmationModal;
