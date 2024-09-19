// 배열과 원하는 항목 수를 매개변수로 받아 랜덤하게 반환시켜주는 함수
function getRandomItems<T>(array: T[], count: number): T[] {
  const shuffled = [...array];
  let currentIndex = shuffled.length;
  let randomIndex;

  // 배열의 길이와 요청한 개수 중 작은 값을 선택
  count = Math.min(count, currentIndex);

  while (currentIndex > shuffled.length - count) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [shuffled[currentIndex], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[currentIndex],
    ];
  }

  return shuffled.slice(shuffled.length - count);
}

export default getRandomItems;
