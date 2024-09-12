interface PropTypes {
  title?: string;
  label: string;
  content: string;
  img?: string;
}

const Magazine = ({ title, label, content, img }: PropTypes) => {
  return (
    <article
      style={{ background: `url(${img}) lightgray 50% / cover no-repeat` }}
      className="flex h-[233px] w-[152px] flex-col items-start rounded-[12px] py-[10px] pl-[12px] pr-[12px] font-[Pretendard] font-normal not-italic"
    >
      <span className="mb-[150px] flex h-[18px] w-[41px] items-center justify-center rounded-[7px] bg-[#FFF] text-center text-xs">
        {label}
      </span>
      <h3 className="mb-[4px] text-xl">{title}</h3>
      <p className="text-xs">{content}</p>
    </article>
  );
};

export default Magazine;
