/** injects a link tag of rel stylesheet in the head of the document */
export function injectStylesheetLink(url: string) {
  const link = document.createElement("link");

  link.rel= "stylesheet";
  link.href = url;

  document.head.appendChild(link);
}
