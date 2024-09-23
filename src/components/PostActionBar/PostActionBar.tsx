import { memo, useCallback, useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tooltip';
import formatCurrency from '@/utils/currencyFormat';
import { formatDateShort, formatDateString } from '@/utils/dateFormatter';
import pb from '@/utils/pocketbase';

interface PropTypes {
  postId: string | number;
  onShare: () => void;
  date: string;
  type: 'tip' | 'magazine' | 'boast';
}

interface LikeState {
  isLiked: boolean;
  count: number | null;
}

const PostActionBar = ({ postId, onShare, date, type }: PropTypes) => {
  const [likeState, setLikeState] = useState<LikeState>({
    isLiked: false,
    count: null,
  });
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [views, setViews] = useState<number | null>(null);

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
      setLikeState((prev) => ({ ...prev, count: response.data.like }));
    } catch (error) {
      console.error('좋아요 수 가져오기 실패:', error);
    }
  }, [getUrl]);

  useEffect(() => {
    const calViews = formatCurrency(Math.floor(Math.random() * 3000) + 1);
    setViews(calViews);
    fetchLikes();
  }, [fetchLikes]);

  const handleSave = useCallback(() => {
    setIsSaved((prev) => !prev);
  }, []);

  const handleLike = useCallback(async () => {
    const newIsLiked = !likeState.isLiked;
    const newCount = (likeState.count ?? 0) + (newIsLiked ? 1 : -1);

    setLikeState({ isLiked: newIsLiked, count: newCount });

    try {
      const url = getUrl();
      await axios.patch(url, { like: newCount });
    } catch (error) {
      console.error('좋아요 업데이트 실패:', error);
      setLikeState((prev) => ({ isLiked: !newIsLiked, count: prev.count }));
    }
  }, [likeState, getUrl]);

  const handleShare = useCallback(() => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl)
      .then(() => {
        alert('URL이 복사되었습니다.');
      })
      .catch((error) => {
        console.error('URL 복사 실패:', error);
      });
  }, []);

  const memoizedDate = useMemo(() => formatDateShort(date), [date]);

  return (
    <>
      <div className="pretendard text-[0.75rem] font-normal not-italic leading-[1.0625rem] text-[#626871]">
        <time dateTime={formatDateString(memoizedDate)}>
          {formatDateShort(memoizedDate)}
          {'\u00A0'}
        </time>
        <span> 좋아요 {likeState.count !== 0 && likeState.count} </span>
        <span> 조회 {views}</span>
      </div>
      <div className="flex h-[1.5625rem] items-center gap-1">
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="좋아요"
          type="button"
          aria-label="좋아요"
          onClick={handleLike}
          className="rounded-full p-1.5 transition-colors duration-200 hover:bg-gray-100"
        >
          <svg
            width="16"
            height="15"
            role="img"
            className={`transition-colors duration-200 ${
              likeState.isLiked ? 'text-mainblue' : 'text-gray-200'
            }`}
            aria-hidden="true"
          >
            <use width="16" height="15" href="/assets/sprite-sheet.svg#heart" />
          </svg>
        </button>
        <Link
          to={`/post/${postId}/comments`}
          data-tooltip-id="my-tooltip"
          data-tooltip-content="댓글"
          type="button"
          aria-label="댓글 보기"
          className="rounded-full p-1.5 transition-colors duration-200 hover:bg-gray-100"
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
          onClick={handleSave}
          className="rounded-full p-1.5 transition-colors duration-200 hover:bg-gray-100"
        >
          <svg
            width="15"
            height="17"
            viewBox="0 0 15 17"
            role="img"
            className={`transition-colors duration-200 ${
              isSaved ? 'text-mainblue' : 'text-gray-200'
            }`}
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
          onClick={handleShare}
          className="rounded-full p-1.5 transition-colors duration-200 hover:bg-gray-100"
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
              width="15"
              height="17"
              href="/assets/sprite-sheet.svg#share2"
            />
          </svg>
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

export default memo(PostActionBar);
