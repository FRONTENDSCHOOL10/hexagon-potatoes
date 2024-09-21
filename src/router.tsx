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
import PartyListPage from '@/pages/PartyList';
import JoinPartyPage from '@/pages/JoinParty';
import OrderDetailPage from '@/pages/OrderDetail';
import MagazineDetail from './pages/MagazineDetail';

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
const EmptyPage = lazy(() => import('@/pages/EmptyPage'));
const NotificationSettings = lazy(() => import('@/pages/NotificationSettings'));
const DoNotDisturbSettings = lazy(() => import('@/pages/DoNotDisturbSettings'));
const AccountSettings = lazy(() => import('@/pages/AccountSettings'));
const BlockedUsers = lazy(() => import('@/pages/BlockedUsers'));
const OtherSettings = lazy(() => import('@/pages/OtherSettings'));
const Announcements = lazy(() => import('@/pages/Announcements'));
const ChangeCountry = lazy(() => import('@/pages/ChangeCountry'));
const ClearCache = lazy(() => import('@/pages/ClearCache'));
const UpdateVersion = lazy(() => import('@/pages/UpdateVersion'));

// 튜토리얼 완료 상태 확인
const isTutorialCompleted = () => {
  const tutorialCompleted = sessionStorage.getItem('tutorialCompleted');
  const isAlreadyLogin = Boolean(localStorage.getItem('authId'));
  const isPass = tutorialCompleted || isAlreadyLogin;
  return isPass ? true : false;
};

// 로딩 중 표시할 컴포넌트
const Loading = () => <div>로딩 중...</div>;

// 공통 로딩 컴포넌트
const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Suspense fallback={<Loading />}>{children}</Suspense>;

const routes = [
  {
    path: '/tutorial',
    Component: () => {
      const isComplete = isTutorialCompleted();

      if (isComplete) {
        return <Navigate to="/" replace />;
      }
      return (
        <SuspenseWrapper>
          <Tutorial />
        </SuspenseWrapper>
      );
    },
  },
  {
    path: '/',
    Component: () => {
      const isComplete = isTutorialCompleted();

      if (!isComplete) {
        return <Navigate to="/tutorial" replace />;
      }

      return (
        <SuspenseWrapper>
          <Landing />
        </SuspenseWrapper>
      );
    },
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
        path: 'community/magazine/:magazineId',
        element: (
          <SuspenseWrapper>
            <MagazineDetail />
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
        children: [
          {
            path: 'notification',
            element: (
                <NotificationSettings />
            ),
          },
          {
            path: 'account',
            element: (

                <AccountSettings />

            ),
          },
          {
            path: 'do-not-disturb',
            element: (

                <DoNotDisturbSettings />

            ),
          },
          {
            path: 'blocked-users',
            element: (

                <BlockedUsers />

            ),
          },
          {
            path: 'other-settings',
            element: (

                <OtherSettings />

            ),
          },
          {
            path: 'announcements',
            element: (
    
                <Announcements />
             
            ),
          },
          {
            path: 'change-country',
            element: (
              
                <ChangeCountry />
           
            ),
          },
          {
            path: 'clear-cache',
            element: (
          
                <ClearCache />
    
            ),
          },
          {
            path: 'update-version',
            element: (
           
                <UpdateVersion />
        
            ),
          },
        ],
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
        path: 'partyList/:country',
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
      {
        path: 'nowwedeveloping',
        element: (
          <SuspenseWrapper>
            <EmptyPage />
          </SuspenseWrapper>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
