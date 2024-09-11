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
  '/home/notifications': { type: 'back', title: '알림' },
  '/home/chatHome': { type: 'bell', title: '채팅' },
  '/home/writepost': { type: 'back', title: '포스트 작성' },
  // '/home/search/:keyword': { type: 'back', title: '검색' },
  '/home/partyCollect': { type: 'back', title: '파티 모집' },
  '/home/party/:partyId': { type: 'back', title: '파티 상세' },
  '/home/orderDetail/:id': { type: 'back', title: '주문 상세' },
  '/home/community': { type: 'bell', title: '커뮤니티' },
  '/community/tip/:tipId': { type: 'back', title: '팁' },
  '/community/boast/:boastId': { type: 'back', title: '자랑글' },
  '/home/mypage': { type: 'setting', title: '마이 페이지' },
  '/home/setting': { type: 'back', title: '설정' },
};

// 동적 경로 패턴 정의
const dynamicPathPatterns = [
  '/home/search/',
  '/home/party/',
  '/home/orderDetail/',
  '/community/tip/',
  '/community/boast/',
];

export const useHeaderConfig = (pathname: string) => {
  return useMemo(() => {
    let headerProps = defaultConfig;

    // 정적 경로에서 헤더 설정 찾기
    if (headerConfigs[pathname]) {
      headerProps = headerConfigs[pathname];
    } else {
      // 동적 경로 패턴 처리
      dynamicPathPatterns.forEach((pattern) => {
        if (pathname.startsWith(pattern)) {
          const dynamicPart = pathname.substring(pattern.length);

          // 패턴에 맞는 동적 설정 찾기
          const dynamicPattern = Object.keys(headerConfigs).find(
            (key) => key.startsWith(pattern) && key.includes(':')
          );

          if (dynamicPattern) {
            headerProps = {
              type: headerConfigs[dynamicPattern].type,
              title: headerConfigs[dynamicPattern].title,
            };
          } else {
            headerProps = {
              type: 'back',
              title: dynamicPart
                ? decodeURIComponent(dynamicPart) + '의 검색 결과'
                : defaultConfig.title,
            };
          }
        }
      });
    }

    // 네비게이션 바 표시 여부 결정
    const showNavigationBar = pathname.startsWith('/home');
    return { headerProps, showNavigationBar };
  }, [pathname]);
};
