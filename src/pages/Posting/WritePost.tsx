import axios from 'axios';
import Dropdown from '@/components/Dropdown/Dropdown';
import FileInput from '@/components/FileInput/FileInput';
import HashtagInput from '@/components/HashtagInput/HashtagInput';
import { useState, FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import Alert from '@/components/Alert/Alert';
import { Helmet } from 'react-helmet-async';

const WritePost = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('자랑');
  const [data, setData] = useState({
    photo: [],
    tags: [],
    title: '',
    content: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    if (selectedCategory === '유저팁' && !data.title.trim()) {
      setError('제목을 입력해주세요.');
      return false;
    }
    if (!data.content.trim()) {
      setError('본문을 입력해주세요.');
      return false;
    }
    return true;
  };

  const handleChange = useCallback(
    (name: string) => (value: string) => {
      if (name === '카테고리') {
        setSelectedCategory(value);
      }
    },
    []
  );

  const handleInputChange = useCallback((field: string, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const compressImage = async (file: File) => {
    const options = {
      maxSizeMB: 0.3,
      maxWidthOrHeight: 1280,
      useWebWorker: true,
      initialQuality: 0.6,
      fileType: 'image/webp',
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error('Image compression error:', error);
      return file;
    }
  };

  const handleClose = () => {
    setError(null);
    setIsLoading(false);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!validateForm()) return;

    const formData = new FormData();

    if (data.photo && data.photo.length > 0) {
      formData.delete('photo');
      for (let image of data.photo) {
        const compressedFile = await compressImage(image.file);
        formData.append('photo', compressedFile);
      }
    }
    formData.append('tag', JSON.stringify(data.tags));
    formData.append('title', data.title);
    formData.append('content', data.content.replace(/\n/g, '<br>'));

    formData.append('author_id', localStorage.getItem('authId') || '');

    const endpoint =
      selectedCategory === '유저팁'
        ? `${import.meta.env.VITE_PB_API}/collections/tip/records`
        : `${import.meta.env.VITE_PB_API}/collections/posting/records`;

    try {
      const response = await axios.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 30000, // 30 seconds timeout
      });
      const postingId = response?.data?.id;
      navigate(
        `/home/community/${selectedCategory === '유저팁' ? 'tip' : 'boast'}/${postingId}`
      );
    } catch (error) {
      console.error('Error:', error);
      setError('게시물 등록 중 오류가 발생했습니다. 다시 시도해 주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>게시물 작성 | Shipmate</title>
        <meta
          name="description"
          content="유저팁 또는 자랑 게시물을 작성하세요."
        />
        <meta name="keywords" content="게시물, 유저팁, 자랑, 쉽메이트" />
      </Helmet>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-3">
        <Dropdown
          dropdownName={'카테고리'}
          list={['유저팁']}
          label={'카테고리'}
          defaultMsg={'자랑'}
          onInputChange={handleChange}
        />

        <div className="flex flex-col gap-3">
          <FileInput onChange={(files) => handleInputChange('photo', files)} />
          <HashtagInput onChange={(tags) => handleInputChange('tags', tags)} />
          {selectedCategory === '유저팁' && (
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              name="title"
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="pretendard h-[2.8125rem] w-full rounded-xl border border-solid border-gray-200 px-5 py-2 text-[0.875rem] font-normal not-italic leading-5 placeholder:text-gray-200"
            />
          )}
          <textarea
            placeholder="본문을 입력하세요"
            name="content"
            onChange={(e) => handleInputChange('content', e.target.value)}
            className="mb-3 h-[25rem] whitespace-pre-wrap rounded-xl border border-gray-200 p-5 font-[Pretendard] text-[0.875rem] font-normal not-italic leading-5 placeholder:text-gray-200"
          ></textarea>
        </div>
        {error && (
          <Alert
            type={'error'}
            subtext={error}
            title={''}
            onClose={handleClose}
          />
        )}
        <button
          type="submit"
          className="inline-block w-full rounded-full bg-mainblue px-3 py-2.5 text-button text-white shadow-shadow-blue hover:bg-white hover:text-mainblue"
          disabled={isLoading}
        >
          {isLoading && !error ? '게시 중...' : '게시하기'}
        </button>
      </form>
    </>
  );
};

export default WritePost;
