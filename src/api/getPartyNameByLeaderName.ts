import getPartyNameByUserId from './getPartyNameByUserId'; // 파티 이름 조회 함수
import getUserIdByNickName from './getUserIdByNickName'; // 사용자 ID 조회 함수

// 사용자의 이름으로 파티 이름을 조회하는 함수
async function getPartyNameByLeaderName(leaderName: string): Promise<string> {
  try {
    // 사용자 이름으로 사용자 ID를 조회
    const userId = await getUserIdByNickName(leaderName);
    // 사용자 ID로 파티 이름을 조회
    const partyName = await getPartyNameByUserId(userId);
    return partyName;
  } catch (error) {
    // 오류가 발생한 경우 한글로 된 오류 메시지 출력
    console.error('리더 이름으로 파티 이름을 조회하는 도중 오류 발생:', error);
    throw error;
  }
}

export default getPartyNameByLeaderName;
// 사용할 때
// getPartyNameByLeaderName('리더')
//     .then((partyName) => {
//       console.log(`리더 "리더"의 파티 이름은 "${partyName}"입니다.`);
//     })
//     .catch((error) => {
//       console.error('파티 이름을 조회하는 도중 오류 발생:', error);
//     });
