const MypageNoticeList = ({ title, items }) => {
  return (
    <div className="p-4 space-y-8 w-[22.5rem]">
      <div>
        <h2 className="text-[1rem] font-bold mb-2">{title}</h2>
        <ul className="space-y-2 text-[0.875rem]">
          {items.map((item, index) => (
            <li key={index}>
              <a href="#" className="hover:text-mainblue cursor-pointer">{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MypageNoticeList;
