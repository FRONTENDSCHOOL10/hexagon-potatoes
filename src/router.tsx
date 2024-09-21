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
import Alert from '@/components/Alert/Alert';
import { PageLoadingSpinner } from '@/components/LoadingSpinner';

// 레이지 로딩
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
  children: ReactNode;
}

interface wrrraperPropTypes {
  component: ComponentType<any>;
  [key: string]: any;
}

const Loading = () => <PageLoadingSpinner />;

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
      subtext={
        '로그인 후 다시 시도해 주세요. 혹은 예상치 못한 오류로 인해 이동할 수 있습니다. 첫 화면으로 돌아갑니다.'
      }
      onClose={() => navigate('/')}
    />
  );
};

const ProtectedSuspenseRoute = ({
  component: Component,
  ...rest
}: wrrraperPropTypes) => {
  return (
    <Suspense fallback={<Loading />}>
      <PrivateRoute>
        <Component {...rest} />
      </PrivateRoute>
    </Suspense>
  );
};

const PublicSuspenseRoute = ({
  component: Component,
  ...rest
}: wrrraperPropTypes) => {
  return (
    <Suspense fallback={<Loading />}>
      <Component {...rest} />
    </Suspense>
  );
};

const routes = [
  {
    path: '/tutorial',
    element: <PublicSuspenseRoute component={Tutorial} />,
  },
  {
    path: '/',
    element: <PublicSuspenseRoute component={Landing} />,
  },
  {
    path: '/login',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <PublicSuspenseRoute component={Login} />,
      },
      {
        path: 'signup',
        element: <PublicSuspenseRoute component={SignUp} />,
      },
    ],
  },
  {
    path: '/home',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ProtectedSuspenseRoute component={HomePage} />,
      },
      {
        path: 'notifications',
        element: <ProtectedSuspenseRoute component={Notifications} />,
      },
      {
        path: 'chatHome',
        element: <ProtectedSuspenseRoute component={ChatHome} />,
      },
      {
        path: 'writepost',
        element: <ProtectedSuspenseRoute component={WritePost} />,
      },
      {
        path: 'community',
        element: <ProtectedSuspenseRoute component={Community} />,
        children: [
          {
            index: true,
            element: <ProtectedSuspenseRoute component={CommunityHome} />,
          },
          {
            path: 'recommendFeed',
            element: <ProtectedSuspenseRoute component={RecommendFeed} />,
          },
          {
            path: 'following',
            element: <ProtectedSuspenseRoute component={Following} />,
          },
          {
            path: 'userTip',
            element: <ProtectedSuspenseRoute component={UserTip} />,
          },
          {
            path: 'popularPost',
            element: <ProtectedSuspenseRoute component={PopularPost} />,
          },
          {
            path: 'magazine',
            element: <ProtectedSuspenseRoute component={Magazine} />,
          },
        ],
      },
      {
        path: 'community/tip/:tipId',
        element: <ProtectedSuspenseRoute component={TipDetail} />,
      },
      {
        path: 'community/magazine/:magazineId',
        element: <ProtectedSuspenseRoute component={MagazineDetail} />,
      },
      {
        path: 'community/boast/:boastId',
        element: <ProtectedSuspenseRoute component={BoastDetail} />,
      },
      {
        path: 'mypage',
        element: <ProtectedSuspenseRoute component={MyPage} />,
      },
      {
        path: 'setting',
        element: <ProtectedSuspenseRoute component={Setting} />,
        children: [
          {
            path: 'notification',
            element: (
              <ProtectedSuspenseRoute component={NotificationSettings} />
            ),
          },
          {
            path: 'account',
            element: <ProtectedSuspenseRoute component={AccountSettings} />,
          },
          {
            path: 'do-not-disturb',
            element: (
              <ProtectedSuspenseRoute component={DoNotDisturbSettings} />
            ),
          },
          {
            path: 'blocked-users',
            element: <ProtectedSuspenseRoute component={BlockedUsers} />,
          },
          {
            path: 'other-settings',
            element: <ProtectedSuspenseRoute component={OtherSettings} />,
          },
          {
            path: 'announcements',
            element: <ProtectedSuspenseRoute component={Announcements} />,
          },
          {
            path: 'change-country',
            element: <ProtectedSuspenseRoute component={ChangeCountry} />,
          },
          {
            path: 'clear-cache',
            element: <ProtectedSuspenseRoute component={ClearCache} />,
          },
          {
            path: 'update-version',
            element: <ProtectedSuspenseRoute component={UpdateVersion} />,
          },
        ],
      },
      {
        path: 'partyCollect',
        element: <ProtectedSuspenseRoute component={PartyCollect} />,
      },
      {
        path: 'joinParty',
        element: <ProtectedSuspenseRoute component={JoinPartyPage} />,
      },
      {
        path: 'partyList/:country',
        element: <ProtectedSuspenseRoute component={PartyListPage} />,
      },
      {
        path: 'orderDetail',
        element: <ProtectedSuspenseRoute component={OrderDetailPage} />,
      },
      {
        path: 'party/:partyId',
        element: <ProtectedSuspenseRoute component={PartyDetail} />,
      },
      {
        path: 'search',
        element: <ProtectedSuspenseRoute component={SearchPage} />,
      },
      {
        path: 'search/:keyword',
        element: <ProtectedSuspenseRoute component={SearchResultPage} />,
      },
    ],
  },
  {
    path: 'nowwedeveloping',
    element: <ProtectedSuspenseRoute component={EmptyPage} />,
  },
  {
    path: 'cantfindpage',
    element: <ProtectedSuspenseRoute component={ErrorPage} />,
  },
  {
    path: '*',
    element: <Navigate to="/cantfindpage" />,
  },
];

const router = createBrowserRouter(routes);

export default router;
