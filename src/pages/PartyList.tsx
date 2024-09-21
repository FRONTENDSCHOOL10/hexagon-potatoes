import getPartyByKeyword from '@/api/getPartyByKeyword';
import PartyArticleList from '@/components/Lists/PartyArticleList';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import getLastPath from '@/utils/getLastPath';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
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

  if (loading) {
    return <LoadingSpinner className="h-28 w-full" />;
  }

  if (error) return <p>{error}</p>;

  const isHaveResult = partyList.length > 0;
  return (
    <>
      <Helmet>
        <title>{`${country} 파티 목록 | Shipmate`}</title>
        <meta
          name="description"
          content={`'${country}'에서 모집 중인 파티 목록을 확인하세요.`}
        />
        <meta
          name="keywords"
          content={`파티, ${country}, 해외 직구, 직구, 쇼핑`}
        />
      </Helmet>
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
    </>
  );
};

export default PartyListPage;
