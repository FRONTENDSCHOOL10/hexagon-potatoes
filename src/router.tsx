import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import LandingPage from './pages/Landing';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import PartyCollect from './pages/PartyCollect';
import PartyDetail from './pages/PartyDetail';
import HomePage from './pages/HomePage';
import ChatHome from './pages/ChatHome';
import Community from './pages/Community';
import TipDetail from './pages/TipDetail';
import BoastDetail from './pages/BoastDetail';
import MyPage from './pages/MyPage';
import SearchPage from './pages/Search';
import SearchResultPage from './pages/SearchResult';
const routes = [
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'home',
        children: [
          {
            index: true,
            element: <HomePage />,
          },
          {
            path: 'chatHome',
            element: <ChatHome />,
          },
          {
            path: 'community',
            element: <Community />,
          },
          {
            path: 'community/tip/:tipId',
            element: <TipDetail />,
          },
          {
            path: 'community/boast/:boastId',
            element: <BoastDetail />,
          },
          {
            path: 'mypage',
            element: <MyPage />,
          },
          {
            path: 'partyCollect',
            element: <PartyCollect />,
          },
          {
            path: 'party/:partyId',
            element: <PartyDetail />,
          },
          {
            path: 'search',
            element: <SearchPage />,
          },
          {
            path: 'search/:keyword',
            element: <SearchResultPage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
