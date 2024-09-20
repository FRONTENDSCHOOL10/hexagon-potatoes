import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { getPbImagesURL } from '@/utils/getPbImageURL';

interface PropTypes {
  nickname: string;
  content: string;
  id: string;
  photo: string;
}

const defaultTipImage = '/assets/shipmatelogo.png';

const MiniPostingCard = ({ nickname, content, id, photo }: PropTypes) => {
  const imageUrl = useMemo(
    () => (photo ? getPbImagesURL(0, photo) : defaultTipImage),
    [photo]
  );

  return (
    <Link to={`/home/community/boast/${id}`}>
      <figure
        aria-labelledby={`post-title-${id}`}
        className="flex h-[13.6rem] w-40 flex-[1_0_0] flex-col items-center overflow-hidden rounded-md bg-[#FFF] shadow-shadow-blue"
      >
        <img
          className="h-[10.3rem] w-full bg-[rgba(0,_0,_0,_0.05)] object-cover"
          src={imageUrl}
          alt="포스팅 이미지"
          loading="lazy"
          decoding="async"
          width="160"
          height="165"
        />
        <figcaption className="flex flex-col items-start gap-1 self-stretch p-2">
          <p className="text-caption text-gray-300">{nickname}</p>
          <h3
            id={`post-title-${id}`}
            className="w-full overflow-hidden text-ellipsis whitespace-nowrap text-sub-1 leading-[1.18rem] text-black"
          >
            {content}
          </h3>
        </figcaption>
      </figure>
    </Link>
  );
};

export default memo(MiniPostingCard);
