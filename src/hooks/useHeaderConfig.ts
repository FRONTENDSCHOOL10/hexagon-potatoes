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
  '/home/partyCollect': { type: 'back', title: '파티 모집' },
  '/home/notifications': { type: 'back', title: '알림' },
  '/home/chatHome': { type: 'bell', title: '채팅' },
  '/home/writepost': { type: 'back', title: '포스트 작성' },
  '/home/community': { type: 'bell', title: '커뮤니티' },
  '/home/mypage': { type: 'setting', title: '마이 페이지' },
  '/home/setting': { type: 'back', title: '설정' },
};

export const useHeaderConfig = (pathname: string) => {
  return useMemo(() => {
    const headerProps = headerConfigs[pathname] || defaultConfig;
    const showNavigationBar = pathname.startsWith('/home');
    return { headerProps, showNavigationBar };
  }, [pathname]);
};
