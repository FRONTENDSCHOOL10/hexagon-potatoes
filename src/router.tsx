import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import RootLayout from '@/layout/RootLayout';
import Tutorial from '@/pages/Tutorial';
import Landing from '@/pages/Landing';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import CommunityHome from '@/pages/Community/CommunityHome';
import RecommendFeed from '@/pages/Community/RecommendFeed';
import Magazine from '@/pages/Community/Magazine';
import Following from '@/pages/Community/Following';
import UserTip from '@/pages/Community/UserTip';
import PopularPost from '@/pages/Community/PopularPost';

// 동적 로딩할 컴포넌트 설정
const PartyCollect = lazy(() => import('@/pages/PartyCollect'));
const PartyDetail = lazy(() => import('@/pages/PartyDetail'));
const ChatHome = lazy(() => import('@/pages/ChatHome'));
const Community = lazy(() => import('@/pages/Community/Community'));
const TipDetail = lazy(() => import('@/pages/TipDetail'));
const BoastDetail = lazy(() => import('@/pages/BoastDetail'));
const MyPage = lazy(() => import('@/pages/MyPage'));
const SearchPage = lazy(() => import('@/pages/Search'));
const SearchResultPage = lazy(() => import('@/pages/SearchResult'));
const HomePage = lazy(() => import('@/pages/HomePage'));
const Setting = lazy(() => import('@/pages/Setting'));
const Notifications = lazy(() => import('@/pages/Notifications'));
const WritePost = lazy(() => import('@/pages/WritePost'));

// 튜토리얼 완료 상태 확인
const isTutorialCompleted = () => {
  return localStorage.getItem('tutorialCompleted') === 'true';
};

// 튜토리얼 완료 여부에 따른 라우트 보호
const requireTutorial = (element: JSX.Element) => {
  return isTutorialCompleted() ? element : <Navigate to="/tutorial" />;
};

// 로딩 중 표시할 컴포넌트
const Loading = () => <div>로딩 중...</div>;

const routes = [
  {
    path: '/tutorial',
    element: <Tutorial />,
  },
  {
    path: '/',
    element: isTutorialCompleted() ? <Landing /> : <Navigate to="/tutorial" />,
  },
  {
    path: '/login',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: requireTutorial(<Login />),
      },
      {
        path: 'signup',
        element: requireTutorial(<SignUp />),
      },
    ],
  },
  {
    path: '/home',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: requireTutorial(
          <Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: 'notifications',
        element: (
          <Suspense fallback={<Loading />}>
            <Notifications />
          </Suspense>
        ),
      },
      {
        path: 'chatHome',
        element: (
          <Suspense fallback={<Loading />}>
            <ChatHome />
          </Suspense>
        ),
      },
      {
        path: 'writepost',
        element: (
          <Suspense fallback={<Loading />}>
            <WritePost />
          </Suspense>
        ),
      },
      {
        path: 'community',
        element: (
          <Suspense fallback={<Loading />}>
            <Community />
          </Suspense>
        ),
        children: [
          {
            index: true,
            element: <CommunityHome />,
          },
          {
            path: 'recommendFeed',
            element: <RecommendFeed />,
          },
          {
            path: 'following',
            element: <Following />,
          },
          {
            path: 'userTip',
            element: <UserTip />,
          },
          {
            path: 'popularPost',
            element: <PopularPost />,
          },
          {
            path: 'magazine',
            element: <Magazine />,
          },
        ],
      },
      {
        path: 'community/tip/:tipId',
        element: (
          <Suspense fallback={<Loading />}>
            <TipDetail />
          </Suspense>
        ),
      },
      {
        path: 'community/boast/:boastId',
        element: (
          <Suspense fallback={<Loading />}>
            <BoastDetail />
          </Suspense>
        ),
      },
      {
        path: 'mypage',
        element: (
          <Suspense fallback={<Loading />}>
            <MyPage />
          </Suspense>
        ),
      },
      {
        path: 'setting',
        element: (
          <Suspense fallback={<Loading />}>
            <Setting />
          </Suspense>
        ),
      },
      {
        path: 'partyCollect',
        element: (
          <Suspense fallback={<Loading />}>
            <PartyCollect />
          </Suspense>
        ),
      },
      {
        path: 'party/:partyId',
        element: (
          <Suspense fallback={<Loading />}>
            <PartyDetail />
          </Suspense>
        ),
      },
      {
        path: 'search',
        element: (
          <Suspense fallback={<Loading />}>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: 'search/:keyword',
        element: (
          <Suspense fallback={<Loading />}>
            <SearchResultPage />
          </Suspense>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
