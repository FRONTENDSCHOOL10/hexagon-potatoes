import getPartyByKeyword from '@/api/getPartyByKeyword';
import PartyArticleList from '@/components/Lists/PartyArticleList';
import getLastPath from '@/utils/getLastPath';
import { useState, useEffect } from 'react';
interface PartyItem {
  type?: 'party' | 'tip';
  party_name: string;
  partyImg: string;
  party_about: string;
  leader_photo: string;
  leader_nickname: string;
  id?: string;
}
const PartyListPage = () => {
  const [partyList, setPartyList] = useState<PartyItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const country = getLastPath();

  useEffect(() => {
    const fetchParties = async () => {
      try {
        const data = await getPartyByKeyword(country);
        setPartyList(data.items);
      } catch (err) {
        setError('파티 정보를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchParties();
  }, [country]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  const isHaveResult = partyList.length > 0;
  return (
    <div className="flex flex-col gap-3">
      {isHaveResult ? (
        <PartyArticleList data={partyList} />
      ) : (
        <span className="mt-3 flex flex-col items-center text-sub-2">
          <p className="mx-3 text-center text-heading-1 text-mainblue">
            ' {country} '
          </p>
          해당 나라에서 모집중인 파티가 없습니다!
        </span>
      )}
    </div>
  );
};

export default PartyListPage;
