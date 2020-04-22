# minibuf

Small and fast Markdown editor with formatter.

Try here: <https://ahuglajbclajep.github.io/minibuf>

## Usage

- format: `ctrl` + `d`
- save: `ctrl` + `s`
- download: `ctrl` + `q`
- darkmode: `ctrl` + `e`
- hardbreak: `ctrl` + `b`

## Features

- Fast startup with [Preact](https://preactjs.com) and [dynamic-imports](https://webpack.js.org/guides/code-splitting/#dynamic-imports)
- Working even if offline with a Service Worker generated by [Workbox](https://developers.google.com/web/tools/workbox/)
- Compiling Markdown without blocking input with [Comlink](https://github.com/GoogleChromeLabs/comlink)
- Differential rendering of the compiled Markdown with [morpthdom](https://github.com/patrick-steele-idem/morphdom)
- Formatting Markdown while keeping the cursor position with [Prettier](https://prettier.io/)
- Save and download the Markdown
- Simple Dark Mode with [mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode) and [prefers-color-scheme
  ](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme)  
  See also: <https://dev.wgao19.cc/sun-moon-blending-mode/>
- HardBreak mode, which treats normal line breaks as [hard line breaks](https://github.github.com/gfm/#hard-line-break)

## Performance

### Sizes

The sizes of the bundles measured by the following commands are shown in the table below.
Note that the prefix `k` means 1000x and is bigger than the result of `ls -lh`, etc.

```sh
$ npx -q -p pretty-bytes-cli -c 'for f in `find dist -type f`; do echo $f; ls -l $f | awk "{print \$5}" | pretty-bytes; done'
$ npx -q -p gzip-size-cli -c 'find dist -type f -exec sh -c "echo {}; gzip-size {}" \;'
```

|     filename      |    size | gzipped | note                          |
| :---------------: | ------: | ------: | :---------------------------- |
|    index.html     |   450 B |   302 B |                               |
|     main.css      | 13.8 kB | 3.26 kB | include github-markdown-css   |
| service-worker.js | 8.11 kB | 3.15 kB | generated by workbox          |
|      main.js      | 30.8 kB | 11.7 kB | include preact, comlink, ...  |
|     worker.js     |  101 kB | 34.2 kB | include comlink, unified, ... |
|    1.worker.js    |  135 kB | 38.5 kB | only prettier/parser-markdown |
|    2.worker.js    |  460 kB |  136 kB | only prettier/standalone      |
|                   |  749 kB |  227 kB |                               |

## License

[MIT](LICENSE)
