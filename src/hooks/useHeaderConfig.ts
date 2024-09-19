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
  '/home/notifications': { type: 'back', title: '알림' },
  '/home/chatHome': { type: 'bell', title: '채팅' },
  '/home/writepost': { type: 'back', title: '포스트 작성' },
  '/home/partyCollect': { type: 'back', title: '파티 모집' },
  '/home/party/:partyId': { type: 'back', title: '파티 상세' },
  '/home/orderDetail/:id': { type: 'back', title: '주문 상세' },
  '/home/community': { type: 'bell', title: '커뮤니티' },
  '/home/community/recommendFeed': { type: 'bell', title: '추천피드' },
  '/home/community/following': { type: 'bell', title: '팔로잉' },
  '/home/community/userTip': { type: 'bell', title: '유저팁' },
  '/home/community/popularPost': { type: 'bell', title: '인기포스트' },
  '/home/community/magazine': { type: 'bell', title: '매거진' },
  '/home/community/tip/:tipId': { type: 'back', title: '유저팁' },
  '/home/community/boast/:boastId': { type: 'back', title: '자랑글' },
  '/home/community/magazine/:magazineId': { type: 'back', title: '매거진' },
  '/home/mypage': { type: 'setting', title: '마이 페이지' },
  '/home/setting': { type: 'back', title: '설정' },
  '/home/nowwedeveloping': { type: 'back', title: '개발중' },
};

// 동적 경로 패턴 정의
const dynamicPathPatterns = [
  '/home/search/',
  '/home/party/',
  '/home/orderDetail/',
  '/home/community/tip/',
  '/home/community/boast/',
  '/home/community/magazine/',
  '/home/partylist/',
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
          let titleSuffix = '';

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
            // 제목에 추가 텍스트 붙이기
            if (pattern === '/home/search/') {
              titleSuffix = '의 검색 결과';
            } else if (pattern === '/home/partylist/') {
              titleSuffix = '의 파티리스트';
            }

            headerProps = {
              type: 'back',
              title: dynamicPart
                ? decodeURIComponent(dynamicPart) + titleSuffix
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
