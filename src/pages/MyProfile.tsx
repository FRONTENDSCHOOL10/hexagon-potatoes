import React, { useEffect, useState } from 'react';
import NameCard from '@/components/NameCard/NameCard';
import MyprofileFollwer from '@/components/MyprofileFollower/MyprofileFollower';
import PartyArticleList from '@/components/Lists/PartyArticleList';
import SquarePostingCard from '@/components/PostingCard/SquarePostingCard';
import getPbImageURL from '@/utils/getPbImageURL';
import pb from '@/utils/pocketbase';

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
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const url = `${pb.baseUrl}`; 

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        console.log('Fetching profile data...');
        setLoading(true);
        setError(null);

        pb.autoCancellation(false);

        const profileResponse = await pb.collection('users').getList<ProfileType>(1, 1);
        console.log('Profile Response:', profileResponse);
        if (profileResponse.items.length > 0) {
          setProfile(profileResponse.items[0]);
        } else {
          setError('No profile data found. Please check if the "users" collection has records.');
        }

        const postsResponse = await pb.collection('posting').getList<PostType>(1, 50);
        console.log('Posting Response:', postsResponse);
        setPosts(postsResponse.items);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(`데이터를 가져오는 중 문제가 발생했습니다: ${err.message}`); 
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  const renderProfileHeader = () =>
    profile && (
      <NameCard
        name={profile.nickname}
        subtext={profile.user_desc}
        profileImg={profile.profile_photo ? getPbImageURL(url, profile, 'profile_photo') : ''}
        type="editProfile"
        id={profile.id}
      />
    );

  const renderPartyList = () =>
    parties.length > 0 ? <PartyArticleList data={parties} /> : <p>No parties available.</p>;

  const renderPosts = () => (
    <ul className="grid grid-cols-3 gap-4">
      {posts.length > 0 ? (
        posts.map((post) => <SquarePostingCard key={post.id} data={post} />)
      ) : (
        <p>No posts available.</p>
      )}
    </ul>
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4 space-y-4">
      {renderProfileHeader()}
      <MyprofileFollwer />
      <section className="mt-4">
        <h2 className="text-xl font-bold">내 파티 목록</h2>
        {renderPartyList()}
      </section>
      <section className="mt-4">
        <h2 className="text-xl font-bold">내 게시물</h2>
        {renderPosts()}
      </section>
    </div>
  );
};

export default MyProfile;
