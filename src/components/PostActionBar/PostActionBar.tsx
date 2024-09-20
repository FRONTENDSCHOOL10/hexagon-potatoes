import formatCurrency from '@/utils/currencyFormat';
import { formatDateShort, formatDateString } from '@/utils/dateFormatter';
import pb from '@/utils/pocketbase';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';

interface PropTypes {
  postId: string | number;
  onBookmark: () => void;
  onShare: () => void;
  date: string;
  type: 'tip' | 'magazine' | 'boast';
}

const PostActionBar = ({
  postId,
  onBookmark,
  onShare,
  date,
  type,
}: PropTypes) => {
  const [likes, setLikes] = useState<number | null>(null);
  const [views, setViews] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const getUrl = useCallback(() => {
    switch (type) {
      case 'boast':
        return `${pb.baseUrl}api/collections/posting/records/${postId}`;
      case 'magazine':
        return `${pb.baseUrl}api/collections/magazine/records/${postId}`;
      case 'tip':
        return `${pb.baseUrl}api/collections/tip/records/${postId}`;
      default:
        throw new Error(`Invalid type: ${type}`);
    }
  }, [type, postId]);

  const fetchLikes = useCallback(async () => {
    try {
      const url = getUrl();
      const response = await axios.get(url);
      setLikes(response.data.like);
    } catch (error) {
      console.error('좋아요 수 가져오기 실패:', error);
    }
  }, [getUrl]);

  useEffect(() => {
    const calViews = formatCurrency(Math.floor(Math.random() * 3000) + 1);
    setViews(calViews);
    fetchLikes();
  }, [fetchLikes]);

  const onLike = async () => {
    if (isLoading || likes === null) return;
    setIsLoading(true);
    setLikes((prevLikes) => (prevLikes !== null ? prevLikes + 1 : 1));
    try {
      const url = getUrl();
      const response = await axios.patch(url, { like: likes + 1 });
      if (response.status === 200) {
        console.log('좋아요 업데이트 성공');
      }
    } catch (error) {
      console.error('좋아요 업데이트 실패:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="font-[Pretendard] text-[0.75rem] font-normal not-italic leading-[1.0625rem] text-[#626871]">
        <time dateTime={formatDateString(date)}>
          {formatDateShort(date)}
          {'\u00A0'}
        </time>
        {/* 좋아요, 조회수는 하드코딩으로 넣기 */}
        <span> 좋아요 {likes !== 0 && likes} </span>
        <span> 조회 {views}</span>
      </div>
      <div className="flex h-[1.5625rem] items-center gap-4">
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="좋아요"
          type="button"
          aria-label="좋아요"
          onClick={onLike}
        >
          <svg
            width="16"
            height="15"
            role="img"
            className="text-gray-200"
            aria-hidden="true"
          >
            <use width="16" height="15" href="/assets/sprite-sheet.svg#heart" />
          </svg>
        </button>
        <Link
          // 나중에 연결될 댓글 페이지 제작 후 path 연결해주기
          to={`/post/${postId}/comments`}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="댓글"
          type="button"
          aria-label="댓글 보기"
        >
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            role="img"
            className="text-gray-200"
            aria-hidden="true"
          >
            <use
              width="16"
              height="17"
              href="/assets/sprite-sheet.svg#comment"
            />
          </svg>
        </Link>
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="북마크"
          type="button"
          aria-label="북마크"
          onClick={onBookmark}
        >
          <svg
            width="15"
            height="17"
            viewBox="0 0 15 17"
            role="img"
            className="text-gray-200"
            aria-hidden="true"
          >
            <use
              width="15"
              height="17"
              href="/assets/sprite-sheet.svg#bookmark"
            />
          </svg>
        </button>
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="공유"
          type="button"
          aria-label="공유"
          onClick={onShare}
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            role="img"
            className="text-gray-200"
            aria-hidden="true"
          >
            <use
              width="17"
              height="17"
              href="/assets/sprite-sheet.svg#share2"
            />
          </svg>{' '}
        </button>
        <Tooltip
          id="my-tooltip"
          globalCloseEvents={{
            escape: true,
            scroll: false,
            resize: false,
            clickOutsideAnchor: false,
          }}
        />
      </div>
    </>
  );
};

export default PostActionBar;
