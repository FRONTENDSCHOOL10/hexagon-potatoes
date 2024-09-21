import { memo } from 'react';
import CommunityNavList from './CommunityNavList';

const CommunityNav = () => {
  return (
    <nav>
      <ul className="flex h-[2.44rem] w-[22.5rem] flex-[1_0_0] items-center gap-2.5 px-3 py-2.5">
        <CommunityNavList path={'/home/community'}>홈</CommunityNavList>
        <CommunityNavList path={'/home/community/recommendFeed'}>
          추천 피드
        </CommunityNavList>
        <CommunityNavList path={'/home/community/following'}>
          팔로잉
        </CommunityNavList>
        <CommunityNavList path={'/home/community/userTip'}>
          유저 팁
        </CommunityNavList>
        <CommunityNavList path={'/home/community/popularPost'}>
          인기 포스트
        </CommunityNavList>
        <CommunityNavList path={'/home/community/magazine'}>
          매거진
        </CommunityNavList>
      </ul>
    </nav>
  );
};

export default memo(CommunityNav);
