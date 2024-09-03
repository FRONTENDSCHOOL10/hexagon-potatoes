interface propsType {
  partyTitle: string;
  // blob 객체가 될지 잘 모르겠다..
  partyImg: string;
  partyImgAlt: string;
  partyDescription: string;
  // blob 객체가 될지 잘 모르겠다..
  leaderImg: string;
  leaderImgAlt: string;
}

const Articles = ({
  partyTitle,
  partyImg,
  partyImgAlt,
  partyDescription,
  leaderImg,
  leaderImgAlt,
}: propsType) => {
  return (
    <>
      <h3>{partyTitle}</h3>
      {/* 파티글 대표 이미지 */}
      <img src={partyImg} alt={partyImgAlt} />
      <p>{partyDescription}</p>
      {/* 라벨은 컴포넌트로 만들면 어떤가 */}
      {/* <Label /> */}
      <img src={leaderImg} alt={leaderImgAlt} />
    </>
  );
};

export default Articles;
