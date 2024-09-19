import {
  ComponentType,
  ReactNode,
  Suspense,
  lazy,
  useEffect,
  useState,
} from 'react';
import { createBrowserRouter, Navigate, useNavigate } from 'react-router-dom';
import RootLayout from '@/layout/RootLayout';
import { checkAuthId } from '@/api/auth';
import { Helmet } from 'react-helmet-async';
import Alert from './components/Alert/Alert';

// Lazy loaded components
const Tutorial = lazy(() => import('@/pages/Tutorial'));
const Landing = lazy(() => import('@/pages/Landing'));
const Login = lazy(() => import('@/pages/Login'));
const SignUp = lazy(() => import('@/pages/SignUp'));
const PartyCollect = lazy(() => import('@/pages/PartyCollect'));
const PartyDetail = lazy(() => import('@/pages/PartyDetail'));
const ChatHome = lazy(() => import('@/pages/ChatHome'));
const Community = lazy(() => import('@/pages/Community/Community'));
const CommunityHome = lazy(() => import('@/pages/Community/CommunityHome'));
const RecommendFeed = lazy(() => import('@/pages/Community/RecommendFeed'));
const Magazine = lazy(() => import('@/pages/Community/Magazine'));
const Following = lazy(() => import('@/pages/Community/Following'));
const PopularPost = lazy(() => import('@/pages/Community/PopularPost'));
const UserTip = lazy(() => import('@/pages/Community/UserTip'));
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
const ErrorPage = lazy(() => import('@/pages/ErrorPage'));
const NotificationSettings = lazy(() => import('@/pages/NotificationSettings'));
const DoNotDisturbSettings = lazy(() => import('@/pages/DoNotDisturbSettings'));
const AccountSettings = lazy(() => import('@/pages/AccountSettings'));
const BlockedUsers = lazy(() => import('@/pages/BlockedUsers'));
const OtherSettings = lazy(() => import('@/pages/OtherSettings'));
const Announcements = lazy(() => import('@/pages/Announcements'));
const ChangeCountry = lazy(() => import('@/pages/ChangeCountry'));
const ClearCache = lazy(() => import('@/pages/ClearCache'));
const UpdateVersion = lazy(() => import('@/pages/UpdateVersion'));
const PartyListPage = lazy(() => import('@/pages/PartyList'));
const JoinPartyPage = lazy(() => import('@/pages/JoinParty'));
const OrderDetailPage = lazy(() => import('@/pages/OrderDetail'));
const MagazineDetail = lazy(() => import('@/pages/MagazineDetail'));

interface PropTypes {
  children: ReactNode; // children의 타입을 명시적으로 지정
}

interface wrrraperPropTypes {
  component: ComponentType<any>;
  title: string;
  [key: string]: any; // 나머지 props를 허용
}

const Loading = () => <div>로딩 중...</div>;

const PrivateRoute = ({ children }: PropTypes) => {
  const [isValidUser, setIsValidUser] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const authId = localStorage.getItem('authId');
      if (authId) {
        const userData = await checkAuthId(authId);
        setIsValidUser(!!userData);
      } else {
        setIsValidUser(false);
      }
    };
    verifyUser();
  }, []);

  if (isValidUser === null) return <Loading />;
  if (isValidUser) return children;
  return (
    <Alert
      type={'error'}
      title={'로그인되지 않은 유저입니다.'}
      subtext={'첫 화면으로 돌아갑니다.'}
      onClose={() => navigate('/')}
    />
  );
};

const ProtectedSuspenseRoute = ({
  component: Component,
  title,
  ...rest
}: wrrraperPropTypes) => {
  return (
    <Suspense fallback={<Loading />}>
      <Helmet>
        <title>{title} | Shipmate</title>
      </Helmet>
      <PrivateRoute>
        <Component {...rest} />
      </PrivateRoute>
    </Suspense>
  );
};

const PublicSuspenseRoute = ({
  component: Component,
  title,
  ...rest
}: wrrraperPropTypes) => {
  return (
    <Suspense fallback={<Loading />}>
      <Helmet>
        <title>{title} | Shipmate</title>
      </Helmet>
      <Component {...rest} />
    </Suspense>
  );
};

