import React, { useEffect, useState } from 'react';

const MyprofileFollower = () => {
  const [followers, setFollowers] = useState<number>(0);
  const [following, setFollowing] = useState<number>(0);
  const [rating, setRating] = useState<string>('0.0');

  useEffect(() => {
    const storedFollowers = localStorage.getItem('user_followers');
    const storedFollowing = localStorage.getItem('user_following');
    const storedRating = localStorage.getItem('user_rating');

    if (storedFollowers && storedFollowing && storedRating) {
      setFollowers(Number(storedFollowers));
      setFollowing(Number(storedFollowing));
      setRating(storedRating);
    } else {
      const randomFollowers = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
      const randomFollowing = Math.floor(Math.random() * (200 - 50 + 1)) + 50;
      const randomRating = (Math.random() * (5.0 - 3.0) + 3.0).toFixed(1);

      setFollowers(randomFollowers);
      setFollowing(randomFollowing);
      setRating(randomRating);

      localStorage.setItem('user_followers', randomFollowers.toString());
      localStorage.setItem('user_following', randomFollowing.toString());
      localStorage.setItem('user_rating', randomRating);
    }
  }, []);

  return (
    <div className="flex justify-around items-center bg-white py-4">
      <div className="flex flex-col items-center">
        <span className="">평점</span>
        <div className="flex items-center">
          <span className="">{rating}</span>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <span className="">팔로워</span>
        <span className="">{followers}</span>
      </div>

      <div className="flex flex-col items-center">
        <span className="">팔로잉</span>
        <span className="">{following}</span>
      </div>
    </div>
  );
};

export default MyprofileFollower;
