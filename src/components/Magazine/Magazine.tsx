import { Link } from 'react-router-dom';

interface PropTypes {
  title: string;
  label?: string;
  content: string;
  img: string;
  id: string;
}

const Magazine = ({ id, title, label, content, img }: PropTypes) => {
  const labelStyle = (label: any) => {
    switch (label) {
      case '이벤트':
        return 'absolute left-3 top-3 z-10 rounded-lg  px-2 py-1 text-caption text-white bg-mainblue';
      case '공지사항':
        return 'absolute left-3 top-3 z-10 rounded-lg  px-2 py-1 text-caption bg-maingreen text-mainblue';
      default:
        return 'absolute left-3 top-3 z-10 rounded-lg  px-2 py-1 text-caption text-white bg-mainblue';
    }
  };
  return (
    <Link
      to={`/home/community/magazine/${id}`}
      style={{
        background: `url(${img}) center /cover no-repeat`,
      }}
      className="relative flex h-[14.5625rem] w-[10rem] flex-col overflow-hidden rounded-xl"
    >
      <div
        style={{
          background: '#27272780',
          position: 'absolute',
          top: 160,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      ></div>
      {label && <span className={labelStyle(label)}>{label}</span>}

      <div className="bg absolute bottom-0 z-10 flex w-full flex-grow flex-col justify-end p-2.5 text-white">
        <h3 className="mb-1 overflow-hidden whitespace-nowrap text-xl font-bold">
          {title}
        </h3>
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-caption text-sm leading-tight">
          {content}
        </p>
      </div>
    </Link>
  );
};

export default Magazine;
