import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StandardInput from '@/components/Inputs/StandardInput';
import AddressInput from '@/components/Inputs/AddressInput';
import UserNameInput from '@/components/Inputs/UserNameInput';
import ItemsList from '@/components/Lists/ItemList';
import Payment from '@/components/Payment/Payment';
import Button from '@/components/Buttons/Button';

// useParams로 주소의 파티글 아이디값 빼오기

const data = [
  {
    nickname: '주비',
    item_photo: '',
    item_name: '유리잔',
    category: '생활용품',
    item_weight: 0.3,
    item_size: '4x15',
  },
  {
    nickname: '소현',
    item_photo: '',
    item_name: '향수',
    category: '미용',
    item_weight: 0.3,
    item_size: '6x8',
  },
  {
    nickname: '재명',
    item_photo: '',
    item_name: '인형',
    category: '인형',
    item_weight: 0.3,
    item_size: '8x21',
  },
  {
    nickname: '진',
    item_photo: '',
    item_name: '헤드셋',
    category: '음향기기',
    item_weight: 0.8,
    item_size: '30x25',
  },
];

const partyData = {
  party_leader: 465132156,
};

const loginUserData = {
  loginUserId: 465132156,
};

const leaderData = {
  name: '',
  address: '',
  detail_address: '',
  personal_code: '',
};

const OrderDetailPage = () => {
  const [formData, setFormData] = useState(leaderData);
  const [isActive, setIsActive] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const navigate = useNavigate();
  // 현재 이 파티의 리더아이디와 로그인한 사용자 아이디가 일치하는지 확인
  const handleClickPaymentBtn = () => {
    // 결제 페이지로 이동
    navigate('/');
  };

  const checkInputFilled = (data: typeof formData) => {
    // 모든 인풋이 채워져 있는지 확인
    const isFilled = Object.values(data).every(
      (d) => d !== undefined && d !== null && d !== ''
    );
    setIsActive(isFilled);
  };

  const handleChangeInput = (inputName: string) => (value: string | number) => {
    // 데이터 받아와서 업데이트
    const updatedData = { ...formData, [inputName]: value };
    setFormData(updatedData);
    checkInputFilled(updatedData);
  };

  const handleValidChange = (valid: boolean) => {
    setIsValid(valid);
  };

  return (
    <section className="flex flex-col gap-y-3">
      <h1>주문 상세 페이지</h1>

      <UserNameInput
        inputName="name"
        onUserNameChange={handleChangeInput}
        defaultValue={leaderData.name}
        onValidChange={handleValidChange}
        isValid={isValid}
      />
      <AddressInput
        addressInputName="address"
        detailAddressInputName="detail_address"
        onAddressChange={handleChangeInput}
        // defaultAddressVal={leaderData.address}
        // defaultDetailAddressVal={leaderData.detail_address}
      />
      {partyData.party_leader === loginUserData.loginUserId && (
        <>
          <StandardInput
            type="number"
            inputLabel="개인통관고유부호"
            placeholder="개인통관고유부호"
            inputName="personal_code"
            // defaultValue={leaderData.personal_code}
            onInputChange={handleChangeInput}
          />
          {/* <ItemsList data={data} /> */}
        </>
      )}
      <Payment />
      <Button
        type="submit"
        buttonContent="최종 결제하기"
        isActive={isActive}
        onClick={handleClickPaymentBtn}
      />
    </section>
  );
};

export default OrderDetailPage;
