import Dropdown from '@/components/Dropdown/Dropdown';
import FileInput from '@/components/FileInput';
import HashtagInput from '@/components/HashtagInput/HashtagInput';
import { useState } from 'react';

const TipPostingForm = () => (
  <div className="flex flex-col gap-3">
    <FileInput />
    <HashtagInput />
    <input
      type="text"
      placeholder="제목을 입력해주세요"
      className="pretendard h-[2.8125rem] w-full rounded-xl border border-solid border-gray-200 px-5 py-2 text-[0.875rem] font-normal not-italic leading-5 placeholder:text-gray-200"
    />
    <textarea
      placeholder="본문을 입력하세요"
      className="mb-3 h-[25rem] resize-none overflow-hidden overflow-ellipsis whitespace-nowrap rounded-xl border border-gray-200 p-5 font-[Pretendard] text-[0.875rem] font-normal not-italic leading-5 placeholder:text-gray-200"
    ></textarea>
  </div>
);
const BoastPostingForm = () => (
  <div className="flex flex-col gap-3">
    <FileInput />
    <HashtagInput />
    <textarea
      placeholder="본문을 입력하세요"
      className="mb-3 h-[25rem] resize-none overflow-hidden overflow-ellipsis whitespace-nowrap rounded-xl border border-gray-200 p-5 font-[Pretendard] text-[0.875rem] font-normal not-italic leading-5 placeholder:text-gray-200"
    ></textarea>
  </div>
);

const WritePost = () => {
  const [selectedCategory, setSelectedCategory] = useState('자랑');
  const handleChange = (name: string) => (value: string) => {
    if (name === '카테고리') {
      setSelectedCategory(value);
    }
  };
  return (
    <div className="flex flex-col gap-3 p-3">
      <Dropdown
        dropdownName={'카테고리'}
        list={['유저팁']}
        label={'카테고리'}
        defaultMsg={'자랑'}
        onInputChange={handleChange}
      />
      {selectedCategory === '유저팁' ? (
        <TipPostingForm />
      ) : (
        <BoastPostingForm />
      )}
    </div>
  );
};
export default WritePost;
