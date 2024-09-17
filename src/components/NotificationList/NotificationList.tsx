import { Link } from 'react-router-dom';
import DefaultProfileSVG from '@/components/DefaultProfileSVG/DefaultProfileSVG';
import formatRelativeTime from '@/utils/formatRelativeTime';

interface PropTypes {
  id: string;
  type: 'paymentRequest' | 'joined' | 'delivery';
  name?: string;
  handleDelete: (id: string) => void;
  isChecked: boolean;
  time: string;
}

interface NotificationTypeIcon {
  icon: JSX.Element;
  msg: string;
  path: string;
}

interface NotificationType {
  paymentRequest: NotificationTypeIcon;
  joined: NotificationTypeIcon;
  delivery: NotificationTypeIcon;
}

const NotificationList = ({
  id,
  type,
  name,
  time,
  handleDelete,
  isChecked,
}: PropTypes) => {
  const commonClasses: string =
    'flex min-h-[3.5rem] w-[21rem] items-start border-b border-gray-200 pb-3 [list-style:none]';
  const bgColor: string = isChecked
    ? `${commonClasses} bg-slate-100`
    : commonClasses;

  const notificationType: NotificationType = {
    paymentRequest: {
      icon: (
        <svg
          role="img"
          className="h-[1.4375rem] w-[1.4375rem] fill-current text-gray-100"
          viewBox="0 0 23 23 "
          aria-hidden="true"
        >
          <use href="/assets/sprite-sheet.svg#collect" />
        </svg>
      ),
      msg: '파티 모집 완료! 추가 정보를 입력하시고 결제를 진행해주세요.',
      path: `/home/orderDetail/${id}`,
    },
    joined: {
      icon: <DefaultProfileSVG size={40} />,
      msg: '파티 참여 완료! 참여한 파티를 확인해보세요.',
      path: `/home/party/${id}`,
    },
    delivery: {
      icon: (
        <svg
          role="img"
          className="h-[1.3125rem] w-[1.3125rem] text-gray-100"
          viewBox="0 0 21 21"
          aria-hidden="true"
        >
          <use href="/assets/sprite-sheet.svg#box" />
        </svg>
      ),
      msg: `"${name}" 파티의 배송 현황을 확인하세요.`,
      path: `/home/party/${id}`,
    },
  };

  return (
    <li className={bgColor}>
      <Link to={notificationType[type].path} className="flex flex-grow gap-3">
        <div className="flex h-[2.5rem] min-w-[2.5rem] items-center justify-center rounded-full bg-gray-200">
          {notificationType[type].icon}
        </div>
        <div className="pretendard flex flex-col items-start">
          <span className="text-[0.875rem] font-normal leading-5">
            {notificationType[type].msg}
          </span>
          <span className="text-[0.75rem] font-normal leading-4 text-gray-500">
            {formatRelativeTime(time)}
          </span>
        </div>
      </Link>
      <button
        type="button"
        onClick={() => {
          handleDelete(id);
        }}
        className="p-1 pb-2 pl-2"
        aria-label="알림삭제"
      >
        <svg
          role="img"
          width="0.8125rem"
          height="0.8125rem"
          className="text-gray-200"
          viewBox="0 0 13 13"
          aria-hidden="true"
        >
          <use
            width="0.8125rem"
            height="0.8125rem"
            href="/assets/sprite-sheet.svg#x"
          />
        </svg>
      </button>
    </li>
  );
};

export default NotificationList;
