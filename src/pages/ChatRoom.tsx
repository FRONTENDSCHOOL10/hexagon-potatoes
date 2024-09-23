import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import pb from '@/utils/pocketbase';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';
import getPbImageURL from '@/utils/getPbImageURL';

interface MessageType {
  id: string;
  chat_id: string;
  sender_id: string;
  message_content: string;
  created: string;
  expand: {
    sender_id: {
      nickname: string;
      profile_photo: string;
    };
  };
}

const ChatRoom = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [nickname, setNickname] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const fetchMessages = async (pageNum: number) => {
    try {
      setLoading(true);
      const response = await pb.collection('chat_message').getList<MessageType>(pageNum, 20, {
        filter: `chat_id="${chatId}"`,
        expand: 'sender_id',
        sort: '-created', 
      });

      if (response.items.length < 20) {
        setHasMore(false); 
      }

      if (pageNum === 1) {
        setMessages(response.items.reverse()); 
         
      } else {
        setMessages((prevMessages) => [...response.items.reverse(), ...prevMessages]);
      }

      if (response.items.length > 0 && pageNum === 1) {
        setNickname(response.items[0].expand?.sender_id?.nickname || '알 수 없음');
      }
    } catch (error) {
      console.error('메시지를 가져오는 중 문제가 발생했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages(1);

    const unsubscribe = pb.collection('chat_message').subscribe('*', async (e) => {
      if (e.action === 'create' && e.record.chat_id === chatId) {
        const expandedMessage = await pb.collection('chat_message').getOne<MessageType>(e.record.id, {
          expand: 'sender_id',
        });

        setMessages((prevMessages) => {
          const isMessageExist = prevMessages.some((msg) => msg.id === e.record.id);
          if (!isMessageExist) {
            return [...prevMessages, expandedMessage];
          }
          return prevMessages;
        });
        setTimeout(scrollToBottom, 100);
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [chatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const loadMoreMessages = () => {
    if (hasMore) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1;
        fetchMessages(nextPage);
        return nextPage;
      });
    }
  };

  const formatTimeDifference = (timestamp: string) => {
    const messageTime = new Date(timestamp);
    const now = new Date();
    const difference = Math.floor((now.getTime() - messageTime.getTime()) / 1000);

    if (difference < 60) return `${difference}초 전`;
    if (difference < 3600) return `${Math.floor(difference / 60)}분 전`;
    if (difference < 86400) return `${Math.floor(difference / 3600)}시간 전`;
    return `${Math.floor(difference / 86400)}일 전`;
  };

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    try {
      await pb.collection('chat_message').create({
        chat_id: chatId,
        sender_id: localStorage.getItem('authId'),
        message_content: message,
      });
      setMessage('');
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('메시지 전송 중 오류가 발생했습니다:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (loading && page === 1) {
    return <p>Loading messages...</p>;
  }

  return (
    <>
    <Helmet>
        <title>{nickname ? `${nickname} 의 채팅방` : `${chatId}와의 채팅방`}</title>
    </Helmet>
    <div className="relative flex flex-col">
        <div className="flex-1 p-4 pb-[80px] ">
        {hasMore && (
          <button
            onClick={loadMoreMessages}
            className="text-blue-500 mb-4"
          >
            이전 메시지 더보기
          </button>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col items-start gap-1 pb-2 ${
              msg.sender_id === localStorage.getItem('authId') ? 'items-end' : 'items-start'
            }`}
          >
            {msg.sender_id !== localStorage.getItem('authId') && (
              <div className="flex items-center gap-2">
                {msg.expand?.sender_id?.profile_photo ? (
                  <img
                    src={getPbImageURL(pb.baseUrl, msg.expand.sender_id, 'profile_photo')}
                    alt="프로필"
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <DefaultProfileSVG size={32} />
                )}
                <span className="text-xs text-gray-500">
                  {msg.expand?.sender_id?.nickname || '알 수 없음'}
                </span>
              </div>
            )}
            <div
              className={`relative p-3 rounded-[25px] max-w-[70%] ${
                msg.sender_id === localStorage.getItem('authId')
                  ? 'bg-mainblue text-right text-white'
                  : 'bg-gray-100 text-left'
              }`}
            >
              <p className="text-sm">{msg.message_content}</p>
            </div>
            <p className="text-xs text-gray-600">{formatTimeDifference(msg.created)}</p>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-12 w-[360px] flex items-center gap-2 pt-3 pb-3 bg-white z-[60]">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="메시지를 입력하세요"
          className="flex-1 p-3 border rounded-full"
        />
        <button
          onClick={handleSendMessage}
          className="w-12 h-12 bg-mainblue text-white rounded-full"
        >
          ↑
        </button>
      </div>
    </div>
    </>
  );
};

export default ChatRoom;
