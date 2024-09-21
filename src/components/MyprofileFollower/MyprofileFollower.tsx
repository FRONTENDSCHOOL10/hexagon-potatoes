import React from 'react';

const MyprofileFollwer = () => {
  return (
    <div className="flex justify-around items-center bg-white py-4">
      <div className="flex flex-col items-center">
        <span className="">평점</span>
        <div className="flex items-center">
          <span className="">4.0</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <span className="">팔로워</span>
        <span className="">100</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="">팔로잉</span>
        <span className="">120</span>
      </div>
    </div>
  );
};

export default MyprofileFollwer;
