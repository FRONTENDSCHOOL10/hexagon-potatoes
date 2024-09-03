// 데이터 가져오기
import Articles from './Articles';

const ArticleList = () => {
  return (
    <ul>
      <li>
        {/* 가져온 데이터 전달 */}
        <Articles props={} />
      </li>
    </ul>
  );
};

export default ArticleList;
