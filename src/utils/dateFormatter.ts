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

// ISO 8601 형식의 날짜 문자열을 "YYYY. MM. DD HH:mm" 형식으로 변환하는 함수
export const formatDateLong = (isoString: string): string => {
  // ISO 문자열을 파싱하여 UTC 날짜로 변환
  const date = new Date(isoString);

  // UTC 시간을 기반으로 한국 시간 계산 (UTC+9)
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const hours = String((date.getUTCHours() + 9) % 24).padStart(2, '0');
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');

  const spacer = '\u2002'; // HTML 공백 문자 1개
  return `${year}. ${month}. ${day}${spacer}${hours}:${minutes}`;
};
