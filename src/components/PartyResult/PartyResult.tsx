import RatingStar from '@/components/RatingStar/RatingStar';
import React from 'react';

interface PartyResultProps {
  partyCount: number; 
}

const PartyResult: React.FC<PartyResultProps> = ({ partyCount }) => {
  return (
    <div className="bg-white px-4">
      <h2 className="text-heading-1 text-black mb-[0.5rem]">파티 통계</h2>

      <div className="flex gap-[0.5rem]">
        <div className="flex flex-col items-left bg-white rounded-lg p-4 w-[10.25rem] h-[6.125rem] shadow-shadow-blue">
          <span className="text-sub-1 text-gray-300 pb-1">개설 파티 수</span>
          <span className="text-heading-1 text-black">{partyCount}</span>
        </div>

        <div className="flex flex-col items-left bg-white rounded-lg p-4 w-[10.25rem] h-[6.125rem] shadow-shadow-blue">
          <span className="text-sub-1 text-gray-300 pb-2">평점</span>
          <div className="flex flex-col items-left">
            <RatingStar value={4.0} />
            <span className="mt-1 text-gray-600 text-sm">4.0</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartyResult;
