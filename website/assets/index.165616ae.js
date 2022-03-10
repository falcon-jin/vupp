import{f as c,l as i,r as v,o as p,b as m,u as o}from"./vendor.d451edca.js";const E=c({setup(C){let l=i([{title:"\u8D2D\u7269",start:"2022-03-01 18:00",end:"2022-03-02 23:00",editable:!0},{title:"code",start:"2022-03-01 08:00",end:"2022-03-01 19:00"},{title:"\u7761\u89C9",start:"2022-03-11 08:00",end:"2022-03-11 18:00"}]);const a=e=>{console.log("\u70B9\u51FB\u65E5\u671F",e),l.value.push({title:"\u5B66\u4E60",start:e.dateStr+" 08:00",end:e.dateStr+" 18:00",editable:!0})},r=e=>{console.log(e)};let s=e=>{let n=document.createElement("div"),t=e.timeText.split(" - "),[d,u]=[t[0],t[1]];return n.innerHTML=`
    <h4>${e.event._def.title}</h4>
    <div>\u5F00\u59CB: ${d}</div>
    <div>\u7ED3\u675F: ${u}</div>
  `,{domNodes:[n]}};return(e,n)=>{const t=v("v-calendar");return p(),m(t,{events:o(l),onDateClick:a,onEventClick:r,displayEventEnd:"",eventContent:o(s)},null,8,["events","eventContent"])}}});export{E as default};
