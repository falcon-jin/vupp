import{_ as m}from"./index.032f7dc4.js";import{f as x,r as n,o as c,g,h,b as _,p as y,j as F,w as t,k as a,u as p,l as C,m as B}from"./vendor.d451edca.js";const E=e=>(y("data-v-03511cb8"),e=e(),F(),e),S={class:"v-demo__header"},k=E(()=>h("h3",{class:"v-demo__name"},"VUI",-1)),I=x({props:{collapse:{type:Boolean}},emits:["update:collapse"],setup(e,{emit:o}){const s=e,l=()=>{o("update:collapse",!s.collapse)};return(i,r)=>{const d=n("el-icon-expand"),u=n("el-icon-fold");return c(),g("div",S,[h("span",{class:"v-demo__collapse",onClick:l},[e.collapse?(c(),_(d,{key:0,style:{"margin-right":"10px"}})):(c(),_(u,{key:1,style:{"margin-right":"10px"}}))]),k])}}});var b=m(I,[["__scopeId","data-v-03511cb8"]]);const A=x({props:{collapse:{type:Boolean}},setup(e){let o=[{icon:"HomeFilled",name:"Home \u4E3B\u9875",index:"/"},{icon:"Promotion",name:"Icon Selector \u56FE\u6807",index:"/icon-selector"},{icon:"LocationFilled",name:"Area Selector \u7701\u5E02\u533A",index:"/area-selector"},{icon:"Place",name:"City Selector \u57CE\u5E02",index:"/city-selector"},{icon:"Menu",name:"Menu \u4FA7\u8FB9\u83DC\u5355",index:"/menu"},{icon:"BellFilled",name:"Notification \u901A\u77E5",index:"/notification"},{icon:"Postcard",name:"Form \u8868\u5355",index:"/form"},{icon:"Tickets",name:"ModalForm \u5F39\u6846\u8868\u5355",index:"/modal-form"},{icon:"Grid",name:"Table \u8868\u683C",index:"/table"},{icon:"Calendar",name:"Calendar \u65E5\u5386",index:"/calendar"},{icon:"TrendCharts",name:"Trend \u8D8B\u52BF",index:"/trend"},{icon:"RefreshRight",name:"Progress \u8FDB\u5EA6\u6761",index:"/progress"},{icon:"Timer",name:"Time Selector \u65F6\u95F4",index:"/time-selector"},{icon:"PieChart",name:"Date Selector \u65E5\u671F",index:"/date-selector"}];return(s,l)=>{const i=n("v-menu"),r=n("el-scrollbar");return c(),_(r,{"max-height":"100%"},{default:t(()=>[a(i,{data:p(o),defaultActive:s.$route.path,collapse:e.collapse,router:""},null,8,["data","defaultActive","collapse"])]),_:1})}}});var T=m(A,[["__scopeId","data-v-48971c87"]]);const w=x({setup(e){let o=C(!1);return(s,l)=>{const i=n("el-aside"),r=n("el-header"),d=n("router-view"),u=n("el-main"),v=n("el-container");return c(),_(v,{class:"v-demo__container"},{default:t(()=>[a(i,{width:"auto"},{default:t(()=>[a(T,{collapse:p(o)},null,8,["collapse"])]),_:1}),a(v,null,{default:t(()=>[a(r,null,{default:t(()=>[a(b,{collapse:p(o),"onUpdate:collapse":l[0]||(l[0]=f=>B(o)?o.value=f:o=f)},null,8,["collapse"])]),_:1}),a(u,null,{default:t(()=>[a(d)]),_:1})]),_:1})]),_:1})}}});var D=m(w,[["__scopeId","data-v-7d319358"]]);export{D as default};
