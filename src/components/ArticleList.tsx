// 데이터 가져오기
import Articles from './Articles';

const ArticleList = () => {
  return (
    <ul>
        {/* 가져온 데이터 전달 */}
        <Articles props={} />
    </ul>
  );
};

export default ArticleList;
