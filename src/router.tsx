import React, { ReactNode, Suspense, lazy, useEffect, useState } from 'react';
import { createBrowserRouter, Navigate, useNavigate } from 'react-router-dom';
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
import MagazineDetail from '@/pages/MagazineDetail';
import { checkAuthId } from '@/api/auth';

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
import Alert from '@/components/Alert/Alert';

interface PropTypes {
  children: ReactNode; // children의 타입을 명시적으로 지정
}

// 튜토리얼 완료 상태 확인
const isTutorialCompleted = () => {
  const tutorialCompleted = sessionStorage.getItem('tutorialCompleted');
  const isAlreadyLogin = Boolean(localStorage.getItem('authId'));
  const isPass = tutorialCompleted || isAlreadyLogin;
  return isPass ? true : false;
};

const isAuth = () => {
  const authToken = localStorage.getItem('authToken');
  return authToken ? true : false;
};

// 로딩 중 표시할 컴포넌트
const Loading = () => <div>로딩 중...</div>;

// 공통 로딩 컴포넌트
const SuspenseWrapper: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <Suspense fallback={<Loading />}>{children}</Suspense>;

const PrivateRoute = ({ children }: PropTypes) => {
  const [isValidUser, setIsValidUser] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const authId = localStorage.getItem('authId'); // authId 가져오기
      if (authId) {
        const userData = await checkAuthId(authId); // authId로 유효성 검사
        setIsValidUser(!!userData);
      } else {
        setIsValidUser(false);
      }
    };
    verifyUser();
  }, []);

  if (isValidUser === null) return <Loading />;
  console.log(isValidUser);
  if (isValidUser) {
    return children; // 유효한 사용자일 경우 children 반환
  }
  return (
    <Alert
      type={'error'}
      title={'로그인되지 않은 유저입니다.'}
      subtext={'첫 화면으로 돌아갑니다.'}
      onClose={() => {
        navigate('/');
      }}
    />
  );
};

const routes = [
  {
    path: '/tutorial',
    Component: () => {
      const isComplete = isTutorialCompleted();

      if (isAuth()) {
        return <Navigate to="/home" />;
      }

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
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'notifications',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'chatHome',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <ChatHome />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'writepost',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <WritePost />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'community',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <Community />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
        children: [
          {
            index: true,
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <CommunityHome />
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'recommendFeed',
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <RecommendFeed />
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'following',
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <Following />
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'userTip',
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <UserTip />
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'popularPost',
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <PopularPost />,
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'magazine',
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <Magazine />
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
        ],
      },
      {
        path: 'community/tip/:tipId',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <TipDetail />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'community/magazine/:magazineId',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <MagazineDetail />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'community/boast/:boastId',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <BoastDetail />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'mypage',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <MyPage />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'setting',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <Setting />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
        children: [
          {
            path: 'notification',
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <NotificationSettings />,
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'account',
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <AccountSettings />,
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'do-not-disturb',
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <DoNotDisturbSettings />,
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'blocked-users',
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <BlockedUsers />,
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'other-settings',
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <OtherSettings />,
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'announcements',
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <Announcements />,
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'change-country',
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <ChangeCountry />,
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'clear-cache',
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <ClearCache />,
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
          {
            path: 'update-version',
            element: (
              <SuspenseWrapper>
                <PrivateRoute>
                  <UpdateVersion />,
                </PrivateRoute>
              </SuspenseWrapper>
            ),
          },
        ],
      },
      {
        path: 'partyCollect',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <PartyCollect />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'joinParty',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <JoinPartyPage />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'partyList/:country',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <PartyListPage />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'orderDetail',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <OrderDetailPage />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'party/:partyId',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <PartyDetail />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'search',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <SearchPage />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'search/:keyword',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <SearchResultPage />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
      {
        path: 'nowwedeveloping',
        element: (
          <SuspenseWrapper>
            <PrivateRoute>
              <EmptyPage />
            </PrivateRoute>
          </SuspenseWrapper>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
