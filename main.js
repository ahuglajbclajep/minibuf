!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t,n){"use strict";n.d(t,"c",function(){return L}),n.d(t,"a",function(){return f}),n.d(t,"b",function(){return r});var r,o,l,u,i={},c=[],a=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|^--/i;function s(e,t){for(var n in t)e[n]=t[n];return e}function _(e){var t=e.parentNode;t&&t.removeChild(e)}function f(e,t,n){var r,o,l,u,i=arguments;if(t=s({},t),arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(i[r]);if(null!=n&&(t.children=n),null!=e&&null!=e.defaultProps)for(o in e.defaultProps)void 0===t[o]&&(t[o]=e.defaultProps[o]);return u=t.key,null!=(l=t.ref)&&delete t.ref,null!=u&&delete t.key,p(e,t,u,l)}function p(e,t,n,o){var l={type:e,props:t,key:n,ref:o,__k:null,__p:null,__b:0,__e:null,l:null,__c:null,constructor:void 0};return r.vnode&&r.vnode(l),l}function d(e){return e.children}function v(e){if(null==e||"boolean"==typeof e)return null;if("string"==typeof e||"number"==typeof e)return p(null,e,null,null);if(null!=e.__e||null!=e.__c){var t=p(e.type,e.props,e.key,null);return t.__e=e.__e,t}return e}function h(e,t){this.props=e,this.context=t}function y(e,t){if(null==t)return e.__p?y(e.__p,e.__p.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?y(e):null}function m(e){!e.__d&&(e.__d=!0)&&1===o.push(e)&&(r.debounceRendering||l)(g)}function g(){var e;for(o.sort(function(e,t){return t.__v.__b-e.__v.__b});e=o.pop();)e.__d&&e.forceUpdate(!1)}function b(e,t,n,r,o,l,u,a,s){var f,p,d,h,m,g,b,w,S=t.__k||k(t.props.children,t.__k=[],v,!0),x=n&&n.__k||c,j=x.length;for(a==i&&(a=null!=l?l[0]:j?y(n,0):null),p=0;p<S.length;p++)if(null!=(f=S[p]=v(S[p]))){if(f.__p=t,f.__b=t.__b+1,null===(h=x[p])||h&&f.key==h.key&&f.type===h.type)x[p]=void 0;else for(d=0;d<j;d++){if((h=x[d])&&f.key==h.key&&f.type===h.type){x[d]=void 0;break}h=null}if(m=E(e,f,h=h||i,r,o,l,u,null,a,s),(d=f.ref)&&h.ref!=d&&(w||(w=[])).push(d,f.__c||m,f),null!=m){if(null==b&&(b=m),null!=f.l)m=f.l,f.l=null;else if(l==h||m!=a||null==m.parentNode)e:if(null==a||a.parentNode!==e)e.appendChild(m);else{for(g=a,d=0;(g=g.nextSibling)&&d<j;d+=2)if(g==m)break e;e.insertBefore(m,a)}a=m.nextSibling,"function"==typeof t.type&&(t.l=m)}}if(t.__e=b,null!=l&&"function"!=typeof t.type)for(p=l.length;p--;)null!=l[p]&&_(l[p]);for(p=j;p--;)null!=x[p]&&P(x[p],x[p]);if(w)for(p=0;p<w.length;p++)O(w[p],w[++p],w[++p])}function k(e,t,n,r){if(null==t&&(t=[]),null==e||"boolean"==typeof e)r&&t.push(null);else if(Array.isArray(e))for(var o=0;o<e.length;o++)k(e[o],t,n,r);else t.push(n?n(e):e);return t}function w(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]="number"==typeof n&&!1===a.test(t)?n+"px":n}function S(e,t,n,r,o){var l,u,i,c,a;if("key"===(t=o?"className"===t?"class":t:"class"===t?"className":t)||"children"===t);else if("style"===t)if(l=e.style,"string"==typeof n)l.cssText=n;else{if("string"==typeof r&&(l.cssText="",r=null),r)for(u in r)n&&u in n||w(l,u,"");if(n)for(i in n)r&&n[i]===r[i]||w(l,i,n[i])}else if("o"===t[0]&&"n"===t[1])c=t!==(t=t.replace(/Capture$/,"")),a=t.toLowerCase(),t=(a in e?a:t).slice(2),n?(r||e.addEventListener(t,x,c),(e.u||(e.u={}))[t]=n):e.removeEventListener(t,x,c);else if("list"!==t&&"tagName"!==t&&!o&&t in e)if(e.length&&"value"==t)for(t=e.length;t--;)e.options[t].selected=e.options[t].value==n;else e[t]=null==n?"":n;else"function"!=typeof n&&"dangerouslySetInnerHTML"!==t&&(t!==(t=t.replace(/^xlink:?/,""))?null==n||!1===n?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),n):null==n||!1===n?e.removeAttribute(t):e.setAttribute(t,n))}function x(e){return this.u[e.type](r.event?r.event(e):e)}function E(e,t,n,o,l,u,i,c,a,_){var f,p,y,m,g,w,S,x,E,j,O=t.type;if(void 0!==t.constructor)return null;(f=r.__b)&&f(t);try{e:if("function"==typeof O){if(x=t.props,E=(f=O.contextType)&&o[f.__c],j=f?E?E.props.value:f.__p:o,n.__c?S=(p=t.__c=n.__c).__p=p.__E:(O.prototype&&O.prototype.render?t.__c=p=new O(x,j):(t.__c=p=new h(x,j),p.constructor=O,p.render=H),E&&E.sub(p),p.props=x,p.state||(p.state={}),p.context=j,p.__n=o,y=p.__d=!0,p.__h=[]),null==p.__s&&(p.__s=p.state),null!=O.getDerivedStateFromProps&&s(p.__s==p.state?p.__s=s({},p.__s):p.__s,O.getDerivedStateFromProps(x,p.__s)),y)null==O.getDerivedStateFromProps&&null!=p.componentWillMount&&p.componentWillMount(),null!=p.componentDidMount&&i.push(p);else{if(null==O.getDerivedStateFromProps&&null==c&&null!=p.componentWillReceiveProps&&p.componentWillReceiveProps(x,j),!c&&null!=p.shouldComponentUpdate&&!1===p.shouldComponentUpdate(x,p.__s,j)){p.props=x,p.state=p.__s,p.__d=!1,p.__v=t,t.__e=n.__e,t.__k=n.__k;break e}null!=p.componentWillUpdate&&p.componentWillUpdate(x,p.__s,j)}for(m=p.props,g=p.state,p.context=j,p.props=x,p.state=p.__s,(f=r.__r)&&f(t),p.__d=!1,p.__v=t,p.__P=e,k(null!=(f=p.render(p.props,p.state,p.context))&&f.type==d&&null==f.key?f.props.children:f,t.__k=[],v,!0),null!=p.getChildContext&&(o=s(s({},o),p.getChildContext())),y||null==p.getSnapshotBeforeUpdate||(w=p.getSnapshotBeforeUpdate(m,g)),b(e,t,n,o,l,u,i,a,_),p.base=t.__e;f=p.__h.pop();)f.call(p);y||null==m||null==p.componentDidUpdate||p.componentDidUpdate(m,g,w),S&&(p.__E=p.__p=null)}else t.__e=M(n.__e,t,n,o,l,u,i,_);(f=r.diffed)&&f(t)}catch(e){r.__e(e,t,n)}return t.__e}function j(e,t){for(var n;n=e.pop();)try{n.componentDidMount()}catch(e){r.__e(e,n.__v)}r.__c&&r.__c(t)}function M(e,t,n,r,o,l,u,a){var s,_,f,p,d=n.props,v=t.props;if(o="svg"===t.type||o,null==e&&null!=l)for(s=0;s<l.length;s++)if(null!=(_=l[s])&&(null===t.type?3===_.nodeType:_.localName===t.type)){e=_,l[s]=null;break}if(null==e){if(null===t.type)return document.createTextNode(v);e=o?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type),l=null}return null===t.type?d!==v&&(e.data=v):t!==n&&(null!=l&&(l=c.slice.call(e.childNodes)),f=(d=n.props||i).dangerouslySetInnerHTML,p=v.dangerouslySetInnerHTML,a||(p||f)&&(p&&f&&p.__html==f.__html||(e.innerHTML=p&&p.__html||"")),function(e,t,n,r,o){var l;for(l in n)l in t||S(e,l,null,n[l],r);for(l in t)o&&"function"!=typeof t[l]||"value"===l||"checked"===l||n[l]===t[l]||S(e,l,t[l],n[l],r)}(e,v,d,o,a),p||b(e,t,n,r,"foreignObject"!==t.type&&o,l,u,i,a),a||("value"in v&&void 0!==v.value&&v.value!==e.value&&(e.value=null==v.value?"":v.value),"checked"in v&&void 0!==v.checked&&v.checked!==e.checked&&(e.checked=v.checked))),e}function O(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){r.__e(e,n)}}function P(e,t,n){var o,l,u;if(r.unmount&&r.unmount(e),(o=e.ref)&&O(o,null,t),n||"function"==typeof e.type||(n=null!=(l=e.__e)),e.__e=e.l=null,null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){r.__e(e,t)}o.base=o.__P=null}if(o=e.__k)for(u=0;u<o.length;u++)o[u]&&P(o[u],t,n);null!=l&&_(l)}function H(e,t,n){return this.constructor(e,n)}function L(e,t,n){var o,l,a;r.__p&&r.__p(e,t),l=(o=n===u)?null:n&&n.__k||t.__k,e=f(d,null,[e]),a=[],E(t,o?t.__k=e:(n||t).__k=e,l||i,i,void 0!==t.ownerSVGElement,n&&!o?[n]:l?null:c.slice.call(t.childNodes),a,!1,n||i,o),j(a,e)}r={},h.prototype.setState=function(e,t){var n=this.__s!==this.state&&this.__s||(this.__s=s({},this.state));("function"!=typeof e||(e=e(n,this.props)))&&s(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),m(this))},h.prototype.forceUpdate=function(e){var t,n,r,o=this.__v,l=this.__v.__e,u=this.__P;u&&(t=!1!==e,n=[],r=E(u,o,s({},o),this.__n,void 0!==u.ownerSVGElement,null,n,t,null==l?y(o):l),j(n,o),r!=l&&function e(t){var n,r;if(null!=(t=t.__p)&&null!=t.__c){for(t.__e=t.__c.base=null,n=0;n<t.__k.length;n++)if(null!=(r=t.__k[n])&&null!=r.__e){t.__e=t.__c.base=r.__e;break}return e(t)}}(o)),e&&e()},h.prototype.render=d,o=[],l="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,r.__e=function(e,t,n){for(var r;t=t.__p;)if((r=t.__c)&&!r.__p)try{if(r.constructor&&null!=r.constructor.getDerivedStateFromError)r.setState(r.constructor.getDerivedStateFromError(e));else{if(null==r.componentDidCatch)continue;r.componentDidCatch(e)}return m(r.__E=r)}catch(t){e=t}throw e},u=i},function(e,t,n){"use strict";n.d(t,"a",function(){return r}),n.d(t,"b",function(){return o});function r(e){if(0===e.length)return;const t=document.createElement("a");t.href=URL.createObjectURL(new Blob([e],{type:"text/markdown"})),t.download=`${function(){const e=new Date;return`${e.getFullYear()}-${`${e.getMonth()+1}`.padStart(2,"0")}-${`${e.getDate()}`.padStart(2,"0")}_${`${e.getHours()}`.padStart(2,"0")}-${`${e.getMinutes()}`.padStart(2,"0")}-${`${e.getSeconds()}`.padStart(2,"0")}`}()}.md`,t.dispatchEvent(new MouseEvent("click"))}function o(e,t){e.setSelectionRange(t,t)}},function(e,t,n){"use strict";var r,o,l=n(0),u=[],i=l.b.__r;l.b.__r=function(e){i&&i(e),r=0,(o=e.__c).__H&&(o.__H.t=d(o.__H.t))};var c=l.b.diffed;l.b.diffed=function(e){c&&c(e);var t=e.__c;if(t){var n=t.__H;n&&(n.u=d(n.u))}};var a=l.b.unmount;function s(e){l.b.__h&&l.b.__h(o);var t=o.__H||(o.__H={i:[],t:[],u:[]});return e>=t.i.length&&t.i.push({}),t.i[e]}function _(e){return function(e,t,n){var l=s(r++);return l.__c||(l.__c=o,l.o=[n?n(t):m(null,t),function(t){var n=e(l.o[0],t);l.o[0]!==n&&(l.o[0]=n,l.__c.setState({}))}]),l.o}(m,e)}function f(e,t){var n=s(r++);return y(n.v,t)?(n.v=t,n.m=e,n.o=e()):n.o}l.b.unmount=function(e){a&&a(e);var t=e.__c;if(t){var n=t.__H;n&&n.i.forEach(function(e){return e.p&&e.p()})}};function p(){u.some(function(e){e.l=!1,e.__P&&(e.__H.t=d(e.__H.t))}),u=[]}function d(e){return e.forEach(v),e.forEach(h),[]}function v(e){e.p&&e.p()}function h(e){var t=e.o();"function"==typeof t&&(e.p=t)}function y(e,t){return!e||t.some(function(t,n){return t!==e[n]})}function m(e,t){return"function"==typeof t?t(e):t}n.d(t,"b",function(){return g}),n.d(t,"a",function(){return b}),n.d(t,"c",function(){return _});const g=e=>{const[t,n]=_(e);return[t,(e,l=(()=>{}))=>{n(e),function(e,t){var n=s(r++);y(n.v,t)&&(n.o=e,n.v=t,o.__H.u.push(n))}(()=>l(t))}]},b=e=>{const[t,n]=_(null);return[t,function(e,t){return f(function(){return e},t)}(t=>{t&&(n(t),e(t))},[])]}},function(e,t,n){"use strict";n.d(t,"a",function(){return i});const r=Symbol("Comlink.proxy"),o=Symbol("Comlink.endpoint"),l=new WeakSet,u=new Map([["proxy",{canHandle:e=>e&&e[r],serialize(e){const{port1:t,port2:n}=new MessageChannel;return function e(t,n=self){n.addEventListener("message",async o=>{if(!o||!o.data)return;const{id:u,type:i,path:c}={path:[],...o.data},f=(o.data.argumentList||[]).map(_);let p;try{const n=c.slice(0,-1).reduce((e,t)=>e[t],t),u=c.reduce((e,t)=>e[t],t);switch(i){case 0:p=await u;break;case 1:n[c.slice(-1)[0]]=_(o.data.value),p=!0;break;case 2:p=await u.apply(n,f);break;case 3:{const e=await new u(...f);p=function(e){return Object.assign(e,{[r]:!0})}(e)}break;case 4:{const{port1:n,port2:r}=new MessageChannel;e(t,r),p=function(e,t){return a.set(e,t),e}(n,[n])}break;default:console.warn("Unrecognized message",o.data)}}catch(e){p=e,l.add(e)}const[d,v]=s(p);n.postMessage({...d,id:u},v)});n.start&&n.start()}(e,t),[n,[n]]},deserialize:e=>(e.start(),i(e))}],["throw",{canHandle:e=>l.has(e),serialize(e){const t=e instanceof Error;let n=e;return t&&(n={isError:t,message:e.message,stack:e.stack}),[n,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error,e);throw e}}]]);function i(e){return function e(t,n=[]){const r=new Proxy(function(){},{get(o,l){if("then"===l){if(0===n.length)return{then:()=>r};const e=f(t,{type:0,path:n.map(e=>e.toString())}).then(_);return e.then.bind(e)}return e(t,[...n,l])},set(e,r,o){const[l,u]=s(o);return f(t,{type:1,path:[...n,r].map(e=>e.toString()),value:l},u).then(_)},apply(r,l,u){const i=n[n.length-1];if(i===o)return f(t,{type:4}).then(_);if("bind"===i)return e(t,n.slice(0,-1));const[a,s]=c(u);return f(t,{type:2,path:n.map(e=>e.toString()),argumentList:a},s).then(_)},construct(e,r){const[o,l]=c(r);return f(t,{type:3,path:n.map(e=>e.toString()),argumentList:o},l).then(_)}});return r}(e)}function c(e){const t=e.map(s);return[t.map(e=>e[0]),(n=t.map(e=>e[1]),Array.prototype.concat.apply([],n))];var n}const a=new WeakMap;function s(e){for(const[t,n]of u)if(n.canHandle(e)){const[r,o]=n.serialize(e);return[{type:3,name:t,value:r},o]}return[{type:0,value:e},a.get(e)||[]]}function _(e){switch(e.type){case 3:return u.get(e.name).deserialize(e.value);case 0:return e.value}}function f(e,t,n){return new Promise(r=>{const o=new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-");e.addEventListener("message",function t(n){n.data&&n.data.id&&n.data.id===o&&(e.removeEventListener("message",t),r(n.data))}),e.start&&e.start(),e.postMessage({id:o,...t},n)})}},function(e,t,n){"use strict";n.r(t),function(e){var t=n(0),r=n(2),o=n(3),l=n(1),u=(n(6),n(7),function(e,t,n,r){return new(n||(n=Promise))(function(o,l){function u(e){try{c(r.next(e))}catch(e){l(e)}}function i(e){try{c(r.throw(e))}catch(e){l(e)}}function c(e){e.done?o(e.value):new n(function(t){t(e.value)}).then(u,i)}c((r=r.apply(e,t||[])).next())})});const i=({worker:e,data:n})=>{const[o,i]=Object(r.b)(n.markdown),[c,a]=Object(r.c)(n.html),[s,_]=Object(r.a)(e=>Object(l.b)(e,n.cursor));return Object(t.a)("div",{className:"container",tabIndex:0,onKeyDown:t=>u(void 0,void 0,void 0,function*(){if(t.ctrlKey&&"f"===t.key){t.preventDefault();const{formatted:n,cursorOffset:r}=yield e.format(o,s.selectionStart);i(n,()=>Object(l.b)(s,r))}else t.ctrlKey&&"s"===t.key?(t.preventDefault(),e.save(o,s.selectionStart)):t.ctrlKey&&"d"===t.key&&(t.preventDefault(),Object(l.a)(o))})},Object(t.a)("textarea",{className:"edit-area",ref:_,value:o,onInput:t=>u(void 0,void 0,void 0,function*(){const n=t.target.value;i(n),a(yield e.md2html(n))}),autoFocus:!0,spellcheck:!1,placeholder:"# mdpreview"}),Object(t.a)("div",{className:"markdown-body",dangerouslySetInnerHTML:{__html:c}}))};(()=>u(void 0,void 0,void 0,function*(){addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js"));const n=Object(o.a)(new Worker(e,{})),r=yield new n,l=yield r.load();Object(t.c)(Object(t.a)(i,{worker:r,data:l}),document.body)}))()}.call(this,n(5))},function(e,t,n){e.exports=n.p+"0.worker.js"},function(e,t,n){},function(e,t,n){}]);