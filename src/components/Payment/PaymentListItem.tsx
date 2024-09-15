import formatCurrency from '@/utils/currencyFormat';

interface PropTypes {
  price: number;
  children: string;
}

const PaymentListItem = ({ price, children }: PropTypes) => {
  // const formatCurrency = formatCurrency();
  return (
    <div className="flex items-start justify-between border-b border-[#CAD4E7] px-[0] py-[0.625rem] text-sm font-light not-italic leading-[1.5rem] text-[#000]">
      <dt>{children}</dt>
      <dd>{formatCurrency(price)} 원</dd>
    </div>
  );
};

export default PaymentListItem;
