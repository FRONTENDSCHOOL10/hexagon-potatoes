import React, { useEffect, useState } from 'react';
import pb from '@/utils/pocketbase';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';
import { Link } from 'react-router-dom';

interface ChatType {
  id: string;
  party_id: string;
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
        const response = await pb.collection('chat').getList<ChatType>(1, 50);
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

              return {
                ...chat,
                last_message: lastMessage,
              };
            } catch (error) {
              console.error('Error fetching messages:', error);
              return chat;
            }
          })
        );

        setChats(chatsWithMessages);
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, [currentUserId]);

  if (loading) {
    return <p>Loading chats...</p>;
  }

  if (!chats.length) {
    return <p>No chats available.</p>;
  }

  return (
    <div className="p-4 space-y-4">
      <ul className="divide-y divide-gray-200">
        {chats.map((chat) => (
          <li key={chat.id} className="flex items-center py-4">
            <Link to={`/home/chat/${chat.id}`} className="flex items-center w-full">
              <DefaultProfileSVG size={40} />
              <div className="flex-1 ml-4">
                <p className="text-lg font-semibold">{chat.last_message}</p>
                <p className="text-sm text-gray-400">
                  {formatTimeDifference(chat.last_message_time)}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatHome;
