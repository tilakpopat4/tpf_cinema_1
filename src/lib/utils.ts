export function getDirectImageUrl(url: string | undefined | null): string {
  if (!url) return '';
  
  // Convert Google Drive viewer links to direct image links
  // e.g. https://drive.google.com/file/d/1ABC123/view -> https://drive.google.com/uc?export=view&id=1ABC123
  const gdriveRegex = /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/;
  const match = url.match(gdriveRegex);
  
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  
  return url;
}

export function extractYouTubeId(url: string | undefined | null): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}
