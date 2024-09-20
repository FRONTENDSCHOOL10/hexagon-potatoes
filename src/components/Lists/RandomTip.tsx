import React, { useEffect, useState } from 'react';
import axios from 'axios';
import getPbImageURL, { getPbImagesURL } from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import Article from '@/components/Lists/Article';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';

const baseTipUrl = `${pb.baseUrl}api/collections/tip/records`;
const url = 'https://hexagon-potatoes.pockethost.io';

const getTipImageUrl = (tip: any): string => {
  return tip.photo ? getPbImagesURL(0, tip) : '';
};

const RandomTip = () => {
  const [randomTip, setRandomTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //AbortController를 도입하여 요청 관리를 개선
    const abortController = new AbortController();

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
        console.log(tips[1].expand);
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
