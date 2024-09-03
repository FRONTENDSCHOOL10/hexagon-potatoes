import formatCurrency from '@/utils/useCurrencyFormat';

interface PaymentListItemProp {
  price: number;
  children: string;
}

const PaymentListItem = ({
  price,
  children,
}: PaymentListItemProp): JSX.Element => {
  // const formatCurrency = formatCurrency();
  return (
    <li className=" border-b border-[#CAD4E7] px-[0] py-[10px] flex justify-between items-start  text-[#000] text-sm not-italic font-light leading-[24px]">
      <span>{children}</span>
      <span>{formatCurrency(price)} 원</span>
    </li>
  );
};

export default PaymentListItem;
