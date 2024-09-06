// 데이터 가져오기
import Articles from './Article';

const ArticleList = () => {
  // 헤딩 아이디랑 ul을 aria-labelledby 연결하고 싶음.
  return (
    <ul>
      {/* 가져온 데이터 전달 */}
      {data.map((d) => (
        <Articles key={} props={} />
      ))}
    </ul>
  );
};

export default ArticleList;
