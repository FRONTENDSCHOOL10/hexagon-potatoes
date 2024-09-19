const splitText = (text: string, parts: number): string[] => {
  const words = text.split(/\s+/);
  const wordsPerPart = Math.ceil(words.length / parts);
  const chunks = [];

  for (let i = 0; i < parts; i++) {
    const start = i * wordsPerPart;
    const end = Math.min((i + 1) * wordsPerPart, words.length);
    chunks.push(words.slice(start, end).join(' ').trim());
  }

  return chunks.filter((chunk) => chunk.length > 0); // 빈 청크 제거
};

const interleaveContent = (
  text: string,
  imageUrls: string[]
): Array<{ type: string; content: string }> => {
  const content = [];

  if (imageUrls.length >= 1) {
    const textChunks = splitText(text, imageUrls.length + 1);

    for (let i = 0; i < textChunks.length; i++) {
      content.push({ type: 'text', content: textChunks[i] });
      if (i < imageUrls.length) {
        content.push({ type: 'image', content: imageUrls[i] });
      }
    }
  } else {
    // 이미지가 없는 경우
    content.push({ type: 'text', content: text });
  }

  return content;
};
export default interleaveContent;
