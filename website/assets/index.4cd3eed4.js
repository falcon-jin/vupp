import{c as f,a as v,r as h,o as E,b as y,M as u,d as L,i as O,e as P}from"./vendor.d451edca.js";const g=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&t(i)}).observe(document,{childList:!0,subtree:!0});function a(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=a(e);fetch(e.href,o)}};g();const A="modulepreload",p={},R="/",r=function(n,a){return!a||a.length===0?n():Promise.all(a.map(t=>{if(t=`${R}${t}`,t in p)return;p[t]=!0;const e=t.endsWith(".css"),o=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${o}`))return;const i=document.createElement("link");if(i.rel=e?"stylesheet":A,e||(i.as="script",i.crossOrigin=""),i.href=t,document.head.appendChild(i),e)return new Promise((_,d)=>{i.addEventListener("load",_),i.addEventListener("error",()=>d(new Error(`Unable to preload CSS for ${t}`)))})})).then(()=>n())},I=[{path:"/",component:()=>r(()=>import("./index.1e04f990.js"),["assets/index.1e04f990.js","assets/index.624814b1.css","assets/vendor.d451edca.js"]),children:[{path:"/",name:"Home",component:()=>r(()=>import("./Home.ccd1b2ef.js"),["assets/Home.ccd1b2ef.js","assets/vendor.d451edca.js"])},{path:"/icon-selector",name:"vIconSelector",component:()=>r(()=>import("./index.8dd97acf.js"),["assets/index.8dd97acf.js","assets/vendor.d451edca.js"])},{path:"/area-selector",name:"vAreaSelector",component:()=>r(()=>import("./index.f023af36.js"),["assets/index.f023af36.js","assets/vendor.d451edca.js"])},{path:"/trend",name:"vTrend",component:()=>r(()=>import("./index.9d48a106.js"),["assets/index.9d48a106.js","assets/index.5a0bbbfe.css","assets/vendor.d451edca.js"])},{path:"/notification",name:"vNotification",component:()=>r(()=>import("./index.cab9e964.js"),["assets/index.cab9e964.js","assets/vendor.d451edca.js"])},{path:"/menu",name:"vMenu",component:()=>r(()=>import("./index.889cb24d.js"),["assets/index.889cb24d.js","assets/index.6688357f.css","assets/vendor.d451edca.js"])},{path:"/form",name:"vForm",component:()=>r(()=>import("./index.fe1daf34.js"),["assets/index.fe1daf34.js","assets/vendor.d451edca.js"])},{path:"/modal-form",name:"vModalForm",component:()=>r(()=>import("./index.0f991378.js"),["assets/index.0f991378.js","assets/vendor.d451edca.js"])},{path:"/table",name:"vTable",component:()=>r(()=>import("./index.e7004ce2.js"),["assets/index.e7004ce2.js","assets/vendor.d451edca.js"])},{path:"/calendar",name:"vCalendar",component:()=>r(()=>import("./index.165616ae.js"),["assets/index.165616ae.js","assets/vendor.d451edca.js"])},{path:"/progress",name:"vProgress",component:()=>r(()=>import("./index.903bd130.js"),["assets/index.903bd130.js","assets/vendor.d451edca.js"])},{path:"/time-selector",name:"vTimeSelector",component:()=>r(()=>import("./index.2e565da4.js"),["assets/index.2e565da4.js","assets/vendor.d451edca.js"])},{path:"/date-selector",name:"vDateSelector",component:()=>r(()=>import("./index.dd5907e5.js"),["assets/index.dd5907e5.js","assets/vendor.d451edca.js"])},{path:"/city-selector",name:"vCitySelector",component:()=>r(()=>import("./index.e4634a8e.js"),["assets/index.e4634a8e.js","assets/vendor.d451edca.js"])}]}],T=f({routes:I,history:v()});var D=(s,n)=>{const a=s.__vccOpts||s;for(const[t,e]of n)a[t]=e;return a};const V={};function S(s,n){const a=h("router-view");return E(),y(a)}var b=D(V,[["render",S]]);const l=u.Random,m=[];for(let s=0;s<100;s++){const n={date:l.date("yyyy-MM-dd"),name:l.name(),address:l.province(!0)};m.push(n)}u.mock("/api/list","post",s=>{let n=JSON.parse(s.body),[a,t,e]=[n.current,n.pageSize,m.length],o=e/t,i=o-parseInt(String(o)),_=m.slice(a*t,(a+1)*t);return{code:"200",message:"success",data:{current:a,pageSize:t,rows:_,total:e,totalPages:i}}});const c=L(b);c.use(T);c.use(O);c.use(P);c.mount("#app");export{D as _};
