// 숫자를 세 자리마다 쉼표로 구분하는 함수
const formatCurrency = (amount: number) => {
  if (isNaN(amount)) return '';
  return new Intl.NumberFormat('ko-KR', { useGrouping: true }).format(amount);
};

export default formatCurrency;
