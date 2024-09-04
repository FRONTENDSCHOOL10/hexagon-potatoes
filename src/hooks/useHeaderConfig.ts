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
  '/signup': { type: 'back', title: '회원가입' },
  '/partyCollect': { type: 'back', title: '파티 모집' },
  '/home': { type: 'bell', title: '홈' },
  '/home/chatHome': { type: 'bell', title: '채팅' },
  '/home/community': { type: 'bell', title: '커뮤니티' },
  '/home/mypage': { type: 'setting', title: '마이 페이지' },
};

export const useHeaderConfig = (pathname: string) => {
  return useMemo(() => {
    const headerProps = headerConfigs[pathname] || defaultConfig;
    const showNavigationBar = pathname.startsWith('/home');
    return { headerProps, showNavigationBar };
  }, [pathname]);
};
