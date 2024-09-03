import formatCurrency from '@/utils/useCurrencyFormat';

interface PaymentListItemProp {
  price: number;
  children: string;
}

function PaymentListItem({ price, children }: PaymentListItemProp) {
  // const formatCurrency = formatCurrency();
  return (
    <li className=" [border-bottom:1px_solid_#CAD4E7] px-[0] py-[10px] flex justify-between items-start  text-[#000] text-sm not-italic font-light leading-[24px]">
      <span>{children}</span>
      <span>{formatCurrency(price)} 원</span>
    </li>
  );
}

export default PaymentListItem;
