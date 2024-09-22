import Alert from '@/components/Alert/Alert';
import Button from '@/components/Buttons/Button';
import Card from '@/components/Payment/Card';
import Payment from '@/components/Payment/Payment';
import useFetch from '@/hooks/useFetch';
import pb from '@/utils/pocketbase';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

interface PropTypes {
  productPrice: number;
  shippingFee: number;
  customsDuties: number;
}

const PaymentDetail = ({}: PropTypes) => {
  const { partyMemberId } = useParams<{ partyMemberId: string }>();
  const [showModal, setShowModal] = useState(false);
  const url = `${pb.baseUrl}api/collections/party_member/records/${partyMemberId}`;

  const { data, error, status } = useFetch(url);
  const productPrice = data?.item_price;

  // 여긴 추가적으로 채워줘야됌
  const shippingFee = 0;
  const customsDuties = 0;

  const navigate = useNavigate();

  const handleOnclick = () => {
    setShowModal(true);
  };
  const handleOnClose = () => {
    console.log('결제완료');
    navigate('/home');
    // 결제완료 페이지로 연결해야될듯
  };

  if (status !== 'success') return null;

  return (
    <>
      <section className="mb-3 ml-3 mt-3 flex h-[13.1rem] flex-col">
        <h2 className="pretendard mb-[0.62rem] text-[1rem] font-normal not-italic leading-6">
          결제 카드
        </h2>
        <Card />
      </section>
      <section className="flex flex-col gap-3 pb-16 pl-3 pr-3 pt-3">
        <Payment
          productPrice={productPrice}
          shippingFee={shippingFee}
          customsDuties={customsDuties}
        />
        <Button
          type="button"
          onClick={handleOnclick}
          buttonContent={'결제하기'}
          isActive={true}
        />
        {showModal && (
          <Alert
            type={'notice'}
            title={'결제가 완료 됐어요!'}
            subtext={'상세페이지에서 구매 내역을 확인할 수 있어요.'}
            onClose={handleOnClose}
          />
        )}
      </section>
    </>
  );
};

export default PaymentDetail;
