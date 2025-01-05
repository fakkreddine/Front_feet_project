import React from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Tag } from 'antd';

function Notecard({ data, onClick, onDelete }) {
  // Determine the text color based on the background color
  const textColor = data.color === "#ffffff" ? '#000' : '#fff';
  // Determine the icon color based on the background color
  const iconColor = data.color === "#ffffff" ? '#000' : '#fff';

  // Function to calculate contrasting colors for tags
  const getTagStyles = () => {
    // If the background is dark, make tags lighter and vice versa
    const isDark = parseInt(data.color.slice(1, 3), 16) * 0.3 +
                   parseInt(data.color.slice(3, 5), 16) * 0.59 + 
                   parseInt(data.color.slice(5, 7), 16) * 0.11 < 128;

    return {
      backgroundColor: isDark ? '#ffffff' : '#333333',
      color: isDark ? '#333333' : '#ffffff',
    };
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-2xl shadow-2xl p-8 relative w-[30rem] transition-transform transform hover:scale-105"
      style={{
        backgroundColor: data.color,
        transition: 'background-color 0.3s ease, transform 0.2s ease',
      }}
    >
      {/* Title */}
      <h2 className="text-4xl font-extrabold" style={{ color: textColor }}>
        {data.name}
      </h2>

      {/* Description */}
      <p className="text-lg text-gray-700 mt-4" style={{ color: textColor }}>
        {data.description}
      </p>

      {/* Date */}
      <p className="text-sm text-gray-500 mt-2" style={{ color: textColor }}>
        {data.date}
      </p>

      {/* Tags Section */}
      {data.tags && data.tags.length > 0 && (
        <div className="mt-6">
          <div className="flex flex-wrap gap-3">
            {data.tags.split(',').map((tag, index) => (
              <Tag
                key={index}
                className="text-sm py-2 px-4 rounded-full shadow-md cursor-pointer transition-all duration-300 transform hover:scale-110"
                style={{
                  ...getTagStyles(),
                  fontWeight: 'bold',
                  transition: 'background-color 0.3s, transform 0.2s',
                }}
              >
                {tag.trim()}
              </Tag>
            ))}
          </div>
        </div>
      )}

      {/* Delete Icon */}
      <div className="absolute top-4 right-4">
        <DeleteOutlined
          onClick={(e) => {
            e.stopPropagation(); // Prevent modal from opening when clicking delete
            onDelete(); // Call the onDelete function passed as a prop
          }}
          className="cursor-pointer text-3xl transition-colors hover:text-red-600"
          style={{ color: iconColor }}
        />
      </div>
    </div>
  );
}

export default Notecard;
