const MypageNoticeList = ({}) => {
    return (
      <div className="p-4 space-y-8 w-[22.5rem]">
        <div>
          <h2 className="text-[1rem] font-bold mb-2">양떼들의 소식</h2>
          <ul className="space-y-2 text-[0.875rem]">
            <li>
              <a href="#" className="hover:text-mainblue cursor-pointer">이벤트</a>
            </li>
            <li>
              <a href="#" className="hover:text-mainblue cursor-pointer">공지사항</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-[1rem] font-bold mb-2">나의 파티</h2>
          <ul className="space-y-2 text-[0.875rem]">
            <li>
              <a href="#" className="hover:text-mainblue cursor-pointer">개설 파티 목록</a>
            </li>
            <li>
              <a href="#" className="hover:text-mainblue cursor-pointer">개설 파티 후기</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-[1rem] font-bold mb-2">기타</h2>
          <ul className="space-y-2 text-[0.875rem]">
            <li>
              <a href="#" className="hover:text-mainblue cursor-pointer">내 계좌 관리</a>
            </li>
            <li>
              <a href="#" className="hover:text-mainblue cursor-pointer">키워드 알림 설정</a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-[1rem] font-bold mb-2">버전</h2>
          <ul className="space-y-2 text-[0.875rem]">
            <li>
              <a href="#" className="hover:text-mainblue cursor-pointer">자주 묻는 질문</a>
            </li>
            <li>
              <a href="#" className="hover:text-mainblue cursor-pointer">약관 및 정책</a>
            </li>
          </ul>
        </div>
      </div>
    );
  };
  
  export default MypageNoticeList;
  