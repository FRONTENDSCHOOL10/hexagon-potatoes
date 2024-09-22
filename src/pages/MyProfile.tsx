import { useEffect, useState } from 'react';
import NameCard from '@/components/NameCard/NameCard';
import MyprofileFollower from '@/components/MyprofileFollower/MyprofileFollower';
import PartyArticleList from '@/components/Lists/PartyArticleList';
import SquarePostingCard from '@/components/PostingCard/SquarePostingCard';
import getPbImageURL from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';
import getUserById from '@/api/getUserById';
import axios from 'axios';
import { Skeleton } from '@/components/LoadingSpinner';
import getAllPartyByUserId from '@/api/getAllPartyByUserId';

interface PocketBaseRecord {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  [key: string]: any;
}

interface ProfileType extends PocketBaseRecord {
  profile_photo: string;
  nickname: string;
  user_email: string;
}

interface PostType extends PocketBaseRecord {
  author_id: string;
  photo: string;
  content: string;
  tag: string;
  like: number;
}

const MyProfile = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [parties, setParties] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const url = `${pb.baseUrl}`;

  useEffect(() => {
    // 프로필 데이터 가져오기
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        setError(null);

        const localUserId = localStorage.getItem('authId') ?? '아이디없음';
        const userResponse = await getUserById(localUserId);
        if (userResponse) {
          setProfile(userResponse);
          await fetchPosts(userResponse.id);
          await fetchPartyData(userResponse.nickname);
        } else {
          setError('유저 정보가 없습니다');
        }
      } catch (err: any) {
        setError(`데이터를 가져오는 중 문제가 발생했습니다: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    const fetchPosts = async (userId: string) => {
      try {
        const response = await axios.get(
          `${pb.baseUrl}api/collections/posting/records`,
          {
            params: {
              filter: `author_id='${userId}'`,
            },
          }
        );
        setPosts(response.data.items);
      } catch (err: any) {
        setError(`게시물을 가져오는 중 문제가 발생했습니다: ${err.message}`);
      }
    };

    const fetchPartyData = async (nickname: string) => {
      try {
        const partyData = await getAllPartyByUserId(nickname);
        if (partyData) {
          setParties(partyData.items);
        } else {
          setError('파티 정보를 가져오는 데 문제가 발생했습니다.');
        }
      } catch (err: any) {
        setError(
          `파티 데이터를 가져오는 중 문제가 발생했습니다: ${err.message}`
        );
      }
    };

    fetchProfileData();
  }, []);

  const renderProfileHeader = () =>
    profile && (
      <NameCard
        name={profile.nickname}
        subtext={profile.user_desc || '소개가 없습니다.'}
        profileImg={profile.profile_photo}
        type="editProfile"
        id={profile.id}
      />
    );

  const renderPartyList = () => {
    return parties.length > 0 ? (
      <PartyArticleList data={parties} />
    ) : (
      <p className="text-gray-300 text-sub-2">파티가 없습니다.</p>
    );
  };

  const renderPosts = () => (
    <ul className="grid grid-cols-3 gap-4">
      {posts.length > 0 ? (
        posts.map((post) => <SquarePostingCard key={post.id} data={post} />)
      ) : (
        <p className="text-gray-300 text-sub-2">게시물이 없습니다.</p>
      )}
    </ul>
  );

  if (loading) {
    return <Skeleton className="h-72 w-full" />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="space-y-4 p-4">
      {renderProfileHeader()}
      <MyprofileFollower />
      <section className="mt-4">
        <h2 className="text-h3 text-black font-semibold pb-3">내 파티 목록</h2>
        {renderPartyList()}
      </section>
      <section className="mt-4">
        <h2 className="text-h3 text-black font-semibold pb-3">내 게시물</h2>
        {renderPosts()}
      </section>
    </div>
  );
};

export default MyProfile;
