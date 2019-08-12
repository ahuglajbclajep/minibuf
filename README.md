# mdpreview

Small and fast Markdown previewer/editor with formatter.

Try here: <https://ahuglajbclajep.github.io/mdpreview>

## Usage

- format: `ctrl` + `f`
- save: `ctrl` + `s`
- download: `ctrl` + `d`
- darkmode: `ctrl` + `e`

## Features

- Fast loading with [Preact](https://preactjs.com) and [dynamic imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports)
- Compile Markdown without blocking input with [Comlink](https://github.com/GoogleChromeLabs/comlink)
- Working even if offline with a Service Worker generated using [Workbox](https://developers.google.com/web/tools/workbox/)
- Dark mode with [mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) and [prefers-color-scheme
  ](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)

## License

[MIT](LICENSE)
