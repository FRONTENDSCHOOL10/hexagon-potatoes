import formatCurrency from '@/utils/currencyFormat';
import { ReactNode } from 'react';

interface PropsType {
  title: string;
  children: ReactNode;
}

const PartyInfo = ({ title, children }: PropsType): JSX.Element => {
  return (
    <li className="flex items-start justify-between border-b border-[#CAD4E7] px-[0] py-[0.625rem] text-sm font-light not-italic leading-[1.5rem] text-[#000]">
      <span> {title}</span>
      <span>{children}</span>
    </li>
  );
};

export default PartyInfo;
