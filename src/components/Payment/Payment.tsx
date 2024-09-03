import formatCurrency from '@/utils/useCurrencyFormat';
import PaymentListItem from './PaymentListItem';

interface paymentProp {
  productPrice: number;
  shippingFee: number;
  customsDuties: number;
}

function Payment({ productPrice, shippingFee, customsDuties }: paymentProp) {
  // const formatCurrency = useCurrencyFormat();

  return (
    <section className="w-full flex flex-col  text-[#000] text-base not-italic font-bold leading-[24px]">
      <h2 className="[border-bottom:2px_solid_#020715] font-normal px-[0] py-[10px] justify-center items-start">
        결제내용
      </h2>
      <ul>
        <PaymentListItem price={productPrice}>상품금액</PaymentListItem>
        <PaymentListItem price={shippingFee}>배송비</PaymentListItem>
        <PaymentListItem price={customsDuties}>관세</PaymentListItem>
        <PaymentListItem price={1000}>수수료</PaymentListItem>
      </ul>
      <div className="[border-bottom:2px_solid_#020715] px-[0] py-[10px] flex justify-between items-start">
        <span>결제 금액</span>
        <strong>
          {formatCurrency(productPrice + shippingFee + customsDuties)} 원
        </strong>
      </div>
    </section>
  );
}

export default Payment;
