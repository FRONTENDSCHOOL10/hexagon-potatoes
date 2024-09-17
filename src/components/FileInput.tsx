import React, { useId, useRef, useState } from 'react';
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
        className="relative flex size-[4.375rem] flex-col items-center justify-center rounded-xl border-none bg-gray-100 shadow-shadow-blue"
        htmlFor={imageInputId}
      >
        <svg className="size-4 text-gray-300">
          <use href="/assets/sprite-sheet.svg#addimage" />
        </svg>
        <span className="leading-none text-gray-300">
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
      />
      {files.length > 0 && (
        <ul className="absolute left-[4.375rem] top-[2.13rem] ml-3 flex flex-row gap-x-3">
          {files.map((file) => (
            <li
              key={file.id}
              className="relative rounded-xl shadow-shadow-blue"
            >
              <button
                type="button"
                className="absolute right-1 top-1 rounded-full bg-gray-600 p-1 text-white hover:bg-mainblue hover:text-white"
                onClick={() => handleRemoveImg(file.id)}
              >
                <svg className="size-[0.575rem] fill-current">
                  <use href="/assets/sprite-sheet.svg#x" />
                </svg>
              </button>
              <img
                className="size-[4.375rem] rounded-xl"
                src={file.previewUrl}
                alt="이미지 미리보기"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FileInput;
