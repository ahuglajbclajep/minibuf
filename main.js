!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t,n){e.exports=n(2).wrap(n(3)()),e.exports.__esModule=!0},function(e,t,n){},function(e,t,n){"use strict";n.r(t),n.d(t,"createEndpoint",(function(){return o})),n.d(t,"expose",(function(){return l})),n.d(t,"proxy",(function(){return h})),n.d(t,"proxyMarker",(function(){return r})),n.d(t,"releaseProxy",(function(){return i})),n.d(t,"transfer",(function(){return d})),n.d(t,"transferHandlers",(function(){return u})),n.d(t,"windowEndpoint",(function(){return v})),n.d(t,"wrap",(function(){return s}));const r=Symbol("Comlink.proxy"),o=Symbol("Comlink.endpoint"),i=Symbol("Comlink.releaseProxy"),a=new WeakSet,u=new Map([["proxy",{canHandle:e=>e&&e[r],serialize(e){const{port1:t,port2:n}=new MessageChannel;return l(e,t),[n,[n]]},deserialize:e=>(e.start(),s(e))}],["throw",{canHandle:e=>a.has(e),serialize(e){const t=e instanceof Error;let n=e;return t&&(n={isError:t,message:e.message,stack:e.stack}),[n,[]]},deserialize(e){if(e.isError)throw Object.assign(new Error,e);throw e}}]]);function l(e,t=self){t.addEventListener("message",(function n(r){if(!r||!r.data)return;const{id:o,type:i,path:u}=Object.assign({path:[]},r.data),s=(r.data.argumentList||[]).map(y);let _;try{const t=u.slice(0,-1).reduce((e,t)=>e[t],e),n=u.reduce((e,t)=>e[t],e);switch(i){case 0:_=n;break;case 1:t[u.slice(-1)[0]]=y(r.data.value),_=!0;break;case 2:_=n.apply(t,s);break;case 3:_=h(new n(...s));break;case 4:{const{port1:t,port2:n}=new MessageChannel;l(e,n),_=d(t,[t])}break;case 5:_=void 0}}catch(e){_=e,a.add(e)}Promise.resolve(_).catch(e=>(a.add(e),e)).then(e=>{const[r,a]=m(e);t.postMessage(Object.assign(Object.assign({},r),{id:o}),a),5===i&&(t.removeEventListener("message",n),c(t))})})),t.start&&t.start()}function c(e){(function(e){return"MessagePort"===e.constructor.name})(e)&&e.close()}function s(e,t){return function e(t,n=[],r=function(){}){let a=!1;const u=new Proxy(r,{get(r,o){if(_(a),o===i)return()=>b(t,{type:5,path:n.map(e=>e.toString())}).then(()=>{c(t),a=!0});if("then"===o){if(0===n.length)return{then:()=>u};const e=b(t,{type:0,path:n.map(e=>e.toString())}).then(y);return e.then.bind(e)}return e(t,[...n,o])},set(e,r,o){_(a);const[i,u]=m(o);return b(t,{type:1,path:[...n,r].map(e=>e.toString()),value:i},u).then(y)},apply(r,i,u){_(a);const l=n[n.length-1];if(l===o)return b(t,{type:4}).then(y);if("bind"===l)return e(t,n.slice(0,-1));const[c,s]=f(u);return b(t,{type:2,path:n.map(e=>e.toString()),argumentList:c},s).then(y)},construct(e,r){_(a);const[o,i]=f(r);return b(t,{type:3,path:n.map(e=>e.toString()),argumentList:o},i).then(y)}});return u}(e,[],t)}function _(e){if(e)throw new Error("Proxy has been released and is not useable")}function f(e){const t=e.map(m);return[t.map(e=>e[0]),(n=t.map(e=>e[1]),Array.prototype.concat.apply([],n))];var n}const p=new WeakMap;function d(e,t){return p.set(e,t),e}function h(e){return Object.assign(e,{[r]:!0})}function v(e,t=self,n="*"){return{postMessage:(t,r)=>e.postMessage(t,n,r),addEventListener:t.addEventListener.bind(t),removeEventListener:t.removeEventListener.bind(t)}}function m(e){for(const[t,n]of u)if(n.canHandle(e)){const[r,o]=n.serialize(e);return[{type:3,name:t,value:r},o]}return[{type:0,value:e},p.get(e)||[]]}function y(e){switch(e.type){case 3:return u.get(e.name).deserialize(e.value);case 0:return e.value}}function b(e,t,n){return new Promise(r=>{const o=new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-");e.addEventListener("message",(function t(n){n.data&&n.data.id&&n.data.id===o&&(e.removeEventListener("message",t),r(n.data))})),e.start&&e.start(),e.postMessage(Object.assign({id:o},t),n)})}},function(e,t,n){e.exports=function(){return new Worker(n.p+"worker.js")}},function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(1);var r,o,i,a,u,l,c={},s=[],_=/acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord/i;function f(e,t){for(var n in t)e[n]=t[n];return e}function p(e){var t=e.parentNode;t&&t.removeChild(e)}function d(e,t,n){var r,o=arguments,i={};for(r in t)"key"!==r&&"ref"!==r&&(i[r]=t[r]);if(arguments.length>3)for(n=[n],r=3;r<arguments.length;r++)n.push(o[r]);if(null!=n&&(i.children=n),"function"==typeof e&&null!=e.defaultProps)for(r in e.defaultProps)void 0===i[r]&&(i[r]=e.defaultProps[r]);return h(e,i,t&&t.key,t&&t.ref,null)}function h(e,t,n,o,i){var a={type:e,props:t,key:n,ref:o,__k:null,__:null,__b:0,__e:null,__d:void 0,__c:null,constructor:void 0,__v:i};return null==i&&(a.__v=a),r.vnode&&r.vnode(a),a}function v(e){return e.children}function m(e,t){this.props=e,this.context=t}function y(e,t){if(null==t)return e.__?y(e.__,e.__.__k.indexOf(e)+1):null;for(var n;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e)return n.__e;return"function"==typeof e.type?y(e):null}function b(e){var t,n;if(null!=(e=e.__)&&null!=e.__c){for(e.__e=e.__c.base=null,t=0;t<e.__k.length;t++)if(null!=(n=e.__k[t])&&null!=n.__e){e.__e=e.__c.base=n.__e;break}return b(e)}}function g(e){(!e.__d&&(e.__d=!0)&&o.push(e)&&!i++||u!==r.debounceRendering)&&((u=r.debounceRendering)||a)(k)}function k(){for(var e;i=o.length;)e=o.sort((function(e,t){return e.__v.__b-t.__v.__b})),o=[],e.some((function(e){var t,n,r,o,i,a,u;e.__d&&(a=(i=(t=e).__v).__e,(u=t.__P)&&(n=[],(r=f({},i)).__v=r,o=C(u,i,r,t.__n,void 0!==u.ownerSVGElement,null,n,null==a?y(i):a),A(n,i),o!=a&&b(i)))}))}function w(e,t,n,r,o,i,a,u,l){var _,f,d,h,v,m,b,g=n&&n.__k||s,k=g.length;if(u==c&&(u=null!=i?i[0]:k?y(n,0):null),_=0,t.__k=S(t.__k,(function(n){if(null!=n){if(n.__=t,n.__b=t.__b+1,null===(d=g[_])||d&&n.key==d.key&&n.type===d.type)g[_]=void 0;else for(f=0;f<k;f++){if((d=g[f])&&n.key==d.key&&n.type===d.type){g[f]=void 0;break}d=null}if(h=C(e,n,d=d||c,r,o,i,a,u,l),(f=n.ref)&&d.ref!=f&&(b||(b=[]),d.ref&&b.push(d.ref,null,n),b.push(f,n.__c||h,n)),null!=h){var s;if(null==m&&(m=h),void 0!==n.__d)s=n.__d,n.__d=void 0;else if(i==d||h!=u||null==h.parentNode){e:if(null==u||u.parentNode!==e)e.appendChild(h),s=null;else{for(v=u,f=0;(v=v.nextSibling)&&f<k;f+=2)if(v==h)break e;e.insertBefore(h,u),s=u}"option"==t.type&&(e.value="")}u=void 0!==s?s:h.nextSibling,"function"==typeof t.type&&(t.__d=u)}else u&&d.__e==u&&u.parentNode!=e&&(u=y(d))}return _++,n})),t.__e=m,null!=i&&"function"!=typeof t.type)for(_=i.length;_--;)null!=i[_]&&p(i[_]);for(_=k;_--;)null!=g[_]&&O(g[_],g[_]);if(b)for(_=0;_<b.length;_++)T(b[_],b[++_],b[++_])}function S(e,t,n){if(null==n&&(n=[]),null==e||"boolean"==typeof e)t&&n.push(t(null));else if(Array.isArray(e))for(var r=0;r<e.length;r++)S(e[r],t,n);else n.push(t?t("string"==typeof e||"number"==typeof e?h(null,e,null,null,e):null!=e.__e||null!=e.__c?h(e.type,e.props,e.key,null,e.__v):e):e);return n}function N(e,t,n){"-"===t[0]?e.setProperty(t,n):e[t]="number"==typeof n&&!1===_.test(t)?n+"px":null==n?"":n}function E(e,t,n,r,o){var i,a,u,l,c;if(o?"className"===t&&(t="class"):"class"===t&&(t="className"),"style"===t)if(i=e.style,"string"==typeof n)i.cssText=n;else{if("string"==typeof r&&(i.cssText="",r=null),r)for(l in r)n&&l in n||N(i,l,"");if(n)for(c in n)r&&n[c]===r[c]||N(i,c,n[c])}else"o"===t[0]&&"n"===t[1]?(a=t!==(t=t.replace(/Capture$/,"")),u=t.toLowerCase(),t=(u in e?u:t).slice(2),n?(r||e.addEventListener(t,x,a),(e.l||(e.l={}))[t]=n):e.removeEventListener(t,x,a)):"list"!==t&&"tagName"!==t&&"form"!==t&&"type"!==t&&"size"!==t&&!o&&t in e?e[t]=null==n?"":n:"function"!=typeof n&&"dangerouslySetInnerHTML"!==t&&(t!==(t=t.replace(/^xlink:?/,""))?null==n||!1===n?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),n):null==n||!1===n&&!/^ar/.test(t)?e.removeAttribute(t):e.setAttribute(t,n))}function x(e){this.l[e.type](r.event?r.event(e):e)}function C(e,t,n,o,i,a,u,l,c){var s,_,p,d,h,y,b,g,k,S,N=t.type;if(void 0!==t.constructor)return null;(s=r.__b)&&s(t);try{e:if("function"==typeof N){if(g=t.props,k=(s=N.contextType)&&o[s.__c],S=s?k?k.props.value:s.__:o,n.__c?b=(_=t.__c=n.__c).__=_.__E:("prototype"in N&&N.prototype.render?t.__c=_=new N(g,S):(t.__c=_=new m(g,S),_.constructor=N,_.render=M),k&&k.sub(_),_.props=g,_.state||(_.state={}),_.context=S,_.__n=o,p=_.__d=!0,_.__h=[]),null==_.__s&&(_.__s=_.state),null!=N.getDerivedStateFromProps&&(_.__s==_.state&&(_.__s=f({},_.__s)),f(_.__s,N.getDerivedStateFromProps(g,_.__s))),d=_.props,h=_.state,p)null==N.getDerivedStateFromProps&&null!=_.componentWillMount&&_.componentWillMount(),null!=_.componentDidMount&&_.__h.push(_.componentDidMount);else{if(null==N.getDerivedStateFromProps&&g!==d&&null!=_.componentWillReceiveProps&&_.componentWillReceiveProps(g,S),!_.__e&&null!=_.shouldComponentUpdate&&!1===_.shouldComponentUpdate(g,_.__s,S)||t.__v===n.__v&&!_.__){for(_.props=g,_.state=_.__s,t.__v!==n.__v&&(_.__d=!1),_.__v=t,t.__e=n.__e,t.__k=n.__k,_.__h.length&&u.push(_),s=0;s<t.__k.length;s++)t.__k[s]&&(t.__k[s].__=t);break e}null!=_.componentWillUpdate&&_.componentWillUpdate(g,_.__s,S),null!=_.componentDidUpdate&&_.__h.push((function(){_.componentDidUpdate(d,h,y)}))}_.context=S,_.props=g,_.state=_.__s,(s=r.__r)&&s(t),_.__d=!1,_.__v=t,_.__P=e,s=_.render(_.props,_.state,_.context),t.__k=null!=s&&s.type==v&&null==s.key?s.props.children:Array.isArray(s)?s:[s],null!=_.getChildContext&&(o=f(f({},o),_.getChildContext())),p||null==_.getSnapshotBeforeUpdate||(y=_.getSnapshotBeforeUpdate(d,h)),w(e,t,n,o,i,a,u,l,c),_.base=t.__e,_.__h.length&&u.push(_),b&&(_.__E=_.__=null),_.__e=!1}else null==a&&t.__v===n.__v?(t.__k=n.__k,t.__e=n.__e):t.__e=P(n.__e,t,n,o,i,a,u,c);(s=r.diffed)&&s(t)}catch(e){t.__v=null,r.__e(e,t,n)}return t.__e}function A(e,t){r.__c&&r.__c(t,e),e.some((function(t){try{e=t.__h,t.__h=[],e.some((function(e){e.call(t)}))}catch(e){r.__e(e,t.__v)}}))}function P(e,t,n,r,o,i,a,u){var l,_,f,p,d,h=n.props,v=t.props;if(o="svg"===t.type||o,null!=i)for(l=0;l<i.length;l++)if(null!=(_=i[l])&&((null===t.type?3===_.nodeType:_.localName===t.type)||e==_)){e=_,i[l]=null;break}if(null==e){if(null===t.type)return document.createTextNode(v);e=o?document.createElementNS("http://www.w3.org/2000/svg",t.type):document.createElement(t.type,v.is&&{is:v.is}),i=null,u=!1}if(null===t.type)h!==v&&e.data!=v&&(e.data=v);else{if(null!=i&&(i=s.slice.call(e.childNodes)),f=(h=n.props||c).dangerouslySetInnerHTML,p=v.dangerouslySetInnerHTML,!u){if(h===c)for(h={},d=0;d<e.attributes.length;d++)h[e.attributes[d].name]=e.attributes[d].value;(p||f)&&(p&&f&&p.__html==f.__html||(e.innerHTML=p&&p.__html||""))}(function(e,t,n,r,o){var i;for(i in n)"children"===i||"key"===i||i in t||E(e,i,null,n[i],r);for(i in t)o&&"function"!=typeof t[i]||"children"===i||"key"===i||"value"===i||"checked"===i||n[i]===t[i]||E(e,i,t[i],n[i],r)})(e,v,h,o,u),p?t.__k=[]:(t.__k=t.props.children,w(e,t,n,r,"foreignObject"!==t.type&&o,i,a,c,u)),u||("value"in v&&void 0!==(l=v.value)&&l!==e.value&&E(e,"value",l,h.value,!1),"checked"in v&&void 0!==(l=v.checked)&&l!==e.checked&&E(e,"checked",l,h.checked,!1))}return e}function T(e,t,n){try{"function"==typeof e?e(t):e.current=t}catch(e){r.__e(e,n)}}function O(e,t,n){var o,i,a;if(r.unmount&&r.unmount(e),(o=e.ref)&&(o.current&&o.current!==e.__e||T(o,null,t)),n||"function"==typeof e.type||(n=null!=(i=e.__e)),e.__e=e.__d=void 0,null!=(o=e.__c)){if(o.componentWillUnmount)try{o.componentWillUnmount()}catch(e){r.__e(e,t)}o.base=o.__P=null}if(o=e.__k)for(a=0;a<o.length;a++)o[a]&&O(o[a],t,n);null!=i&&p(i)}function M(e,t,n){return this.constructor(e,n)}function U(e,t,n){var o,i,a;r.__&&r.__(e,t),i=(o=n===l)?null:n&&n.__k||t.__k,e=d(v,null,[e]),a=[],C(t,(o?t:n||t).__k=e,i||c,c,void 0!==t.ownerSVGElement,n&&!o?[n]:i?null:s.slice.call(t.childNodes),a,n||c,o),A(a,e)}r={__e:function(e,t){for(var n,r;t=t.__;)if((n=t.__c)&&!n.__)try{if(n.constructor&&null!=n.constructor.getDerivedStateFromError&&(r=!0,n.setState(n.constructor.getDerivedStateFromError(e))),null!=n.componentDidCatch&&(r=!0,n.componentDidCatch(e)),r)return g(n.__E=n)}catch(t){e=t}throw e}},m.prototype.setState=function(e,t){var n;n=this.__s!==this.state?this.__s:this.__s=f({},this.state),"function"==typeof e&&(e=e(n,this.props)),e&&f(n,e),null!=e&&this.__v&&(t&&this.__h.push(t),g(this))},m.prototype.forceUpdate=function(e){this.__v&&(this.__e=!0,e&&this.__h.push(e),g(this))},m.prototype.render=v,o=[],i=0,a="function"==typeof Promise?Promise.prototype.then.bind(Promise.resolve()):setTimeout,l=c;var L,H,j,D=0,R=[],F=r.__r,W=r.diffed,I=r.__c,B=r.unmount;function z(e,t){r.__h&&r.__h(H,e,D||t),D=0;var n=H.__H||(H.__H={__:[],__h:[]});return e>=n.__.length&&n.__.push({}),n.__[e]}function V(e){return D=1,$(te,e)}function $(e,t,n){var r=z(L++,2);return r.__c||(r.__c=H,r.__=[n?n(t):te(void 0,t),function(t){var n=e(r.__[0],t);r.__[0]!==n&&(r.__[0]=n,r.__c.setState({}))}]),r.__}function G(e,t){var n=z(L++,3);!r.__s&&ee(n.__H,t)&&(n.__=e,n.__H=t,H.__H.__h.push(n))}function q(e,t){var n=z(L++,4);!r.__s&&ee(n.__H,t)&&(n.__=e,n.__H=t,H.__h.push(n))}function X(e){return D=5,K((function(){return{current:e}}),[])}function K(e,t){var n=z(L++,7);return ee(n.__H,t)?(n.__H=t,n.__h=e,n.__=e()):n.__}function Z(e,t){return D=8,K((function(){return e}),t)}function Y(){R.some((function(e){if(e.__P)try{e.__H.__h.forEach(J),e.__H.__h.forEach(Q),e.__H.__h=[]}catch(t){return e.__H.__h=[],r.__e(t,e.__v),!0}})),R=[]}function J(e){e.t&&e.t()}function Q(e){var t=e.__();"function"==typeof t&&(e.t=t)}function ee(e,t){return!e||t.some((function(t,n){return t!==e[n]}))}function te(e,t){return"function"==typeof t?t(e):t}r.__r=function(e){F&&F(e),L=0,(H=e.__c).__H&&(H.__H.__h.forEach(J),H.__H.__h.forEach(Q),H.__H.__h=[])},r.diffed=function(e){W&&W(e);var t=e.__c;if(t){var n=t.__H;n&&n.__h.length&&(1!==R.push(t)&&j===r.requestAnimationFrame||((j=r.requestAnimationFrame)||function(e){var t,n=function(){clearTimeout(r),cancelAnimationFrame(t),setTimeout(e)},r=setTimeout(n,100);"undefined"!=typeof window&&(t=requestAnimationFrame(n))})(Y))}},r.__c=function(e,t){t.some((function(e){try{e.__h.forEach(J),e.__h=e.__h.filter((function(e){return!e.__||Q(e)}))}catch(n){t.some((function(e){e.__h&&(e.__h=[])})),t=[],r.__e(n,e.__v)}})),I&&I(e,t)},r.unmount=function(e){B&&B(e);var t=e.__c;if(t){var n=t.__H;if(n)try{n.__.forEach((function(e){return e.t&&e.t()}))}catch(e){r.__e(e,t.__v)}}};class ne{constructor(e="keyval-store",t="keyval"){this.storeName=t,this._dbp=new Promise((n,r)=>{const o=indexedDB.open(e,1);o.onerror=()=>r(o.error),o.onsuccess=()=>n(o.result),o.onupgradeneeded=()=>{o.result.createObjectStore(t)}})}_withIDBStore(e,t){return this._dbp.then(n=>new Promise((r,o)=>{const i=n.transaction(this.storeName,e);i.oncomplete=()=>r(),i.onabort=i.onerror=()=>o(i.error),t(i.objectStore(this.storeName))}))}}let re;function oe(){return re||(re=new ne),re}const ie=e=>{const[t,n]=V(e);return[t,Z(()=>n(e=>!e),[]),n]},ae=e=>[Z(t=>function(e,t,n=oe()){return n._withIDBStore("readwrite",n=>{n.put(t,e)})}("minibuf-"+e,t),[]),Z(()=>function(e,t=oe()){let n;return t._withIDBStore("readonly",t=>{n=t.get(e)}).then(()=>n.result)}("minibuf-"+e),[])],ue=(e,t)=>{const n=X(null);n.current=t,G(()=>{const t=t=>{t.ctrlKey&&t.key===e&&(t.preventDefault(),n.current(t))};return window.addEventListener("keydown",t),()=>{window.removeEventListener("keydown",t)}},[])};var le;var ce="undefined"==typeof document?void 0:document,se=!!ce&&"content"in ce.createElement("template"),_e=!!ce&&ce.createRange&&"createContextualFragment"in ce.createRange();function fe(e){return e=e.trim(),se?function(e){var t=ce.createElement("template");return t.innerHTML=e,t.content.childNodes[0]}(e):_e?function(e){return le||(le=ce.createRange()).selectNode(ce.body),le.createContextualFragment(e).childNodes[0]}(e):function(e){var t=ce.createElement("body");return t.innerHTML=e,t.childNodes[0]}(e)}function pe(e,t){var n=e.nodeName,r=t.nodeName;return n===r||!!(t.actualize&&n.charCodeAt(0)<91&&r.charCodeAt(0)>90)&&n===r.toUpperCase()}function de(e,t,n){e[n]!==t[n]&&(e[n]=t[n],e[n]?e.setAttribute(n,""):e.removeAttribute(n))}var he={OPTION:function(e,t){var n=e.parentNode;if(n){var r=n.nodeName.toUpperCase();"OPTGROUP"===r&&(r=(n=n.parentNode)&&n.nodeName.toUpperCase()),"SELECT"!==r||n.hasAttribute("multiple")||(e.hasAttribute("selected")&&!t.selected&&(e.setAttribute("selected","selected"),e.removeAttribute("selected")),n.selectedIndex=-1)}de(e,t,"selected")},INPUT:function(e,t){de(e,t,"checked"),de(e,t,"disabled"),e.value!==t.value&&(e.value=t.value),t.hasAttribute("value")||e.removeAttribute("value")},TEXTAREA:function(e,t){var n=t.value;e.value!==n&&(e.value=n);var r=e.firstChild;if(r){var o=r.nodeValue;if(o==n||!n&&o==e.placeholder)return;r.nodeValue=n}},SELECT:function(e,t){if(!t.hasAttribute("multiple")){for(var n,r,o=-1,i=0,a=e.firstChild;a;)if("OPTGROUP"===(r=a.nodeName&&a.nodeName.toUpperCase()))a=(n=a).firstChild;else{if("OPTION"===r){if(a.hasAttribute("selected")){o=i;break}i++}!(a=a.nextSibling)&&n&&(a=n.nextSibling,n=null)}e.selectedIndex=o}}};function ve(){}function me(e){if(e)return e.getAttribute&&e.getAttribute("id")||e.id}var ye=function(e){return function(t,n,r){if(r||(r={}),"string"==typeof n)if("#document"===t.nodeName||"HTML"===t.nodeName){var o=n;(n=ce.createElement("html")).innerHTML=o}else n=fe(n);var i=r.getNodeKey||me,a=r.onBeforeNodeAdded||ve,u=r.onNodeAdded||ve,l=r.onBeforeElUpdated||ve,c=r.onElUpdated||ve,s=r.onBeforeNodeDiscarded||ve,_=r.onNodeDiscarded||ve,f=r.onBeforeElChildrenUpdated||ve,p=!0===r.childrenOnly,d=Object.create(null),h=[];function v(e){h.push(e)}function m(e,t,n){!1!==s(e)&&(t&&t.removeChild(e),_(e),function e(t,n){if(1===t.nodeType)for(var r=t.firstChild;r;){var o=void 0;n&&(o=i(r))?v(o):(_(r),r.firstChild&&e(r,n)),r=r.nextSibling}}(e,n))}function y(e){u(e);for(var t=e.firstChild;t;){var n=t.nextSibling,r=i(t);if(r){var o=d[r];o&&pe(t,o)&&(t.parentNode.replaceChild(o,t),b(o,t))}y(t),t=n}}function b(t,n,r){var o=i(n);if(o&&delete d[o],!r){if(!1===l(t,n))return;if(e(t,n),c(t),!1===f(t,n))return}"TEXTAREA"!==t.nodeName?function(e,t){var n,r,o,u,l,c=t.firstChild,s=e.firstChild;e:for(;c;){for(u=c.nextSibling,n=i(c);s;){if(o=s.nextSibling,c.isSameNode&&c.isSameNode(s)){c=u,s=o;continue e}r=i(s);var _=s.nodeType,f=void 0;if(_===c.nodeType&&(1===_?(n?n!==r&&((l=d[n])?o===l?f=!1:(e.insertBefore(l,s),r?v(r):m(s,e,!0),s=l):f=!1):r&&(f=!1),(f=!1!==f&&pe(s,c))&&b(s,c)):3!==_&&8!=_||(f=!0,s.nodeValue!==c.nodeValue&&(s.nodeValue=c.nodeValue))),f){c=u,s=o;continue e}r?v(r):m(s,e,!0),s=o}if(n&&(l=d[n])&&pe(l,c))e.appendChild(l),b(l,c);else{var p=a(c);!1!==p&&(p&&(c=p),c.actualize&&(c=c.actualize(e.ownerDocument||ce)),e.appendChild(c),y(c))}c=u,s=o}!function(e,t,n){for(;t;){var r=t.nextSibling;(n=i(t))?v(n):m(t,e,!0),t=r}}(e,s,r);var h=he[e.nodeName];h&&h(e,t)}(t,n):he.TEXTAREA(t,n)}!function e(t){if(1===t.nodeType||11===t.nodeType)for(var n=t.firstChild;n;){var r=i(n);r&&(d[r]=n),e(n),n=n.nextSibling}}(t);var g,k,w=t,S=w.nodeType,N=n.nodeType;if(!p)if(1===S)1===N?pe(t,n)||(_(t),w=function(e,t){for(var n=e.firstChild;n;){var r=n.nextSibling;t.appendChild(n),n=r}return t}(t,(g=n.nodeName,(k=n.namespaceURI)&&"http://www.w3.org/1999/xhtml"!==k?ce.createElementNS(k,g):ce.createElement(g)))):w=n;else if(3===S||8===S){if(N===S)return w.nodeValue!==n.nodeValue&&(w.nodeValue=n.nodeValue),w;w=n}if(w===n)_(t);else{if(n.isSameNode&&n.isSameNode(w))return;if(b(w,n,p),h)for(var E=0,x=h.length;E<x;E++){var C=d[h[E]];C&&m(C,C.parentNode,!1)}}return!p&&w!==t&&t.parentNode&&(w.actualize&&(w=w.actualize(t.ownerDocument||ce)),t.parentNode.replaceChild(w,t)),w}}((function(e,t){var n,r,o,i,a=t.attributes;if(11!==t.nodeType&&11!==e.nodeType){for(var u=a.length-1;u>=0;u--)r=(n=a[u]).name,o=n.namespaceURI,i=n.value,o?(r=n.localName||r,e.getAttributeNS(o,r)!==i&&("xmlns"===n.prefix&&(r=n.name),e.setAttributeNS(o,r,i))):e.getAttribute(r)!==i&&e.setAttribute(r,i);for(var l=e.attributes,c=l.length-1;c>=0;c--)r=(n=l[c]).name,(o=n.namespaceURI)?(r=n.localName||r,t.hasAttributeNS(o,r)||e.removeAttributeNS(o,r)):t.hasAttribute(r)||e.removeAttribute(r)}}));function be(e,t){for(var n in t)e[n]=t[n];return e}function ge(e,t){for(var n in e)if("__source"!==n&&!(n in t))return!0;for(var r in t)if("__source"!==r&&e[r]!==t[r])return!0;return!1}!function(e){var t,n;function r(t){var n;return(n=e.call(this,t)||this).isPureReactComponent=!0,n}n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,r.prototype.shouldComponentUpdate=function(e,t){return ge(this.props,e)||ge(this.state,t)}}(m);function ke(e,t){function n(e){var n=this.props.ref,r=n==e.ref;return!r&&n&&(n.call?n(null):n.current=null),t?!t(this.props,e)||!r:ge(this.props,e)}function r(t){return this.shouldComponentUpdate=n,d(e,be({},t))}return r.prototype.isReactComponent=!0,r.displayName="Memo("+(e.displayName||e.name)+")",r.t=!0,r}var we=r.__b;r.__b=function(e){e.type&&e.type.t&&e.ref&&(e.props.ref=e.ref,e.ref=null),we&&we(e)};var Se=r.__e;function Ne(e){return e&&((e=be({},e)).__c=null,e.__k=e.__k&&e.__k.map(Ne)),e}function Ee(){this.__u=0,this.o=null,this.__b=null}function xe(e){var t=e.__.__c;return t&&t.u&&t.u(e)}function Ce(){this.i=null,this.l=null}r.__e=function(e,t,n){if(e.then)for(var r,o=t;o=o.__;)if((r=o.__c)&&r.__c)return r.__c(e,t.__c);Se(e,t,n)},(Ee.prototype=new m).__c=function(e,t){var n=this;null==n.o&&(n.o=[]),n.o.push(t);var r=xe(n.__v),o=!1,i=function(){o||(o=!0,r?r(a):a())};t.__c=t.componentWillUnmount,t.componentWillUnmount=function(){i(),t.__c&&t.__c()};var a=function(){var e;if(!--n.__u)for(n.__v.__k[0]=n.state.u,n.setState({u:n.__b=null});e=n.o.pop();)e.forceUpdate()};n.__u++||n.setState({u:n.__b=n.__v.__k[0]}),e.then(i,i)},Ee.prototype.render=function(e,t){return this.__b&&(this.__v.__k[0]=Ne(this.__b),this.__b=null),[d(m,null,t.u?null:e.children),t.u&&e.fallback]};var Ae=function(e,t,n){if(++n[1]===n[0]&&e.l.delete(t),e.props.revealOrder&&("t"!==e.props.revealOrder[0]||!e.l.size))for(n=e.i;n;){for(;n.length>3;)n.pop()();if(n[1]<n[0])break;e.i=n=n[2]}};(Ce.prototype=new m).u=function(e){var t=this,n=xe(t.__v),r=t.l.get(e);return r[0]++,function(o){var i=function(){t.props.revealOrder?(r.push(o),Ae(t,e,r)):o()};n?n(i):i()}},Ce.prototype.render=function(e){this.i=null,this.l=new Map;var t=S(e.children);e.revealOrder&&"b"===e.revealOrder[0]&&t.reverse();for(var n=t.length;n--;)this.l.set(t[n],this.i=[1,0,this.i]);return e.children},Ce.prototype.componentDidUpdate=Ce.prototype.componentDidMount=function(){var e=this;e.l.forEach((function(t,n){Ae(e,n,t)}))};!function(){function e(){}var t=e.prototype;t.getChildContext=function(){return this.props.context},t.render=function(e){return e.children}}();var Pe=/^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|fill|flood|font|glyph(?!R)|horiz|marker(?!H|W|U)|overline|paint|stop|strikethrough|stroke|text(?!L)|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/;m.prototype.isReactComponent={};var Te="undefined"!=typeof Symbol&&Symbol.for&&Symbol.for("react.element")||60103;var Oe=r.event;function Me(e,t){e["UNSAFE_"+t]&&!e[t]&&Object.defineProperty(e,t,{configurable:!1,get:function(){return this["UNSAFE_"+t]},set:function(e){this["UNSAFE_"+t]=e}})}r.event=function(e){Oe&&(e=Oe(e)),e.persist=function(){};var t=!1,n=!1,r=e.stopPropagation;e.stopPropagation=function(){r.call(e),t=!0};var o=e.preventDefault;return e.preventDefault=function(){o.call(e),n=!0},e.isPropagationStopped=function(){return t},e.isDefaultPrevented=function(){return n},e.nativeEvent=e};var Ue={configurable:!0,get:function(){return this.class}},Le=r.vnode;r.vnode=function(e){e.$$typeof=Te;var t=e.type,n=e.props;if(t){if(n.class!=n.className&&(Ue.enumerable="className"in n,null!=n.className&&(n.class=n.className),Object.defineProperty(n,"className",Ue)),"function"!=typeof t){var r,o,i;for(i in n.defaultValue&&void 0!==n.value&&(n.value||0===n.value||(n.value=n.defaultValue),delete n.defaultValue),Array.isArray(n.value)&&n.multiple&&"select"===t&&(S(n.children).forEach((function(e){-1!=n.value.indexOf(e.props.value)&&(e.props.selected=!0)})),delete n.value),n)if(r=Pe.test(i))break;if(r)for(i in o=e.props={},n)o[Pe.test(i)?i.replace(/[A-Z0-9]/,"-$&").toLowerCase():i]=n[i]}!function(t){var n=e.type,r=e.props;if(r&&"string"==typeof n){var o={};for(var i in r)/^on(Ani|Tra|Tou)/.test(i)&&(r[i.toLowerCase()]=r[i],delete r[i]),o[i.toLowerCase()]=i;if(o.ondoubleclick&&(r.ondblclick=r[o.ondoubleclick],delete r[o.ondoubleclick]),o.onbeforeinput&&(r.onbeforeinput=r[o.onbeforeinput],delete r[o.onbeforeinput]),o.onchange&&("textarea"===n||"input"===n.toLowerCase()&&!/^fil|che|ra/i.test(r.type))){var a=o.oninput||"oninput";r[a]||(r[a]=r[o.onchange],delete r[o.onchange])}}}(),"function"==typeof t&&!t.m&&t.prototype&&(Me(t.prototype,"componentWillMount"),Me(t.prototype,"componentWillReceiveProps"),Me(t.prototype,"componentWillUpdate"),t.m=!0)}Le&&Le(e)};var He=ke(({html:e,hardBreak:t})=>{const n=X(null);return G(()=>{const t=requestAnimationFrame(()=>{ye(n.current,`<div>${e}</div>`,{childrenOnly:!0})});return()=>cancelAnimationFrame(t)}),d("div",{class:"markdown-body",style:{"--space":t?"pre-wrap":"normal"},ref:n})});const je="# minibuf\n\nSmall and fast Markdown editor with formatter.\n\n- format:    `ctrl` + `d`\n- save:      `ctrl` + `s`\n- download:  `ctrl` + `q`\n- darkmode:  `ctrl` + `e`\n- hardbreak: `ctrl` + `b`\n\nGitHub: <https://github.com/ahuglajbclajep/minibuf>\n",De={markdown:je,cursor:je.length};function Re(e){if(0===e.length)return;const t=document.createElement("a");t.href=URL.createObjectURL(new Blob([e],{type:"text/markdown"})),t.download=function(){const e=new Date;return`${e.getFullYear()}-${(""+(e.getMonth()+1)).padStart(2,"0")}-${(""+e.getDate()).padStart(2,"0")}_${(""+e.getHours()).padStart(2,"0")}-${(""+e.getMinutes()).padStart(2,"0")}-${(""+e.getSeconds()).padStart(2,"0")}`}()+".md",t.dispatchEvent(new MouseEvent("click"))}const Fe=/Win/i.test(navigator.platform)&&/Google/i.test(navigator.vendor);var We=n(0);var Ie=()=>{const[e,t]=V(""),[n,r,o]=ie(!1),[i,a]=V(""),[u,l]=ie(matchMedia("(prefers-color-scheme: dark)").matches),c=X(null),s=X(null),[_,f]=ae("markdown"),[p,h]=ae("hardbreak");var m;m=async()=>{const{markdown:e,cursor:n}=await f()||De,r=await h()||!1,i=await Object(We.md2html)(e);t(e),o(r),a(i),c.current=n},G(()=>{m()},[]),ue("d",async()=>{const{formatted:n,cursorOffset:r}=await Object(We.format)(e,s.current.selectionStart);t(n),c.current=r}),ue("s",()=>_({markdown:e,cursor:s.current.selectionStart})),ue("q",()=>Re(e)),ue("e",()=>l()),ue("b",()=>{p(!n),r()}),q(()=>{null!==c.current&&(!function(e,t){e.setSelectionRange(t,t)}(s.current,c.current),c.current=null)});const y=Z(async e=>{const n=e.currentTarget.value,r=await Object(We.md2html)(n);t(n),a(r)},[]);return d(v,null,d("div",{class:"container dark-layer",style:{"--dark":+u}},d("textarea",{class:"edit-area",style:{fontWeight:Fe&&u?"bold":"normal"},value:e,onInput:y,ref:s,autoFocus:!0,spellcheck:!1,placeholder:"# minibuf"}),d(He,{html:i,hardBreak:n})))};n(4);U(d(Ie,null),document.getElementById("root"))}]);