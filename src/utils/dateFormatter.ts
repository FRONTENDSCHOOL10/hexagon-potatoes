// 포켓베이스에서 받아온 날짜시간형식을 MM.DD 형식으로 바꿔주는 함수
export const formatDateShort = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${month}.${day}`;
};

// 포켓베이스에서 받아온 날짜시간형식을 time태그의 datetime 속성에 넣을수 있도록 포맷해주는 함수
export const formatDateString = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date');
    }
    return date.toISOString().replace(/\.\d{3}/, '');
  } catch (error) {
    return 'Invalid date format';
  }
};
