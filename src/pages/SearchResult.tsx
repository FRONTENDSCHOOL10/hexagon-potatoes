import { useState, useEffect } from 'react';
import PartyArticleList from '@/components/Lists/PartyArticleList'; // ArticleList의 경로는 실제 경로로 수정하세요
import getPartyByKeyword from '@/api/getPartyByKeyword'; // getPartyByKeyword의 경로는 실제 경로로 수정하세요
import getLastPath from '@/utils/getLastPath';

interface PartyItem {
  type?: 'party' | 'tip';
  party_name: string;
  partyImg: string;
  party_about: string;
  leader_photo: string;
  leader_nickname: string;
  id?: string;
}
const SearchResult = () => {
  const [partyList, setPartyList] = useState<PartyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const keyword = getLastPath();

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const data = await getPartyByKeyword(keyword);
        setPartyList(data.items);
      } catch (err) {
        setError('파티 정보를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, [keyword]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  const isHaveResult = partyList.length > 0;

  return (
    <div className="flex flex-col gap-3">
      {/* <h1 className="">{keyword} 검색 결과</h1> */}
      {isHaveResult ? (
        <PartyArticleList data={partyList} />
      ) : (
        <span className="mt-3 flex flex-col items-center text-sub-2">
          <p className="mx-3 text-center text-heading-1 text-mainblue">
            ' {keyword} '
          </p>
          검색 결과가 없습니다.
        </span>
      )}
    </div>
  );
};

export default SearchResult;
