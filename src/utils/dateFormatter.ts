// 포켓베이스에서 받아온 날짜시간형식을 MM.DD 형식으로 바꿔주는 함수
export const formatDateShort = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${month}.${day}`;
};

// 포켓베이스에서 받아온 날짜시간형식을 time태그의 datetime 속성에 넣을수 있도록 포맷해주는 함수
export const formatForDateTime = (dateString: string): string => {
  // 정규표현식을 사용하여 입력 문자열을 파싱합니다.
  const regex = /^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})(\.\d{3})(Z)$/;
  const match = dateString.match(regex);

  if (!match) {
    throw new Error('Invalid date string format');
  }

  // 날짜와 시간 부분을 추출합니다.
  const [, datePart, timePart, , zPart] = match;

  // "YYYY-MM-DDTHH:mm:ssZ" 형식으로 조합합니다.
  return `${datePart}T${timePart}${zPart}`;
};
