import { useMemo } from 'react';

interface HeaderConfig {
  type: 'back' | 'bell' | 'setting';
  title: string;
}

const defaultConfig: HeaderConfig = {
  type: 'back',
  title: '기본 제목',
};

const headerConfigs: Record<string, HeaderConfig> = {
  '/login': { type: 'back', title: '로그인' },
  '/login/signup': { type: 'back', title: '회원가입' },
  '/home': { type: 'bell', title: '홈' },
  '/home/search': { type: 'back', title: '검색' },
  '/home/partyCollect': { type: 'back', title: '파티 모집' },
  '/home/notifications': { type: 'back', title: '알림' },
  '/home/chatHome': { type: 'bell', title: '채팅' },
  '/home/writepost': { type: 'back', title: '포스트 작성' },
  '/home/community': { type: 'bell', title: '커뮤니티' },
  '/home/mypage': { type: 'setting', title: '마이 페이지' },
  '/home/setting': { type: 'back', title: '설정' },
};

// 동적 경로 뒤에 :붙는 애들
// 검색 결과 / 파티 상세 / 주문 상세 / 팁 / 자랑
const dynamicPathPatterns = [
  { pattern: '/home/search/', type: 'back' },
  { pattern: '/home/party/', type: 'back' },
  { pattern: '/home/orderDetail/', type: 'back' },
  { pattern: '/community/tip/', type: 'back' },
  { pattern: '/community/boast/', type: 'back' },
];

export const useHeaderConfig = (pathname: string) => {
  return useMemo(() => {
    let headerProps = headerConfigs[pathname] || defaultConfig;

    // 동적 경로 패턴 처리
    dynamicPathPatterns.forEach(({ pattern, type }) => {
      if (pathname.startsWith(pattern)) {
        const keyword = decodeURIComponent(pathname.substring(pattern.length)); // 동적 부분 추출
        headerProps = {
          type: 'back',
          title: keyword || '기본 제목',
        };
      }
    });

    // 네비게이션 바 표시 여부
    const showNavigationBar = pathname.startsWith('/home');
    return { headerProps, showNavigationBar };
  }, [pathname]);
};
