import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getPbImageURL, { getPbImagesURL } from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import Article from '@/components/Lists/Article';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';

interface PropTypes {
  reloadCount: number;
}

const baseTipUrl = `${pb.baseUrl}api/collections/tip/records`;
const baseUserUrl = `${pb.baseUrl}api/collections/users/records`;

const getTipImageUrl = (tip: any): string =>
  tip.photo ? getPbImagesURL(0, tip) : '';

const fetchAuthorData = async (authorId: string) => {
  try {
    const response = await axios.get(baseUserUrl, {
      params: { filter: `id="${authorId}"` },
    });
    return response.data.items.length > 0 ? response.data.items[0] : null;
  } catch (error) {
    console.error(`해당 아이디로 정보 못 찾음 ${authorId}`, error);
    return null;
  }
};

const RandomTip = ({ reloadCount }: PropTypes) => {
  const [randomTip, setRandomTip] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRandomTip = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await axios.get(baseTipUrl);
        const tips = response.data.items;

        if (tips.length === 0) {
          throw new Error('팁이 없습니다.');
        }

        const randomIndex = Math.floor(Math.random() * tips.length);
        const selectedTip = tips[randomIndex];

        const tipImg = getTipImageUrl(selectedTip);
        const authorData = selectedTip.author_id
          ? await fetchAuthorData(selectedTip.author_id)
          : null;

        setRandomTip({
          id: selectedTip.id,
          content_title: selectedTip.title,
          content_img: tipImg,
          subtitle: selectedTip.content,
          profile_photo: authorData?.profile_photo || DefaultProfileSVG,
          nickname: authorData?.nickname || '',
        });
      } catch (error) {
        console.error('Error fetching random tip:', error);
        setError('팁을 불러오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchRandomTip();
  }, [reloadCount]);

  if (loading) return <p aria-live="polite">로딩 중...</p>;
  if (error) return <p aria-live="assertive">{error}</p>;

  return (
    <ul>
      {randomTip && (
        <Article
          level={2}
          type="tip"
          content_title={randomTip.content_title}
          content_img={randomTip.content_img}
          subtitle={randomTip.subtitle}
          profile_photo={randomTip.profile_photo}
          nickname={randomTip.nickname}
          id={randomTip.id}
        />
      )}
    </ul>
  );
};

export default RandomTip;
