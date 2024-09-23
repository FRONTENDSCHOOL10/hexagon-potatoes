import { useId } from 'react';

import Swiper from 'swiper';

const AddImage = ({ onInputChange, onClickDeleteBtn, imgData, max }) => {
  const imageInputId = useId();

  const maxImg = max;

  const handlePressEnter = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === 'Enter') {
      const imageInputElem = document.getElementById(imageInputId);
      imageInputElem?.click();
    }
  };

  return (
    <div
      role="group"
      aria-label="상품 사진 선택 필드"
      className="relative flex flex-col gap-y-3 text-button"
    >
      <span className="text-button">구매 상품 사진</span>
      <label
        onKeyDown={handlePressEnter}
        tabIndex={0}
        className="relative flex size-[4.375rem] flex-col items-center justify-center rounded-xl border-none bg-gray-100 shadow-shadow-blue"
        htmlFor={imageInputId}
      >
        <svg className="size-4 text-gray-300">
          <use href="/assets/sprite-sheet.svg#addimage" />
        </svg>
        <span className="leading-none text-gray-300">
          {imgData.length || '0'} / {maxImg}
        </span>
      </label>
      <input
        accept="image/jpg, image/jpeg, image/png"
        multiple
        disabled={imgData.length >= maxImg}
        className="sr-only absolute left-0 top-[2.13rem] size-[4.375rem] rounded-xl border-none bg-gray-100 text-transparent opacity-0"
        type="file"
        id={imageInputId}
        onChange={onInputChange}
      />
      {imgData !== undefined && imgData?.length !== 0 && (
        <ul className="absolute left-[4.375rem] top-[2.13rem] ml-3 flex flex-row gap-x-3">
          {imgData.map((data, idx) => (
            <li key={idx} className="relative rounded-xl shadow-shadow-blue">
              <button
                type="button"
                className="absolute right-1 top-1 rounded-full bg-gray-600 p-1 text-white hover:bg-mainblue hover:text-white"
                onClick={() => onClickDeleteBtn(data.id)}
              >
                <svg className="size-[0.575rem] fill-current">
                  <use href="/assets/sprite-sheet.svg#x" />
                </svg>
              </button>
              <img
                className="size-[4.375rem] rounded-xl"
                src={data.url}
                alt="이미지 미리보기"
              />
            </li>
          ))}
        </ul>
      )}
      <p className="text-caption">
        상품과 무관한 사진을 첨부하면 노출 제한 처리될 수 있습니다. 사진첨부 시
        개인정보가 노출되지 않도록 유의해주세요.
      </p>
    </div>
  );
};

export default AddImage;
