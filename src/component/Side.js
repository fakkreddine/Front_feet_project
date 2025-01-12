import React, { useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';

function Side({onClose,open}) {
   // State to control visibility

  

  if (!open) return null; // Return null if the panel is closed

  return (
    <div className=" flex flex-col gap-6 w-full p-6 bg-[#3232335f] rounded-lg shadow-lg">
      {/* Close Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-white text-xl font-semibold">Add Slots</h3>
        <button className="text-white" onClick={onClose}>
          <CloseOutlined className="text-2xl" />
        </button>
      </div>
      
      <div className="mt-4 text-white text-sm">
        <p>Select a slot to add to the program. You can add a "Slot," "Break," or mark "No Session." Click on the respective card to choose.</p>
      </div>

      {/* Slot Section */}
      <div data-swapy-slot="Slot_slot">
        <div data-swapy-item="Slot">
          <div className="w-full flex flex-col items-center justify-center h-24 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-200 ease-in-out bg-white">
            <i className="fas fa-calendar-check text-gray-600 text-2xl"></i>
            <span className="mt-2 text-sm text-gray-600">Slot</span>
          </div>
        </div>
      </div>

      {/* Break Section */}
      <div data-swapy-slot="slot_break">
        <div data-swapy-item="Break">
          <div className="w-full flex flex-col items-center justify-center h-24 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-200 ease-in-out bg-white">
            <i className="fas fa-coffee text-gray-600 text-2xl"></i>
            <span className="mt-2 text-sm text-gray-600">Break</span>
          </div>
        </div>
      </div>

      {/* Empty Slot Section */}
      <div data-swapy-slot="Slot_empty">
        <div data-swapy-item="Empty">
          <div className="w-full flex flex-col items-center justify-center h-24 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition duration-200 ease-in-out bg-white">
            <i className="fas fa-ban text-gray-600 text-2xl"></i>
            <span className="mt-2 text-sm text-gray-600">No Session</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Side;
