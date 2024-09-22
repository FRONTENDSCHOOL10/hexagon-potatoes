import NotificationList from '@/components/NotificationList/NotificationList';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

interface Notification {
  id: string;
  type: string;
  created: string;
  read: boolean;
  expand: {
    party_id: {
      party_name: string;
    };
  };
}

const fetchUserNotifications = async (
  userId: string
): Promise<Notification[]> => {
  try {
    const response = await axios.get<{ items: Notification[] }>(
      `${import.meta.env.VITE_PB_URL}api/collections/notification/records`,
      {
        params: {
          filter: `user_id="${userId}"`,
          sort: '-created',
          expand: 'party_id',
        },
      }
    );
    return response.data.items;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

const Notifications = () => {
  const defaultTipImage = '/assets/shipmatelogo.webp';
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = useCallback(async (id: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((item) => item.id !== id)
    );
    try {
      await axios.delete(
        `${import.meta.env.VITE_PB_URL}api/collections/notification/records/${id}`
      );
      console.log('성공');
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }, []);

  const handleReadStatusChange = useCallback(
    async (id: string, isRead: boolean) => {
      try {
        await axios.patch(
          `${import.meta.env.VITE_PB_URL}api/collections/notification/records/${id}`,
          {
            read: isRead,
          }
        );

        setNotifications((prev) =>
          prev.map((notif) =>
            notif.id === id ? { ...notif, read: isRead } : notif
          )
        );
      } catch (error) {
        console.error('Failed to update read status:', error);
      }
    },
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem('authId');
        if (!userId) {
          throw new Error('User ID not found');
        }
        const responseData = await fetchUserNotifications(userId);
        setNotifications(responseData);

        setLoading(false);
      } catch (err) {
        console.error('Error fetching notifications:', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (loading) return null;

  return (
    <>
      <Helmet>
        <title>알림 | Shipmate</title>
        <meta
          name="description"
          content="사용자의 알림 목록을 확인하고, 알림을 관리하세요."
        />
        <meta name="keywords" content="알림, 쉽메이트, 관리, 사용자" />
      </Helmet>
      <ul className="flex flex-col px-3 pb-3">
        {notifications.length !== 0 ? (
          notifications.map((item) => (
            <NotificationList
              key={item.id}
              id={item.id}
              type={item.type}
              partyName={item.expand.party_id.party_name}
              handleDelete={handleDelete}
              handleReadStatusChange={handleReadStatusChange}
              time={item.created}
              isRead={item.read}
              partyId={item.expand.party_id.id}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-700">
            <img src={defaultTipImage} alt="Default tip" />
            <span>받은 알림이 없어요</span>
          </div>
        )}
      </ul>
    </>
  );
};

export default Notifications;
