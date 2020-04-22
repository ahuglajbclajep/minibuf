const markdown = `# minibuf

Small and fast Markdown editor with formatter.

- format:    \`ctrl\` + \`d\`
- save:      \`ctrl\` + \`s\`
- download:  \`ctrl\` + \`q\`
- darkmode:  \`ctrl\` + \`e\`
- hardbreak: \`ctrl\` + \`b\`

GitHub: <https://github.com/ahuglajbclajep/minibuf>
`;

const readme: Markdown = { markdown, cursor: markdown.length };

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

function moveCursor(textarea: HTMLTextAreaElement, position: number): void {
  textarea.setSelectionRange(position, position);
}

const isWinChrome =
  /Win/i.test(navigator.platform) && /Google/i.test(navigator.vendor);

export { readme, download, moveCursor, isWinChrome };
