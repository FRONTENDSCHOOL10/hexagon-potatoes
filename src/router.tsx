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
import PopularPost from '@/pages/Community/PopularPost';
import UserTip from '@/pages/Community/UserTip';
import PartyListPage from './pages/PartyList';
import JoinPartyPage from './pages/JoinParty';
import OrderDetailPage from './pages/OrderDetail';

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
const isTutorialCompleted = () =>
  sessionStorage.getItem('tutorialCompleted') === 'true';

// 로딩 중 표시할 컴포넌트
const Loading = () => <div>로딩 중...</div>;

// 공통 로딩 컴포넌트
const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Suspense fallback={<Loading />}>{children}</Suspense>;

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
        element: (
          <SuspenseWrapper>
            <Login />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'signup',
        element: (
          <SuspenseWrapper>
            <SignUp />
          </SuspenseWrapper>
        ),
      },
    ],
  },
  {
    path: '/home',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <SuspenseWrapper>
            <HomePage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'notifications',
        element: (
          <SuspenseWrapper>
            <Notifications />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'chatHome',
        element: (
          <SuspenseWrapper>
            <ChatHome />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'writepost',
        element: (
          <SuspenseWrapper>
            <WritePost />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'community',
        element: (
          <SuspenseWrapper>
            <Community />
          </SuspenseWrapper>
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
          <SuspenseWrapper>
            <TipDetail />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'community/boast/:boastId',
        element: (
          <SuspenseWrapper>
            <BoastDetail />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'mypage',
        element: (
          <SuspenseWrapper>
            <MyPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'setting',
        element: (
          <SuspenseWrapper>
            <Setting />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'partyCollect',
        element: (
          <SuspenseWrapper>
            <PartyCollect />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'joinParty',
        element: (
          <SuspenseWrapper>
            <JoinPartyPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'partyList',
        element: (
          <SuspenseWrapper>
            <PartyListPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'orderDetail',
        element: (
          <SuspenseWrapper>
            <OrderDetailPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'party/:partyId',
        element: (
          <SuspenseWrapper>
            <PartyDetail />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'search',
        element: (
          <SuspenseWrapper>
            <SearchPage />
          </SuspenseWrapper>
        ),
      },
      {
        path: 'search/:keyword',
        element: (
          <SuspenseWrapper>
            <SearchResultPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
