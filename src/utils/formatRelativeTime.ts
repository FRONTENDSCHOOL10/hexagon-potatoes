// ISO 8601 형식의 날짜 문자열을 현재 시간과 비교하여 상대적인 시간을 계산하는 함수 ex) 1일전, 3분전, 5시간전
const formatRelativeTime = (isoString: string): string => {
  const date: Date = new Date(isoString);
  const now: Date = new Date();

  const secondsDiff: number = Math.floor(
    (now.getTime() - date.getTime()) / 1000
  );
  const minutesDiff: number = Math.floor(secondsDiff / 60);
  const hoursDiff: number = Math.floor(minutesDiff / 60);
  const daysDiff: number = Math.floor(hoursDiff / 24);

  if (secondsDiff < 60) {
    return '방금 전';
  } else if (minutesDiff < 60) {
    return `${minutesDiff}분 전`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff}시간 전`;
  } else if (daysDiff < 7) {
    return `${daysDiff}일 전`;
  } else {
    return `${Math.floor(daysDiff / 7)}주 전`;
  }
};

export default formatRelativeTime;
