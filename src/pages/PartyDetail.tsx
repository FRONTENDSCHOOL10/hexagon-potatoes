import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosResponse } from 'axios';
import { Helmet } from 'react-helmet-async';
import pb from '@/utils/pocketbase';
import getPbImageURL from '@/utils/getPbImageURL';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useFetch from '@/hooks/useFetch';
import PartyLeader from '@/components/Lists/PartyLeader';
import PartyInfoList from '@/components/PartyInfo/PartyInfoList';
import Button from '@/components/Buttons/Button';
import PostingCard from '@/components/PostingCard/PostingCard';
import Standard from '@/components/Lists/Standard';
import Shipstate from '@/components/shipstate/Shipstate';

interface UserData {
  id: string;
  token: string;
  [key: string]: any;
}

const PartyDetail = () => {
  const [partyLeaderData, setPartyLeaderData] = useState<UserData | null>(null);
  const [loginUserData, setLoginUserData] = useState<string>('');
  const navigate = useNavigate();
  const { partyId } = useParams<{ partyId: string }>();
  const encodedFilter = encodeURIComponent(`(party_id='${partyId}')`);

  const {
    status: partyStatus,
    data: partyData,
    error: partyErr,
  } = useFetch(
    `${import.meta.env.VITE_PB_URL}api/collections/party/records/${partyId}`
  );

  const isCompleted =
    partyData?.member_ids?.length >= partyData?.target_members;

  const {
    status: postingStatus,
    data: postingData,
    error: postingErr,
  } = useFetch(
    `${import.meta.env.VITE_PB_URL}api/collections/party_member/records?filter=${encodedFilter}`,
    'member_id'
  );

  const {
    status: chatRoomStatus,
    data: chatRoomData,
    error: chatRoomErr,
  } = useFetch(
    `${import.meta.env.VITE_PB_URL}api/collections/chat/records?filter=${encodedFilter}`,
    'chat_member_id'
  );

  useEffect(() => {
    const fetchPartyLeader = async (): Promise<void> => {
      if (partyData) {
        try {
          const response = await axios.get<AxiosResponse>(
            `${import.meta.env.VITE_PB_URL}api/collections/users/records/${partyData.party_leader}`
          );
          setPartyLeaderData(response.data);
        } catch (err) {
          console.error(err);
        }
      }
    };
    fetchPartyLeader();
  }, [partyData]);

  useEffect(() => {
    const updatePartyData = async (): Promise<void> => {
      if (partyData && isCompleted) {
        try {
          await axios.patch<AxiosResponse>(
            `${import.meta.env.VITE_PB_URL}api/collections/party/records/${partyData.id}`,
            {
              party_status: 'completed',
            }
          );
        } catch (err) {
          console.error(err);
        }
      }
    };
    updatePartyData();
  }, [partyData, isCompleted]);

  useEffect(() => {
    const getAuthData = () => {
      const id = localStorage.getItem('authId');
      const token = localStorage.getItem('authToken');
      setLoginUserData({ id, token });
    };
    getAuthData();
  }, []);

  const handleClickJoinPartyBtn = () => {
    navigate('/home/JoinParty', { state: { partyId } });
  };

  const createChatRoomData = () => {
    const formData = new FormData();

    formData.append('party_id', partyId || '');
    formData.append('chat_member_id', partyLeaderData?.id);
    formData.append('chat_member_id', loginUserData.id);
    return formData;
  };

  const fetchChatRoom = async () => {
    try {
      const formData = createChatRoomData();
      const response = await axios.post(
        `${import.meta.env.VITE_PB_URL}api/collections/chat/records`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${loginUserData.token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickChatWithLeaderBtn = async () => {
    if (chatRoomData === null || chatRoomData.items.length === 0) {
      try {
        const { id } = await fetchChatRoom();
        navigate(`/home/chat/${id}`);
      } catch (error) {
        console.log(error);
      }
    } else {
      const chatRoom = chatRoomData?.items.find((d) =>
        d.chat_member_id.includes(partyLeaderData?.id, loginUserData.id)
      );
      navigate(`/home/chat/${chatRoom.id}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>파티 상세 페이지 | Shipmate</title>
        <meta
          name="description"
          content="파티의 리더와 정보, 배송 진행 상황 등을 확인하고 채팅이나 파티에 참여해보세요."
        />
        <meta name="keywords" content="파티, 상세 정보, 배송, 해외 직구" />
      </Helmet>
      <section>
        <h1 className="sr-only">파티 상세 페이지</h1>

        {partyStatus === 'success' && partyLeaderData && (
          <>
            <article className="flex flex-col gap-y-3.5">
              <h2 className="mt-4 text-heading-1">파티 리더 프로필</h2>
              <PartyLeader item={partyLeaderData} />
            </article>
            <article className="flex flex-col gap-y-3.5">
              <h2 className="mt-4 text-heading-1">반드시 읽어주세요!</h2>
              <Standard
                title="세관 공지"
                description={`관세한도까지 ${partyData.customs_limit}% 달성 시 추가 관세 발생합니다.`}
              />
            </article>
            <article className="flex flex-col gap-y-3.5">
              <h2 className="mt-4 text-heading-1">공구 정보</h2>
              <PartyInfoList
                country={partyData.country}
                customs_limit={partyData.target_members}
                dutiesLimit={partyData.dutiesLimit || '0'}
                weight={partyData.weight}
                current_members={
                  partyData?.member_ids !== null
                    ? String(partyData?.member_ids)
                    : '0'
                }
              />
            </article>

            {partyData.party_status === 'completed' && (
              <article>
                <h2 className="mt-4 text-heading-1">배송 진행 상황</h2>
                <Shipstate step={1} />
              </article>
            )}

            {partyLeaderData.id !== loginUserData.id && (
              <div
                aria-label="버튼 영역"
                role="group"
                className="my-4 flex flex-row gap-x-3.5"
              >
                <Button
                  type="button"
                  isActive
                  onClick={handleClickChatWithLeaderBtn}
                  buttonContent="파티 리더와 채팅"
                />
                <Button
                  type="button"
                  isActive={!isCompleted}
                  onClick={handleClickJoinPartyBtn}
                  buttonContent={
                    isCompleted ? '파티가 마감되었습니다' : '파티 참여하기'
                  }
                />
              </div>
            )}
            {postingData?.items.length !== 0 ? (
              <article className="flex flex-col gap-y-3.5">
                <h2 className="mt-4 text-heading-1">
                  파티원들은 이런 물품을 구매했어요
                </h2>
                <Swiper
                  spaceBetween={0}
                  slidesPerView="auto"
                  pagination={true}
                  autoplay={true}
                  modules={[Pagination, A11y, Autoplay]}
                  a11y={{
                    prevSlideMessage: '이전 이미지',
                    nextSlideMessage: '다음 이미지',
                    firstSlideMessage: '첫 번째 이미지',
                    lastSlideMessage: '마지막 이미지',
                  }}
                  style={{
                    maxWidth: '360px',
                  }}
                >
                  <ul>
                    {postingData?.items.map((post) => (
                      <SwiperSlide key={post.id}>
                        <li>
                          <PostingCard
                            profileImg={getPbImageURL(
                              pb.baseUrl,
                              post.expand.member_id,
                              'profile_photo'
                            )}
                            user={post.expand.member_id.nickname}
                            postingImg={post.item_photo}
                            party={true}
                            content={post.item_name}
                            data={post}
                          />
                        </li>
                      </SwiperSlide>
                    ))}
                  </ul>
                </Swiper>
              </article>
            ) : (
              <span>아직 참여한 멤버가 없어요!</span>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default PartyDetail;
