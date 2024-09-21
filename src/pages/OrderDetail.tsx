import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import pb from '@/utils/pocketbase';
import useFetch from '@/hooks/useFetch';
import StandardInput from '@/components/Inputs/StandardInput';
import AddressInput from '@/components/Inputs/AddressInput';
import UserNameInput from '@/components/Inputs/UserNameInput';
import ItemsList from '@/components/Lists/ItemList';
import Payment from '@/components/Payment/Payment';
import Button from '@/components/Buttons/Button';

// 아이템 데이터 타입
interface ItemData {
  nickname: string;
  item_photo: string;
  item_name: string;
  category: string;
  item_weight: number;
  item_size: string;
}

// 유저 데이터 타입
interface UserData {
  name: string;
  address: string;
  detail_address: string;
  personal_code: string;
}

// 인증된 사용자 데이터 타입
interface AuthUserData {
  id: string;
  token: string;
}

// API 응답 타입
interface ApiResponse<T> {
  status: 'success' | 'error' | 'loading';
  data: T | null;
  error: string | null;
}

const itemsData: ItemData[] = [
  {
    nickname: '주비',
    item_photo: '',
    item_name: '유리잔',
    category: '생활용품',
    item_weight: 0.3,
    item_size: '4x15',
  },
  {
    nickname: '소현',
    item_photo: '',
    item_name: '향수',
    category: '미용',
    item_weight: 0.3,
    item_size: '6x8',
  },
  {
    nickname: '재명',
    item_photo: '',
    item_name: '인형',
    category: '인형',
    item_weight: 0.3,
    item_size: '8x21',
  },
  {
    nickname: '진',
    item_photo: '',
    item_name: '헤드셋',
    category: '음향기기',
    item_weight: 0.8,
    item_size: '30x25',
  },
];

const initialUserData: UserData = {
  name: '',
  address: '',
  detail_address: '',
  personal_code: '',
};

const OrderDetailPage = () => {
  const [data, setData] = useState<UserData>(initialUserData);
  const [authUserData, setAuthUserData] = useState<AuthUserData>({
    id: '',
    token: '',
  });
  const [isActive, setIsActive] = useState<boolean>(true);
  const [isValid, setIsValid] = useState<boolean>(true);

  const navigate = useNavigate();
  const { partyId } = useParams<{ partyId: string }>();

  useEffect(() => {
    const fetchAuthData = () => {
      try {
        const id = localStorage.getItem('authId') || '';
        const token = localStorage.getItem('authToken') || '';
        setAuthUserData({ id, token });
      } catch (error) {
        console.error(error);
      }
    };
    fetchAuthData();
  }, []);

  const { status: loginUserStatus, data: loginUserData } = useFetch<UserData>(
    authUserData.id
      ? `${import.meta.env.VITE_PB_URL}api/collections/users/records/${authUserData.id}`
      : ''
  );

  const { status: joinedPartyStatus, data: joinedPartyData } = useFetch<any>(
    `${import.meta.env.VITE_PB_URL}api/collections/party/records/${partyId}`
  );

  useEffect(() => {
    if (loginUserData) {
      setData({
        name: loginUserData.name || '',
        address: loginUserData.address || '',
        detail_address: loginUserData.detail_address || '',
        personal_code: loginUserData.personal_code || '',
      });
    }
  }, [loginUserData]);

  const checkInputFilled = (updatedData: UserData) => {
    const isFilled = Object.entries(updatedData).every(([key, value]) => {
      if (
        key === 'personal_code' &&
        joinedPartyData?.party_leader !== loginUserData?.id
      ) {
        return true;
      }
      return value !== undefined && value !== null && value !== '';
    });
    setIsActive(isFilled);
  };

  const handleChangeInput = (inputName: string) => (value: string | number) => {
    const updatedData = { ...data, [inputName]: value };
    setData(updatedData);
    checkInputFilled(updatedData);
  };

  const handleValidChange = (valid: boolean) => {
    setIsValid(valid);
  };

  const createFormData = () => {
    const formData = new FormData();
    formData.set('name', data.name);
    formData.set('address', data.address);
    formData.set('detail_address', data.detail_address);
    formData.set('personal_code', data.personal_code);
    return formData;
  };

  const updateUserData = async () => {
    try {
      const formData = createFormData();
      await axios.patch(
        `${import.meta.env.VITE_PB_URL}api/collections/users/records/${authUserData.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authUserData.token}`,
            'Content-Type': 'application/json',
          },
        }
      );
    } catch (error) {
      console.error('Failed to update user data:', error);
    }
  };

  const handleClickPaymentBtn = () => {
    updateUserData();
    navigate('/');
  };

  return (
    loginUserStatus === 'success' && (
      <section className="flex flex-col gap-y-3">
        <h1>주문 상세 페이지</h1>
        <UserNameInput
          inputName="name"
          onUserNameChange={handleChangeInput}
          onValidChange={handleValidChange}
          value={loginUserData?.name || ''}
        />
        <AddressInput
          addressInputName="address"
          detailAddressInputName="detail_address"
          onAddressChange={handleChangeInput}
          addressValue={loginUserData?.address || ''}
          detailAddressValue={loginUserData?.detail_address || ''}
        />
        {joinedPartyData?.party_leader === loginUserData?.id && (
          <>
            <StandardInput
              type="number"
              inputLabel="개인통관고유부호"
              placeholder="개인통관고유부호"
              inputName="personal_code"
              value={loginUserData?.personal_code || ''}
              onInputChange={handleChangeInput}
            />
            <ItemsList data={itemsData} />
          </>
        )}
        <Payment />
        <Button
          type="submit"
          buttonContent="최종 결제하기"
          isActive={isActive && isValid}
          onClick={handleClickPaymentBtn}
        />
      </section>
    )
  );
};

export default OrderDetailPage;
