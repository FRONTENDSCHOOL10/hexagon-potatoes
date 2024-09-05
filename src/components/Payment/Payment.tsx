import formatCurrency from '@/utils/currencyFormat';
import PaymentListItem from './PaymentListItem';

interface paymentProp {
  productPrice: number;
  shippingFee: number;
  customsDuties: number;
}

//
const COMMISSION = 1000;

const Payment = ({
  productPrice,
  shippingFee,
  customsDuties,
}: paymentProp): JSX.Element => {
  return (
    <section className="flex w-full flex-col text-base font-bold not-italic leading-[1.5rem] text-[#000]">
      <h2 className="items-start justify-center border-b-2 border-[#020715] px-[0] py-[0.625rem] font-normal">
        결제내용
      </h2>
      <ul>
        <PaymentListItem price={productPrice}>상품금액</PaymentListItem>
        <PaymentListItem price={shippingFee}>배송비</PaymentListItem>
        <PaymentListItem price={customsDuties}>관세</PaymentListItem>
        <PaymentListItem price={COMMISSION}>수수료</PaymentListItem>
      </ul>
      <div className="flex items-start justify-between border-b-2 border-[#020715] px-[0] py-[0.625rem]">
        <span>결제 금액</span>
        <strong>
          {formatCurrency(
            productPrice + shippingFee + customsDuties + COMMISSION
          )}{' '}
          원
        </strong>
      </div>
    </section>
  );
};

export default Payment;
