import StandardInput from '@/components/Inputs/StandardInput';
import AddressInput from '@/components/Inputs/AddressInput';
import Button from '@/components/Buttons/Button';

const JoinPartyPage = () => {
  const handleClickCreatePartyBtn = () => {};

  return (
    <section className="flex flex-col gap-y-3">
      <h1>파티 참여 페이지</h1>
      <div className="text-sub-2">
        구매 상품 사진
        <span>
          상품과 무관한 사진을 첨부하면 노출 제한 처리될 수 있습니다. 사진첨부
          시 개인정보가 노출되지 않도록 유의해주세요.
        </span>
      </div>
      {/* 이미지 첨부 삭제, multiple */}
      <StandardInput inputLabel="구매 상품명" placeholder="상품 이름" />
      <StandardInput inputLabel="상품 가격" placeholder="상품 가격" />
      <StandardInput inputLabel="카테고리" placeholder="카테고리" />
      <StandardInput inputLabel="상품 무게" placeholder="상품 무게" />
      <StandardInput inputLabel="상품 사이즈" placeholder="상품 사이즈" />
      <StandardInput inputLabel="상품 링크" placeholder="상품 링크" />
      <AddressInput />
      <Button
        buttonContent="파티 생성하기"
        isActive
        onClick={handleClickCreatePartyBtn}
      />
    </section>
  );
};

export default JoinPartyPage;
