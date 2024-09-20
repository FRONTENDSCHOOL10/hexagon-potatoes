import React, { useState, useCallback } from 'react';

interface PropTypes {
  id: 'bestUser' | 'bestParty' | 'userBoast' | 'userTips';
  onReload: (
    id: 'bestUser' | 'bestParty' | 'userBoast' | 'userTips'
  ) => Promise<void>;
  disabled: boolean;
  count: number;
  maxCount: number;
}

const style = 'text-sub-2 font-medium ';

const ReloadButton = React.memo(
  ({ id, onReload, disabled, count, maxCount }: PropTypes) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = useCallback(async () => {
      if (!disabled && count < maxCount) {
        setIsLoading(true);
        await onReload(id);
        setIsLoading(false);
      }
    }, [disabled, count, maxCount, id, onReload]);

    return (
      <>
        <button
          onClick={handleClick}
          disabled={disabled || isLoading}
          className={`bg-blue flex gap-1 rounded-md ${disabled || isLoading ? 'bg-gray-100' : 'bg-blue-200'} px-2 py-1 ${style} cursor-pointer`}
          aria-label={
            isLoading
              ? '데이터를 새로고침하는 중입니다'
              : '데이터를 새로고침합니다'
          }
        >
          {isLoading ? '열심히 불러오는 중' : '새로고침'}
          <span role="status" aria-live="polite" className={style}>
            {count}/{maxCount}
          </span>
        </button>
      </>
    );
  }
);

export default ReloadButton;
