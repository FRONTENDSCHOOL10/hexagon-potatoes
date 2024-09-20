import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getPbImageURL, { getPbImagesURL } from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import Article from '@/components/Lists/Article';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';

interface PropTypes {
  reloadCount: number;
}

interface Author {
  id: string;
  profile_photo?: string;
  nickname: string;
}

interface RandomTipData {
  id: string;
  content_title: string;
  content_img: string;
  subtitle: string;
  profile_photo: string | typeof DefaultProfileSVG;
  nickname: string;
  authorData: Author | null;
}
const baseTipUrl = `${pb.baseUrl}api/collections/tip/records`;
const url = `${pb.baseUrl}`;

const getTipImageUrl = (tip: any): string => {
  return tip.photo ? getPbImagesURL(0, tip) : '';
};
const RandomTip = ({ reloadCount }: PropTypes) => {
  const [randomTip, setRandomTip] = useState<RandomTipData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    //AbortController를 도입하여 요청 관리를 개선
    const abortController = new AbortController();
    setError(null);
    setLoading(true);
    const fetchRandomTip = async () => {
      try {
        const response = await axios.get(baseTipUrl, {
          signal: abortController.signal,
          // 팁 쿼리에 작성자 정보 확장(expand) 적용하여 별도 작성자 조회 제거
          params: {
            expand: 'author_id',
          },
        });

        const tips = response.data.items;

        if (tips.length === 0) {
          throw new Error('팁이 없습니다.');
        }

        const randomIndex = Math.floor(Math.random() * tips.length);
        const selectedTip = tips[randomIndex];

        const tipImg = getTipImageUrl(selectedTip);
        const authorData = selectedTip?.expand?.author_id;

        setRandomTip({
          id: selectedTip.id,
          content_title: selectedTip.title,
          content_img: tipImg,
          subtitle: selectedTip.content,
          profile_photo: authorData?.profile_photo ? authorData : '',
          nickname: authorData?.nickname || '',
          authorData: authorData,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching random tip:', error);
        setError('팁을 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchRandomTip();
  }, [reloadCount]);

  if (loading) {
    return <div aria-live="polite">로딩 중...</div>;
  }

  if (error) {
    return <div aria-live="assertive">{error || '포스팅이 없습니다.'}</div>;
  }

  return (
    <ul>
      {randomTip && (
        <Article
          level={2}
          type="tip"
          content_title={randomTip.content_title}
          content_img={randomTip.content_img}
          subtitle={randomTip.subtitle}
          profile_photo={
            randomTip.profile_photo
              ? getPbImageURL(url, randomTip?.authorData, 'profile_photo')
              : DefaultProfileSVG
          }
          nickname={randomTip.nickname}
          id={randomTip.id}
          label={[]} // 필요에 따라 라벨 추가
        />
      )}
    </ul>
  );
};

export default RandomTip;
