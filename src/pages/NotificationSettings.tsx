import React from 'react';
import ToggleSwitch from '@/components/ToggleSwitch/ToggleSwitch';

const NotificationSettings = () => {
  return (
    <div className="px-1 pt-1 space-y-4 max-w-md mx-auto">
      <div className="border-b border-gray-200 pb-4">
        <h2 className="text-[1rem] font-bold mb-2">알림 설정</h2>
        <ul className="space-y-2 text-[0.875rem]">
          <li className="flex items-center justify-between">
            <span>알림 수신 설정</span>
            <ToggleSwitch />
          </li>
          <li>
            <a href="#" className="hover:text-mainblue cursor-pointer">방해금지 시간 설정</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NotificationSettings;
