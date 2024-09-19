import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getPbImageURL from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import Article from '@/components/Lists/Article';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';

const baseTipUrl = `${pb.baseUrl}/api/collections/tip/records`;
const baseUserUrl = `${pb.baseUrl}/api/collections/users/records`;

const getTipImageUrl = (tip) => {
  return tip.photo ? getPbImageURL(pb.baseUrl, tip, 'photo') : '';
};

const fetchAuthorData = async (authorId) => {
  try {
    const response = await axios.get(baseUserUrl, {
      params: {
        filter: `id="${authorId}"`,
      },
    });
    return response.data.items.length > 0 ? response.data.items[0] : null;
  } catch (error) {
    console.error(`해당 아이디로 정보 못 찾음 ${authorId}`, error);
    return null;
  }
};

const RandomTip = () => {
  const [randomTip, setRandomTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomTip = async () => {
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
        setLoading(false);
      } catch (error) {
        console.error('Error fetching random tip:', error);
        setError('팁을 불러오는 데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchRandomTip();
  }, []);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

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
          label={[]} // 필요에 따라 라벨 추가
        />
      )}
    </ul>
  );
};

export default RandomTip;
