import React, { useState } from 'react';
import MiniButton from '@/components/Buttons/MiniButton';
import PartyResult from '@/components/PartyResult/PartyResult';
import NameCard from '@/components/NameCard/NameCard';
import MypageNoticeList from '@/components/MypageNoticeList/MypageNoticeList';
import SavingMoneyCard from '@/components/SavingMoneyCard/SavingMoneyCard';

const MyPage = () => {
  const [activeButton, setActiveButton] = useState('파티장');

  const noticeListData = {
    파티장: [
      { title: '양떼들의 소식', items: ['이벤트', '공지사항'] },
      { title: '나의 파티', items: ['개설 파티 목록', '개설 파티 후기'] },
      { title: '기타', items: ['내 계좌 관리', '키워드 알림 설정'] },
      { title: '버전', items: ['자주 묻는 질문', '약관 및 정책'] },
    ],
    파티원: [
      { title: '양떼들의 소식', items: ['이벤트', '공지사항'] },
      { title: '참여한 파티', items: ['참여 파티 목록'] },
      { title: '기타', items: ['내 계좌 관리', '알림 설정'] },
      { title: '지원', items: ['자주 묻는 질문', '약관 및 정책'] },
    ],
  };

  const handleButtonClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="my-[1.5rem]">
        <NameCard
          name="닉네임"
          subtext="user@example.com"
          type="editProfile"
        />
      </div>
      
      <SavingMoneyCard nickname={'닉네임'} />
      
      <div className="flex gap-4 mt-4">
        <MiniButton
          buttonContent="파티장"
          onClick={() => handleButtonClick('파티장')}
        />
        <MiniButton
          buttonContent="파티원"
          onClick={() => handleButtonClick('파티원')}
        />
      </div>

      <div className="mt-6">
        {activeButton === '파티장' && (
          <div>
            <PartyResult />
            {noticeListData['파티장'].map((section, index) => (
              <MypageNoticeList key={index} title={section.title} items={section.items} />
            ))}
          </div>
        )}

        {activeButton === '파티원' && (
          <div>
            {noticeListData['파티원'].map((section, index) => (
              <MypageNoticeList key={index} title={section.title} items={section.items} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
