export const convertImageUrl = (url: string, px: number) => {
  const decodedUrl = decodeURI(url);
  return decodedUrl.replace("/{w}x{h}", `/${px}x${px}`);
};
