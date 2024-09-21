import React, { useEffect, useState } from 'react';
import pb from '@/utils/pocketbase';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';
import { Link } from 'react-router-dom';
import getPbImageURL from '@/utils/getPbImageURL';
import { LoadingSpinner } from '@/components/LoadingSpinner';

interface ChatType {
  id: string;
  party: {
    id: string;
    party_leader?: {
      nickname: string;
      profile_photo: string;
    };
  };
  party_id: string;
  party_leader: string;
  chat_member_id: string;
  last_message: string;
  last_message_time: string;
}

interface MessageType {
  id: string;
  chat_id: string;
  sender_id: string;
  message_content: string;
  created: string;
}

const formatTimeDifference = (timestamp: string) => {
  const messageTime = new Date(timestamp);
  const now = new Date();
  const difference = Math.floor((now.getTime() - messageTime.getTime()) / 1000);

  if (difference < 60) return `${difference}초 전`;
  if (difference < 3600) return `${Math.floor(difference / 60)}분 전`;
  if (difference < 86400) return `${Math.floor(difference / 3600)}시간 전`;
  return `${Math.floor(difference / 86400)}일 전`;
};

const ChatHome = () => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [loading, setLoading] = useState(true);
  const currentUserId = localStorage.getItem('authId');

  useEffect(() => {
    const fetchChats = async () => {
      try {
        setLoading(true);
        pb.autoCancellation(false);
        const response = await pb.collection('chat').getList<ChatType>(1, 50, {
          expand: 'party_id.party_leader',
        });

        const userChats = response.items.filter(
          (chat) => chat.chat_member_id === currentUserId
        );

        const chatsWithMessages = await Promise.all(
          userChats.map(async (chat) => {
            try {
              const messagesResponse = await pb
                .collection('chat_message')
                .getList<MessageType>(1, 1, {
                  filter: `chat_id="${chat.id}"`,
                  sort: '-created',
                });

              const lastMessage =
                messagesResponse.items.length > 0
                  ? messagesResponse.items[0].message_content
                  : '메시지가 없습니다.';

              const lastMessageTime =
                messagesResponse.items.length > 0
                  ? messagesResponse.items[0].created
                  : chat.last_message_time;

              return {
                ...chat,
                last_message: lastMessage,
                last_message_time: lastMessageTime,
              };
            } catch (error) {
              console.error('메시지를 가져오는 중 문제가 발생했습니다:', error);
              return chat;
            }
          })
        );

        // 최신 메시지 순으로 정렬
        const sortedChats = chatsWithMessages.sort(
          (a, b) =>
            new Date(b.last_message_time).getTime() -
            new Date(a.last_message_time).getTime()
        );

        setChats(sortedChats);
      } catch (error) {
        console.error('채팅을 가져오는 중 문제가 발생했습니다:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [currentUserId]);

  if (loading) {
    return <LoadingSpinner className="h-full w-full" />;
  }

  if (!chats.length) {
    return <p>참여한 채팅방이 없습니다.</p>;
  }

  return (
    <div className="p-1 space-y-4">
      <ul className="divide-y divide-gray-200">
        {chats.map((chat) => {
          const leader = chat?.expand?.party_id?.expand?.party_leader;
          const profilePhotoUrl = leader?.profile_photo
            ? getPbImageURL(pb.baseUrl, leader, 'profile_photo')
            : null;

          return (
            <li key={chat.id} className="flex items-center py-4 border-b">
              <Link to={`/home/chat/${chat.id}`} className="flex items-center w-full">
                {profilePhotoUrl ? (
                  <img
                    src={profilePhotoUrl}
                    alt="프로필"
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <DefaultProfileSVG size={40} />
                )}
                <div className="flex-1 ml-4">
                  <p className="text-lg font-semibold">
                    {leader?.nickname|| '알 수 없음'}
                  </p>
                  <p className="text-sm">{chat.last_message}</p>
                  <p className="text-sm text-gray-400">
                    {formatTimeDifference(chat.last_message_time)}
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ChatHome;
