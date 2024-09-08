import { Tooltip } from 'react-tooltip';
import getPbImageURL from '@/utils/getPbImageURL';

interface PocketBaseRecord {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  [key: string]: any;
}

// InstaPosting 아이템의 타입 정의
interface InstaPostingItem extends PocketBaseRecord {
  photo: string;
  content: string;
  // 필요한 경우 여기에 추가 필드를 정의할 수 있습니다.
  // 예: author_id: string;
}

// 컴포넌트 props 타입 정의
interface InstaPostingProp {
  item: InstaPostingItem;
}

function InstaPosting({ item }: InstaPostingProp) {
  const ENDPOINT = 'https://hexagon-potatoes.pockethost.io/';
  if (!item) return null;
  return (
    <article className="flex flex-col gap-3 p-3">
      {/* 프로필 부분 여기는 나중에 주비님이 작업하신 내용 참고해서 바꿀 예정 */}
      <div className="h-[2.5rem] w-[21rem]"></div>
      {item.photo && (
        <img
          className="h-[20.9rem] w-[21rem] bg-[#F2F2F2] object-cover"
          src={getPbImageURL(ENDPOINT, item)}
          alt=""
        />
      )}
      <p className="w-[21rem] text-body-2">{item.content}</p>
      <ul className="flex h-[1.38rem] w-[21rem] items-start gap-3 self-stretch">
        {/* 여기도 라벨 컴포넌트 가져다가 쓰면됌 */}
      </ul>
      <div className="font-[Pretendard] text-[0.75rem] font-normal not-italic leading-[1.0625rem] text-[#626871]">
        <time dateTime="{}"> </time>
        {/* 좋아요, 조회수는 하드코딩으로 넣기 */}
        <span>좋아요 3 </span>
        <span> 조회 1,000</span>
      </div>

      {/* 여기도 컴포넌트로 분리예정 */}
      <div className="mb-[2.56rem] flex h-[1.5625rem] items-center gap-4">
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="좋아요"
          type="button"
          aria-label="좋아요"
        >
          <svg width="16" height="15" role="img" className="text-gray-200">
            <use width="16" height="15" href="/assets/sprite-sheet.svg#heart" />
          </svg>
        </button>
        <button
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
          >
            <use
              width="16"
              height="17"
              href="/assets/sprite-sheet.svg#comment"
            />
          </svg>
        </button>
        <button
          data-tooltip-id="my-tooltip"
          data-tooltip-content="북마크"
          type="button"
          aria-label="북마크"
        >
          <svg
            width="15"
            height="17"
            viewBox="0 0 15 17"
            role="img"
            className="text-gray-200"
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
        >
          <svg
            width="17"
            height="17"
            viewBox="0 0 17 17"
            role="img"
            className="text-gray-200"
          >
            <use
              width="17"
              height="17"
              href="/assets/sprite-sheet.svg#share2"
            />
          </svg>{' '}
        </button>
      </div>
      <Tooltip id="my-tooltip" />
    </article>
  );
}

export default InstaPosting;
