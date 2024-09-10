/**
 * 현재 페이지의 URL 경로에서 마지막 슬래시 뒤의 부분을 반환합니다.
 *
 * @returns {string} URL 경로의 마지막 부분
 */
const getLastPath = (): string => {
  // 현재 페이지의 경로를 가져옵니다.
  const pathname = window.location.pathname;

  // 경로를 '/'로 나누고, 마지막 요소를 반환합니다.
  const segments = pathname.split('/').filter(Boolean); // 빈 문자열을 필터링
  return decodeURIComponent(segments[segments.length - 1]) || '';
};

export default getLastPath;
