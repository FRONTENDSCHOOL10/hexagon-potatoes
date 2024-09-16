import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';

const HashtagInput = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const composingRef = useRef<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleCompositionStart = () => {
    composingRef.current = true;
  };

  const handleCompositionEnd = () => {
    composingRef.current = false;
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !composingRef.current && inputValue.trim()) {
      e.preventDefault();
      const newTags = inputValue
        .split(/\s+/)
        .map((tag) => tag.trim().replace(/^#/, ''))
        .filter((tag) => tag.length > 0 && !tags.includes(tag));

      if (newTags.length > 0) {
        setTags([...tags, ...newTags]);
        setInputValue('');
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="mx-[auto] my-[0] w-full">
      <div className="mb-2 flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="mr-1 rounded bg-gray-100 p-1 text-caption text-[#2563EB]"
          >
            #{tag}
            <button
              onClick={() => removeTag(tag)}
              className="ml-1 cursor-pointer border-none bg-none text-[0.875rem]"
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        onCompositionStart={handleCompositionStart}
        onCompositionEnd={handleCompositionEnd}
        placeholder="해시태그 입력 후 Enter..."
        className="pretendard h-[2.8125rem] w-full rounded-xl border border-solid border-gray-200 px-5 py-2 text-[0.875rem] font-normal not-italic leading-5 placeholder:text-gray-200"
      />
    </div>
  );
};

export default HashtagInput;
