import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tutorial = () => {
  const navigate = useNavigate();

  const hadnleCompleteTutorial = () => {
    // 튜토리얼 완료 상태를 로컬 스토리지에 저장
    localStorage.setItem('tutorialCompleted', 'true');
    // 랜딩 페이지로 리디렉션
    navigate('/');
  };

  return (
    <div>
      <h1>Tutorial Page</h1>
      {/* 튜토리얼 내용 */}
      <button type="button" onClick={hadnleCompleteTutorial}>
        건너뛰기
      </button>
    </div>
  );
};

export default Tutorial;
