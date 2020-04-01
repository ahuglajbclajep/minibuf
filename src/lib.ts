const readme = `# mdpreview

Small and fast Markdown previewer/editor with formatter.

- format: \`ctrl\` + \`d\`
- save: \`ctrl\` + \`s\`
- download: \`ctrl\` + \`q\`
- darkmode: \`ctrl\` + \`e\`

GitHub: <https://github.com/ahuglajbclajep/mdpreview>

`;

const defaultData: Data = { markdown: readme, cursorPos: readme.length };

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
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([markdown], { type: "text/markdown" }));
  a.download = `${now()}.md`;
  a.dispatchEvent(new MouseEvent("click"));
}

function moveCursor(textarea: HTMLTextAreaElement, cursorPos: number): void {
  textarea.setSelectionRange(cursorPos, cursorPos);
}

export { defaultData, download, moveCursor };
