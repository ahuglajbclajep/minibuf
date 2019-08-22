try{self["workbox:core:5.0.0-beta.0"]&&_()}catch(e){}const e={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:registration.scope},t=t=>[e.prefix,t,e.suffix].filter(e=>e&&e.length>0).join("-"),n={updateDetails:t=>{(t=>{for(const n of Object.keys(e))t(n)})(n=>{"string"==typeof t[n]&&(e[n]=t[n])})},getGoogleAnalyticsName:n=>n||t(e.googleAnalytics),getPrecacheName:n=>n||t(e.precache),getPrefix:()=>e.prefix,getRuntimeName:n=>n||t(e.runtime),getSuffix:()=>e.suffix},s=e=>{const t=new URL(String(e),location.href);return t.origin===location.origin?t.pathname:t.href},a=(e,...t)=>{let n=e;return t.length>0&&(n+=` :: ${JSON.stringify(t)}`),n};class c extends Error{constructor(e,t){super(a(e,t)),this.name=e,this.details=t}}const r=new Set;const i=(e,t)=>e.filter(e=>t in e),o=async({cacheName:e,request:t,event:n,matchOptions:s,plugins:a=[]})=>{const c=await caches.open(e),r=await u({plugins:a,request:t,mode:"read"});let i=await c.match(r,s);for(const t of a)if("cachedResponseWillBeUsed"in t){const a=t.cachedResponseWillBeUsed;i=await a.call(t,{cacheName:e,event:n,matchOptions:s,cachedResponse:i,request:r})}return i},l=async({request:e,response:t,event:n,plugins:s=[]})=>{let a=t,c=!1;for(let t of s)if("cacheWillUpdate"in t){c=!0;const s=t.cacheWillUpdate;if(!(a=await s.call(t,{request:e,response:a,event:n})))break}return c||(a=a&&200===a.status?a:void 0),a||null},u=async({request:e,mode:t,plugins:n=[]})=>{const s=i(n,"cacheKeyWillBeUsed");let a=e;for(const e of s)"string"==typeof(a=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:a}))&&(a=new Request(a));return a},h={put:async({cacheName:e,request:t,response:n,event:a,plugins:h=[],matchOptions:f})=>{const d=await u({plugins:h,request:t,mode:"write"});if(!n)throw new c("cache-put-with-no-response",{url:s(d.url)});let w=await l({event:a,plugins:h,response:n,request:d});if(!w)return;const p=await caches.open(e),y=i(h,"cacheDidUpdate");let g=y.length>0?await o({cacheName:e,matchOptions:f,request:d}):null;try{await p.put(d,w)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of r)await e()}(),e}for(let t of y)await t.cacheDidUpdate.call(t,{cacheName:e,event:a,oldResponse:g,newResponse:w,request:d})},match:o},f={fetch:async({request:e,fetchOptions:t,event:n,plugins:s=[]})=>{if("string"==typeof e&&(e=new Request(e)),n instanceof FetchEvent&&n.preloadResponse){const e=await n.preloadResponse;if(e)return e}const a=i(s,"fetchDidFail"),r=a.length>0?e.clone():null;try{for(let t of s)if("requestWillFetch"in t){const s=t.requestWillFetch,a=e.clone();e=await s.call(t,{request:a,event:n})}}catch(e){throw new c("plugin-error-request-will-fetch",{thrownError:e})}let o=e.clone();try{let c;c="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of s)"fetchDidSucceed"in e&&(c=await e.fetchDidSucceed.call(e,{event:n,request:o,response:c}));return c}catch(e){for(const t of a)await t.fetchDidFail.call(t,{error:e,event:n,originalRequest:r.clone(),request:o.clone()});throw e}}};let d;async function w(e,t){const n=e.clone(),s={headers:new Headers(n.headers),status:n.status,statusText:n.statusText},a=t?t(s):s,c=function(){if(void 0===d){const e=new Response("");if("body"in e)try{new Response(e.body),d=!0}catch(e){d=!1}d=!1}return d}()?n.body:await n.blob();return new Response(c,a)}try{self["workbox:precaching:5.0.0-beta.0"]&&_()}catch(e){}const p="__WB_REVISION__";function y(e){if(!e)throw new c("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:n}=e;if(!n)throw new c("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(n,location.href);return{cacheKey:e.href,url:e.href}}const s=new URL(n,location.href),a=new URL(n,location.href);return s.searchParams.set(p,t),{cacheKey:s.href,url:a.href}}class g{constructor(e){this.t=n.getPrecacheName(e),this.s=new Map,this.i=new Map}addToCacheList(e){for(const t of e){const{cacheKey:e,url:n}=y(t);if(this.s.has(n)&&this.s.get(n)!==e)throw new c("add-to-cache-list-conflicting-entries",{firstEntry:this.s.get(n),secondEntry:e});if("string"!=typeof t&&t.integrity){if(this.i.has(e)&&this.i.get(e)!==t.integrity)throw new c("add-to-cache-list-conflicting-integrities",{url:n});this.i.set(e,t.integrity)}this.s.set(n,e)}}async install({event:e,plugins:t}={}){const n=[],s=[],a=await caches.open(this.t),c=await a.keys(),r=new Set(c.map(e=>e.url));for(const[e,t]of this.s)r.has(t)?s.push(e):n.push({cacheKey:t,url:e});const i=n.map(({cacheKey:n,url:s})=>{const a=this.i.get(n);return this.o({cacheKey:n,event:e,plugins:t,url:s,integrity:a})});return await Promise.all(i),{updatedURLs:n.map(e=>e.url),notUpdatedURLs:s}}async activate(){const e=await caches.open(this.t),t=await e.keys(),n=new Set(this.s.values()),s=[];for(const a of t)n.has(a.url)||(await e.delete(a),s.push(a.url));return{deletedURLs:s}}async o({cacheKey:e,url:t,event:n,plugins:s,integrity:a}){const r=new Request(t,{integrity:a,cache:"reload",credentials:"same-origin"});let i,o=await f.fetch({event:n,plugins:s,request:r});for(const e of s||[])"cacheWillUpdate"in e&&(i=e);if(!(i?i.cacheWillUpdate({event:n,request:r,response:o}):o.status<400))throw new c("bad-precaching-response",{url:t,status:o.status});o.redirected&&(o=await w(o)),await h.put({event:n,plugins:s,response:o,request:e===t?r:new Request(e),cacheName:this.t,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this.s}getCachedURLs(){return[...this.s.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this.s.get(t.href)}createHandlerForURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new c("non-precached-url",{url:e});return async()=>{try{const e=await caches.open(this.t),n=await e.match(t);if(n)return n;throw new Error(`The cache ${this.t} did not have an entry `+`for ${t}.`)}catch(e){return fetch(t)}}}}let v;const R=()=>(v||(v=new g),v);const m=(e,t)=>{const n=R().getURLsToCacheKeys();for(const s of function*(e,{ignoreURLParametersMatching:t,directoryIndex:n,cleanURLs:s,urlManipulation:a}={}){const c=new URL(e,location.href);c.hash="",yield c.href;const r=function(e,t=[]){for(const n of[...e.searchParams.keys()])t.some(e=>e.test(n))&&e.searchParams.delete(n);return e}(c,t);if(yield r.href,n&&r.pathname.endsWith("/")){const e=new URL(r.href);e.pathname+=n,yield e.href}if(s){const e=new URL(r.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:c});for(const t of e)yield t.href}}(e,t)){const e=n.get(s);if(e)return e}};let L=!1;const U=e=>{L||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:a}={})=>{const c=n.getPrecacheName();addEventListener("fetch",n=>{const r=m(n.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:a});if(!r)return;let i=caches.open(c).then(e=>e.match(r)).then(e=>e||fetch(r));n.respondWith(i)})})(e),L=!0)},q=[],b={get:()=>q,add(e){q.push(...e)}},x=e=>{const t=R(),n=b.get();e.waitUntil(t.install({event:e,plugins:n}).catch(e=>{throw e}))},E=e=>{const t=R();e.waitUntil(t.activate())};var K;addEventListener("install",()=>self.skipWaiting()),addEventListener("activate",()=>self.clients.claim()),K={},(e=>{R().addToCacheList(e),e.length>0&&(addEventListener("install",x),addEventListener("activate",E))})([{url:"0.worker.js",revision:"25446c676a2e283e202d1d6f4a69669b"},{url:"1.worker.js",revision:"ae181feacd9b7844a5883df3fa2ceadc"},{url:"2.worker.js",revision:"cec14c1537125786db30f25ff05a9bc9"},{url:"index.html",revision:"a74353d292ef9e8f69d0a1caea5ddf3e"},{url:"main.css",revision:"fbdea7593112b6e70b806a6057b992cd"},{url:"main.js",revision:"1a24a19153c30c0161eded30d3b6fb80"}]),U(K);