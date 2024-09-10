// PocketBase 아이템의 기본 구조를 정의하는 인터페이스
interface PocketBaseItem {
  collectionId: string;
  id: string;
  [key: string]: string; // 추가 필드를 위한 인덱스 시그니처
}

// 매개변수는 포켓호스트 URL, 처리해줄 record id, fileName(기본값 photo)
const getPbImageURL = (
  url: string,
  item: PocketBaseItem,
  fileName: string = 'photo'
): string => {
  if (!item[fileName]) {
    throw new Error(`Item does not have a '${fileName}' field`);
  }
  return `${url}api/files/${item.collectionId}/${item.id}/${item[fileName]}`;
};

export default getPbImageURL;