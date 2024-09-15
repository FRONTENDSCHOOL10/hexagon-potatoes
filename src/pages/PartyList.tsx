// 파티 리스트 데이터 받기
// 그러면 처음부터 국가 선택 페이지에서 현재 선택한 국가 정보를 넘겨줘야할 거 같음
const partyListData = [{}];

const PartyListPage = () => {
  return (
    <section className="flex flex-col gap-y-3">
      <h1 className="text-heading-1">
        이 나라의 파티가 파티원을 모집 중이에요!
      </h1>
      {/* country 가 주소창에서 뜯은거 포함하고 있는거 찾아야됨 */}
    </section>
  );
};

export default PartyListPage;
