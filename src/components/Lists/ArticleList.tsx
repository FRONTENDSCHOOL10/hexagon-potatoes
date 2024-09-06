// 데이터 가져오기
import Articles from './Articles';

const ArticleList = () => {
  // 헤딩 아이디랑 ul을 aria-labelledby 연결하고 싶음.
  return (
    <ul>
        {/* 가져온 데이터 전달 */}
        <Articles props={} />
    </ul>
  );
};

export default ArticleList;
