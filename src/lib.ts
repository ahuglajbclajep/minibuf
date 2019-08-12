const readme = `# mdpreview

Small and fast Markdown previewer/editor with formatter.

- format: \`ctrl\` + \`f\`
- save: \`ctrl\` + \`s\`
- download: \`ctrl\` + \`d\`
- darkmode: \`ctrl\` + \`q\`

GitHub: <https://github.com/ahuglajbclajep/mdpreview>`;

function now(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = `${now.getMonth() + 1}`.padStart(2, "0");
  const date = `${now.getDate()}`.padStart(2, "0");
  const hours = `${now.getHours()}`.padStart(2, "0");
  const minutes = `${now.getMinutes()}`.padStart(2, "0");
  const seconds = `${now.getSeconds()}`.padStart(2, "0");
  return `${year}-${month}-${date}_${hours}-${minutes}-${seconds}`;
}

function download(markdown: string): void {
  if (markdown.length === 0) return;
  const e = document.createElement("a");
  e.href = URL.createObjectURL(new Blob([markdown], { type: "text/markdown" }));
  e.download = `${now()}.md`;
  // see https://stackoverflow.com/questions/32225904/programmatical-click-on-a-tag-not-working-in-firefox
  e.dispatchEvent(new MouseEvent("click"));
}

function setCursor(element: HTMLTextAreaElement, cursor: number): void {
  element.setSelectionRange(cursor, cursor);
}

export { readme, download, setCursor };
