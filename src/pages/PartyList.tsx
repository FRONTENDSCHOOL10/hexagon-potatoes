// 파티 리스트 데이터 받기
// 그러면 처음부터 국가 선택 페이지에서 현재 선택한 국가 정보를 넘겨줘야할 거 같음
const partyListData = [{}];

const PartyListPage = () => {
  return (
    <section className="flex flex-col gap-y-3">
      <h1 className="sr-only">파티 리스트 페이지</h1>
      <p className="mt-4 text-heading-1">파티원을 모집 중이에요!</p>
    </section>
  );
};

export default PartyListPage;
