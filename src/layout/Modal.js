import React from 'react';

const Modal = ({ message, onClose }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white rounded-lg p-6 w-1/3">
                <h2 className="text-xl font-bold text-center mb-4">Account Status</h2>
                <p className="text-center mb-4">{message}</p>
                <div className="flex justify-center">
                    <button
                        onClick={onClose}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