const routes = [
  {
    path: '/tutorial',
    element: <PublicSuspenseRoute component={Tutorial} title="튜토리얼" />,
  },
  {
    path: '/',
    element: <PublicSuspenseRoute component={Landing} title="홈페이지" />,
  },
  {
    path: '/login',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <PublicSuspenseRoute component={Login} title="로그인" />,
      },
      {
        path: 'signup',
        element: <PublicSuspenseRoute component={SignUp} title="회원가입" />,
      },
    ],
  },
  {
    path: '/home',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProtectedSuspenseRoute component={HomePage} title="홈" />,
      },
      {
        path: 'notifications',
        element: (
          <ProtectedSuspenseRoute component={Notifications} title="알림" />
        ),
      },
      {
        path: 'chatHome',
        element: <ProtectedSuspenseRoute component={ChatHome} title="채팅" />,
      },
      {
        path: 'writepost',
        element: (
          <ProtectedSuspenseRoute component={WritePost} title="게시물 작성" />
        ),
      },
      {
        path: 'community',
        element: (
          <ProtectedSuspenseRoute component={Community} title="커뮤니티" />
        ),
        children: [
          {
            index: true,
            element: (
              <ProtectedSuspenseRoute
                component={CommunityHome}
                title="커뮤니티 홈"
              />
            ),
          },
          {
            path: 'recommendFeed',
            element: (
              <ProtectedSuspenseRoute
                component={RecommendFeed}
                title="추천 피드"
              />
            ),
          },
          {
            path: 'following',
            element: (
              <ProtectedSuspenseRoute component={Following} title="팔로잉" />
            ),
          },
          {
            path: 'userTip',
            element: (
              <ProtectedSuspenseRoute component={UserTip} title="유저 팁" />
            ),
          },
          {
            path: 'popularPost',
            element: (
              <ProtectedSuspenseRoute
                component={PopularPost}
                title="인기 포스트"
              />
            ),
          },
          {
            path: 'magazine',
            element: (
              <ProtectedSuspenseRoute component={Magazine} title="매거진" />
            ),
          },
        ],
      },
      {
        path: 'community/tip/:tipId',
        element: (
          <ProtectedSuspenseRoute component={TipDetail} title="유저 팁 상세" />
        ),
      },
      {
        path: 'community/magazine/:magazineId',
        element: (
          <ProtectedSuspenseRoute
            component={MagazineDetail}
            title="매거진 상세"
          />
        ),
      },
      {
        path: 'community/boast/:boastId',
        element: (
          <ProtectedSuspenseRoute component={BoastDetail} title="자랑 상세" />
        ),
      },
      {
        path: 'mypage',
        element: (
          <ProtectedSuspenseRoute component={MyPage} title="마이페이지" />
        ),
      },
      {
        path: 'setting',
        element: <ProtectedSuspenseRoute component={Setting} title="설정" />,
        children: [
          {
            path: 'notification',
            element: (
              <ProtectedSuspenseRoute
                component={NotificationSettings}
                title="알림 설정"
              />
            ),
          },
          {
            path: 'account',
            element: (
              <ProtectedSuspenseRoute
                component={AccountSettings}
                title="계정 설정"
              />
            ),
          },
          {
            path: 'do-not-disturb',
            element: (
              <ProtectedSuspenseRoute
                component={DoNotDisturbSettings}
                title="방해 금지 설정"
              />
            ),
          },
          {
            path: 'blocked-users',
            element: (
              <ProtectedSuspenseRoute
                component={BlockedUsers}
                title="차단된 사용자"
              />
            ),
          },
          {
            path: 'other-settings',
            element: (
              <ProtectedSuspenseRoute
                component={OtherSettings}
                title="기타 설정"
              />
            ),
          },
          {
            path: 'announcements',
            element: (
              <ProtectedSuspenseRoute
                component={Announcements}
                title="공지사항"
              />
            ),
          },
          {
            path: 'change-country',
            element: (
              <ProtectedSuspenseRoute
                component={ChangeCountry}
                title="국가 변경"
              />
            ),
          },
          {
            path: 'clear-cache',
            element: (
              <ProtectedSuspenseRoute
                component={ClearCache}
                title="캐시 삭제"
              />
            ),
          },
          {
            path: 'update-version',
            element: (
              <ProtectedSuspenseRoute
                component={UpdateVersion}
                title="버전 업데이트"
              />
            ),
          },
        ],
      },
      {
        path: 'partyCollect',
        element: (
          <ProtectedSuspenseRoute component={PartyCollect} title="파티 모집" />
        ),
      },
      {
        path: 'joinParty',
        element: (
          <ProtectedSuspenseRoute component={JoinPartyPage} title="파티 참여" />
        ),
      },
      {
        path: 'partyList/:country',
        element: (
          <ProtectedSuspenseRoute
            component={PartyListPage}
            title="파티 리스트"
          />
        ),
      },
      {
        path: 'orderDetail',
        element: (
          <ProtectedSuspenseRoute
            component={OrderDetailPage}
            title="결제 상세"
          />
        ),
      },
      {
        path: 'party/:partyId',
        element: (
          <ProtectedSuspenseRoute component={PartyDetail} title="파티 상세" />
        ),
      },
      {
        path: 'search',
        element: <ProtectedSuspenseRoute component={SearchPage} title="검색" />,
      },
      {
        path: 'search/:keyword',
        element: (
          <ProtectedSuspenseRoute
            component={SearchResultPage}
            title="검색 결과"
          />
        ),
      },
    ],
  },
  {
    path: 'nowwedeveloping',
    element: <ProtectedSuspenseRoute component={EmptyPage} title="개발 중" />,
  },
  {
    path: 'cantfindpage',
    element: (
      <ProtectedSuspenseRoute
        component={ErrorPage}
        title="페이지를 찾을 수 없음"
      />
    ),
  },
  {
    path: '*',
    element: <Navigate to="/cantfindpage" />,
  },
];

const router = createBrowserRouter(routes);

export default router;
