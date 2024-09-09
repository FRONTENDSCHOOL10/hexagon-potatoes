import { useParams, useNavigate } from 'react-router-dom';
import StandardInput from '@/components/Inputs/StandardInput';
import AddressInput from '@/components/Inputs/AddressInput';
import NicknameInput from '@/components/Inputs/NickNameInput';
import ItemsList from '@/components/Lists/ItemList';
import Payment from '@/components/Payment/Payment';
import Button from '@/components/Buttons/Button';

// useParams로 주소의 파티글 아이디값 빼오기

const partyData = {
  party_leader: 465132156,
};

const loginUserData = {
  loginUserId: 465132156,
};

const OrderDetailPage = () => {
  const navigate = useNavigate();
  // 현재 이 파티의 리더아이디와 로그인한 사용자 아이디가 일치하는지 확인
  const handleClickPaymentBtn = () => {
    // 결제 페이지로 이동
    navigate('/');
  };

  return (
    <section className="flex flex-col gap-y-3">
      <h1>주문 상세 페이지</h1>

      <NicknameInput />
      <AddressInput />
      {partyData.party_leader === loginUserData.loginUserId && (
        <>
          <StandardInput
            inputLabel="개인통관고유부호"
            placeholder="개인통관고유부호"
          />
          {/* <ItemsList /> */}
        </>
      )}
      <Payment />
      <Button
        buttonContent="최종 결제하기"
        isActive
        onClick={handleClickPaymentBtn}
      />
    </section>
  );
};

export default OrderDetailPage;
