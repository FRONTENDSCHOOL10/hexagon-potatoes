import React, { useId, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { v4 as uuidv4 } from 'uuid';

interface FileData {
  id: string;
  file: File;
  previewUrl: string;
}

interface PropTypes {
  onChange: (files: FileData[]) => void;
  maxFiles?: number;
}

const FileInput = ({ onChange, maxFiles = 5 }: PropTypes) => {
  const [files, setFiles] = useState<FileData[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputId = useId();

  const handlePressEnter = (e: React.KeyboardEvent<HTMLLabelElement>) => {
    if (e.key === 'Enter') {
      const imageInputElem = document.getElementById(imageInputId);
      imageInputElem?.click();
    }
  };

  const handleImgInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (fileList) {
      const newFiles: FileData[] = Array.from(fileList).map((file) => ({
        id: uuidv4(),
        file,
        previewUrl: URL.createObjectURL(file),
      }));

      const updatedFiles = [...files, ...newFiles].slice(0, maxFiles);

      setFiles(updatedFiles);
      onChange(updatedFiles);
      console.log(updatedFiles);
    }
  };

  const handleRemoveImg = (id: string) => {
    const updatedFiles = files.filter((file) => file.id !== id);
    setFiles(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <div
      role="group"
      aria-label="상품 사진 선택 필드"
      className="relative flex flex-col gap-y-3 text-button"
    >
      <span className="text-button">사진</span>
      <label
        onKeyDown={handlePressEnter}
        tabIndex={0}
        className="relative flex size-[4.375rem] cursor-pointer flex-col items-center justify-center rounded-xl border-none bg-gray-100 shadow-shadow-blue"
        htmlFor={imageInputId}
      >
        <svg className="size-4 text-gray-300" aria-hidden="true">
          <use href="/assets/sprite-sheet.svg#addimage" />
        </svg>
        <span className="leading-none text-gray-300" aria-hidden="true">
          {files.length} / {maxFiles}
        </span>
      </label>
      <input
        ref={fileInputRef}
        name="photo"
        accept="image/jpg, image/jpeg, image/png"
        multiple
        className="sr-only absolute left-0 top-[2.13rem] size-[4.375rem] rounded-xl border-none bg-gray-100 text-transparent opacity-0"
        type="file"
        id={imageInputId}
        onChange={handleImgInputChange}
        aria-describedby="photo-input-description"
      />
      <span id="photo-input-description" className="sr-only">
        최대 {maxFiles}장의 jpg, jpeg, png 이미지를 선택할 수 있습니다.
      </span>
      {files.length > 0 && (
        <Swiper
          // modules={[Navigation]}
          spaceBetween={12}
          slidesPerView="auto"
          modules={[Navigation, A11y]}
          a11y={{
            prevSlideMessage: '이전 이미지',
            nextSlideMessage: '다음 이미지',
            firstSlideMessage: '첫 번째 이미지',
            lastSlideMessage: '마지막 이미지',
          }}
          style={{
            position: 'absolute',
            left: '4.375rem',
            top: '2.13rem',
            marginLeft: '0.75rem',
          }}
        >
          {files.map((file, index) => (
            <SwiperSlide key={file.id} style={{ width: 'auto' }}>
              <li
                style={{
                  position: 'relative',
                  borderRadius: '0.75rem',
                  boxShadow:
                    '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                }}
              >
                <button
                  type="button"
                  aria-label={`${index + 1}번 이미지 제거`}
                  style={{
                    position: 'absolute',
                    right: '0.25rem',
                    top: '0.25rem',
                    borderRadius: '9999px',
                    backgroundColor: '#4B5563',
                    padding: '0.25rem',
                    color: 'white',
                    zIndex: 10,
                  }}
                  onClick={() => handleRemoveImg(file.id)}
                >
                  <svg
                    style={{
                      width: '0.575rem',
                      height: '0.575rem',
                      fill: 'currentColor',
                    }}
                    aria-hidden="true"
                  >
                    <use href="/assets/sprite-sheet.svg#x" />
                  </svg>
                </button>
                <img
                  style={{
                    width: '4.375rem',
                    height: '4.375rem',
                    borderRadius: '0.75rem',
                  }}
                  src={file.previewUrl}
                  alt="이미지 미리보기"
                />
              </li>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default FileInput;
