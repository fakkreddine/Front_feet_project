import React from 'react';
import { Tooltip } from 'antd';
import { FaTag } from 'react-icons/fa'; // Tag icon
import { CalendarOutlined } from '@ant-design/icons'; // Date icon
import 'flowbite'; // If needed for additional utilities
import "../css/note.css"; // Ensure your custom styles are in place

function Notecard({ data }) {
  // Determine whether the background is light or dark to adjust text color
  const isDark = (color) => {
    const hexColor = color.startsWith('#') ? color.substring(1) : color;
    const rgb = parseInt(hexColor, 16); // Convert hex to RGB
    const r = (rgb >> 16) & 0xff;
    const g = (rgb >>  8) & 0xff;
    const b = (rgb >>  0) & 0xff;
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b; // Calculate brightness
    return brightness < 128;
  };

  const textColor = isDark(data.color) ? 'text-white' : 'text-gray-900';

  return (
    <div
      className={`w-full max-w-2xl p-6 rounded-2xl shadow-xl transition-all transform hover:scale-105 hover:shadow-2xl ${textColor}`}
      style={{ backgroundColor: data.color }}
    >
      {/* Header with title and date */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">{data.name || "Untitled Note"}</h3>
        <Tooltip title={data.date} placement="topRight">
          <span className="text-sm flex items-center gap-1">
            <CalendarOutlined />
            {data.date}
          </span>
        </Tooltip>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-base">{data.description || "No description available."}</p>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-3 text-sm">
        <FaTag />
        {data.tags || "No Tags"}
      </div>
    </div>
  );
}

export default Notecard;
