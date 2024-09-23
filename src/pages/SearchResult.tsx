import { useState, useEffect } from 'react';
import PartyArticleList from '@/components/Lists/PartyArticleList';
import getPartyByKeyword from '@/api/getPartyByKeyword';
import getLastPath from '@/utils/getLastPath';
import { Helmet } from 'react-helmet-async';
import { Skeleton } from '@/components/LoadingSpinner';

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

  if (loading) {
    return <Skeleton className="h-32 w-full" />;
  }
  if (error) return <p>{error}</p>;

  const isHaveResult = partyList.length > 0;

  return (
    <>
      <Helmet>
        <title>{`${keyword}에 대한 검색 결과 | Shipmate`}</title>
        <meta
          name="description"
          content={`${keyword}에 대한 검색 결과입니다. 다양한 파티 정보를 확인해보세요.`}
        />
        <meta name="keywords" content={`${keyword}, 파티, 해외직구, 쇼핑`} />
        <meta
          property="og:title"
          content={`${keyword}에 대한 검색 결과 | Shipmate`}
        />
        <meta
          property="og:description"
          content={`${keyword}에 대한 검색 결과입니다. 다양한 파티 정보를 확인해보세요.`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://sheepmate.netlify.app/home/search/${keyword}`}
        />{' '}
        <meta
          property="og:image"
          content="https://cdn.discordapp.com/attachments/1044545035221352531/1287620951554527324/landing_1.png?ex=66f235f5&is=66f0e475&hm=143d17f0a2bdb88e9772825fab5b924e2cc2fdea9167cbe4dcc1bc82344d4b76&"
        />{' '}
      </Helmet>

      <div className="flex flex-col gap-3">
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
    </>
  );
};

export default SearchResult;
