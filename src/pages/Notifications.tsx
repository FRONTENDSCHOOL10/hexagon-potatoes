import NotificationList from '@/components/NotificationList/NotificationList';

const data: {
  id: string;
  name?: string;
  time: string;
  isChecked: boolean;
  type: 'paymentRequest' | 'joined' | 'delivery';
}[] = [
  {
    id: 'dsaf332',
    type: 'paymentRequest',
    name: '같이사요',
    time: '2024-09-15 12:42:23.613Z',
    isChecked: true,
  },
  {
    id: 'dskkk33',
    type: 'joined',
    time: '2024-09-11 10:58:54.484Z',
    isChecked: false,
  },
  {
    id: 'adlajj39',
    type: 'delivery',
    name: '함께하는 직구',
    time: '2024-09-15T07:38:21Z',
    isChecked: true,
  },
];

const Notifications = ({}) => {
  const handleDelete = (id: string) => {
    console.log(`${id}삭제`);
  };
  // 삭제 로직은 생각해봐야될듯 Notifications 데이터 useState로 관리해서 삭제한 id의 객체 삭제 하면 될듯..?
  return (
    <ul className="flex flex-col gap-3 p-3">
      {data.map((item) => (
        <NotificationList
          key={item.id}
          id={item.id}
          type={item.type}
          name={item.name}
          handleDelete={handleDelete}
          time={item.time}
          isChecked={item.isChecked}
        />
      ))}
    </ul>
  );
};

export default Notifications;
