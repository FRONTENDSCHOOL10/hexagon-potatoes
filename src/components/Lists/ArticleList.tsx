// 데이터 가져오기
import Article from './Article';

const ArticleList = ({ data }) => {
  // 헤딩 아이디랑 ul을 aria-labelledby 연결하고 싶음.
  return (
    <ul className="flex flex-col gap-y-3">
      가져온 데이터 전달
      {data.map((d) => (
        <Article key={} props={} />
      ))}
    </ul>
  );
};

export default ArticleList;
