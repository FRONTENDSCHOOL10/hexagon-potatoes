// PocketBase 아이템의 기본 구조를 정의하는 인터페이스
interface PocketBaseItem {
  collectionId: string;
  id: string;
  [key: string]: any; // 추가 필드를 위한 인덱스 시그니처
}

// 매개변수는 포켓호스트 URL, 처리해줄 record id, fileName(기본값 photo)
const getPbImageURL = (
  url: string,
  item: PocketBaseItem,
  fileName: string = 'photo'
): string => {
  return item[fileName]
    ? `${url}/api/files/${item.collectionId}/${item.id}/${item[fileName]}`
    : '';
};

export default getPbImageURL;

// 이미지가 여러장일때
export const getPbImagesURL = (
  index: number,
  item: PocketBaseItem,
  fileName: string = 'photo'
): string => {
  return `${import.meta.env.VITE_PB_URL}api/files/${item.collectionId}/${item.id}/${item[fileName][index]}`;
};
