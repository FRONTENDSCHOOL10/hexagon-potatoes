import React from 'react';
import { Helmet } from 'react-helmet-async';

const ChatHome = () => {
  return (
    <>
      <Helmet>
        <title>채팅 홈 | Shipmate</title>
        <meta
          name="description"
          content="파티 리더와 실시간으로 소통할 수 있는 채팅 페이지입니다."
        />
        <meta name="keywords" content="채팅, 소통, Shipmate" />
      </Helmet>
      <div>
        <h1>채팅 페이지</h1>
      </div>
    </>
  );
};

export default ChatHome;
