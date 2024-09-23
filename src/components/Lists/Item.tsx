import getPbImageURL from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';

const Item = ({ data }) => {
  return (
    <li className="flex list-none flex-row items-center gap-3 border-b border-b-gray-100 p-2 leading-normal">
      <img
        src={getPbImageURL(pb.baseUrl, data, 'item_photo')}
        alt={data.item_name}
        className="size-20"
      />
      <div className="flex flex-col" aria-label="주문 물품 상세" role="group">
        <span aria-label="주문자명" className="text-sub-1">
          {data.nickname}
        </span>
        <span aria-label="물품 이름 및 카테고리" className="text-sub-2">
          {data.item_name} / {data.item_category}
        </span>
        <span aria-label="물품 무게" className="text-sub-2">
          {data.item_weight}g
        </span>
        <span aria-label="물품 크기" className="text-sub-2">
          {data.item_size}
        </span>
      </div>
    </li>
  );
};

export default Item;
