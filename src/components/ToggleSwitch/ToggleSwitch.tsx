import React, { useState } from 'react';

const ToggleSwitch = () => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <div
      onClick={handleToggle}
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
        isToggled ? 'bg-mainblue' : 'bg-gray-300'
      }`}
    >
      <div
        className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
          isToggled ? 'translate-x-6' : ''
        }`}
      ></div>
    </div>
  );
};

export default ToggleSwitch;
