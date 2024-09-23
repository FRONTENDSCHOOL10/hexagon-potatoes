import SquarePostingCard from '@/components/PostingCard/SquarePostingCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const ENDPOINT = `https://hexagon-potatoes.pockethost.io/api/collections/posting/records`;

const RecommendFeed = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchPosting = async () => {
      try {
        const response = await axios.get(ENDPOINT, {
          signal: abortController.signal,
        });
        console.log(response.data.items);
        setData(response.data.items);
        setLoading(false);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.name !== 'CanceledError') {
            return;
          }
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPosting();

    return () => {
      abortController.abort();
    };
  }, []);

  if (loading) return null;

  return (
    <>
      <Helmet>
        <title>추천 피드 | Shipmate</title>
        <meta
          name="description"
          content="쉽메이트에서 추천하는 게시물을 확인하세요."
        />
        <meta name="keywords" content="추천, 게시물, 쉽메이트, 소통" />

        <meta property="og:title" content="추천 피드 | Shipmate" />
        <meta
          property="og:description"
          content="쉽메이트에서 추천하는 게시물을 확인하세요."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://sheepmate.netlify.app/home/community/recommendFeed"
        />
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/1044545035221352531/1287620951554527324/landing_1.png?ex=66f235f5&is=66f0e475&hm=143d17f0a2bdb88e9772825fab5b924e2cc2fdea9167cbe4dcc1bc82344d4b76&" // 이 부분은 실제 이미지 URL로 변경하세요
        />
      </Helmet>

      <h1 className="sr-only">추천피드</h1>
      <ul className="flex flex-row flex-wrap gap-x-2 gap-y-3 px-[0.69rem] pb-[1.94rem] pt-[0.75rem]">
        {data.map((item: any) => (
          <SquarePostingCard key={item.id} data={item} />
        ))}
      </ul>
    </>
  );
};

export default RecommendFeed;
