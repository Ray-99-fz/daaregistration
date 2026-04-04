export function downloadFile(url: string, filename?: string) {
  const link = document.createElement("a");
  link.href = url;
  link.target = "_blank";
  link.download = filename || "course-overview.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
