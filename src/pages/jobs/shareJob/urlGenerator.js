export function generateWhatsappShareUrl(text, url) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  return `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
}
export function generateFacebookShareUrl(url) {
  const encodedUrl = encodeURIComponent(url);
  return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
}
export function generateTelegramShareUrl(text, url) {
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);
  return `https://telegram.me/share/url?text=${encodedText}&url=${encodedUrl}`;
}
export function generateLinkedinShareUrl(url) {
  const encodedUrl = encodeURIComponent(url);
  return `https://www.linkedin.com/shareArticle?url=${encodedUrl}`;
}
export function generateMailtoUrl({ to, subject, body }) {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  return `mailto:${to}?subject=${encodedSubject}&body=${encodedBody}`;
}
