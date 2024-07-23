import{L as V,_,r as y,o as S,M as D,t as v,v as p,x as o,B as E,y as h,N,z as b,A as M,O as A,P as B,Q as T,R as I,T as F,S as L,C as k,D as x,G as H,U as O,V as j}from"./EF-T7amW.js";const z=V("event",{state:()=>({events:[],categories:[],locations:[]}),actions:{async fetchEvents(){try{const e=await fetch("https://barantoro.github.io/mir/events.json");if(!e.ok)throw new Error(`HTTP error! Status: ${e.status}`);const c=await e.json();this.events=c.events;const a=new Set,r=new Set;c.events.forEach(t=>{a.add(t.category),r.add(t.location)}),this.categories=Array.from(a),this.locations=Array.from(r)}catch(e){console.error("Fetch error:",e)}}}}),U="data:image/svg+xml,%3csvg%20width='8'%20height='5'%20viewBox='0%200%208%205'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M7.25%200.75L4%204.25L0.75%200.75'%20stroke='%231C1C1C'%20stroke-width='1.5'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",P=e=>(k("data-v-c64ff2be"),e=e(),x(),e),q=["aria-expanded"],J=P(()=>o("img",{src:U,alt:"Dropdown Arrow"},null,-1)),K=[J],R={class:"select-items",role:"listbox"},W=["aria-selected","onClick"],Z={__name:"CustomSelectbox",props:{options:{type:Array,default:()=>[],required:!0},modelValue:{type:String,default:""},label:{type:String,default:"Select an option"}},emits:["update:modelValue"],setup(e,{emit:c}){const a=e,r=c,t=y(!1),s=y(a.options.find(l=>l===a.modelValue)||null),d=y(!1),i=()=>{d.value=window.innerWidth<=576},n=()=>{t.value=!t.value},m=l=>{s.value=l,r("update:modelValue",l),t.value=!1},g=l=>{l.target.closest(".custom-select")||(t.value=!1)},w=l=>{const u=a.options.indexOf(s.value);l.key==="ArrowDown"?(l.preventDefault(),u<a.options.length-1?s.value=a.options[u+1]:s.value=a.options[0]):l.key==="ArrowUp"?(l.preventDefault(),u>0?s.value=a.options[u-1]:s.value=a.options[a.options.length-1]):l.key==="Enter"?(l.preventDefault(),t.value?m(s.value):n()):l.key==="Escape"&&(l.preventDefault(),t.value=!1)};return S(()=>{i(),window.addEventListener("resize",i),document.addEventListener("click",g)}),D(()=>{document.removeEventListener("click",g),window.removeEventListener("resize",i)}),(l,u)=>(v(),p("div",{class:"custom-select",role:"listbox","aria-expanded":t.value,tabindex:"0",onKeydown:w},[o("div",{class:"select-selected",onClick:n,"aria-haspopup":"listbox","aria-labelledby":"select-label"},[E(h(s.value?s.value:e.label)+" ",1),o("span",{class:N(["arrow",{open:t.value}])},K,2)]),b(F,{name:"slide-fade"},{default:M(()=>[A(o("div",R,[o("div",{role:"option",class:"select-item",onClick:u[0]||(u[0]=f=>m(""))}," All "+h(e.label),1),(v(!0),p(T,null,I(e.options,f=>(v(),p("div",{key:f,role:"option","aria-selected":s.value===f?"true":"false",class:"select-item",onClick:$=>m(f)},h(f),9,W))),128))],512),[[B,t.value]])]),_:1}),t.value&&d.value?(v(),p("div",{key:0,class:"backdrop",onClick:u[1]||(u[1]=f=>t.value=!1)})):L("",!0)],40,q))}},C=_(Z,[["__scopeId","data-v-c64ff2be"]]),G={class:"event-filters-wrapper",role:"region","aria-labelledby":"filters-label"},Q={__name:"EventFilter",props:["categories","locations"],setup(e,{emit:c}){const a=c,r=y(""),t=y(""),s=()=>{a("filter",{category:r.value,location:t.value})};return H([r,t],()=>{s()}),(d,i)=>(v(),p("div",G,[b(C,{label:"Locations",options:e.locations,modelValue:t.value,"onUpdate:modelValue":i[0]||(i[0]=n=>t.value=n),"aria-labelledby":"location-select"},null,8,["options","modelValue"]),b(C,{label:"Category",options:e.categories,modelValue:r.value,"onUpdate:modelValue":i[1]||(i[1]=n=>r.value=n),"aria-labelledby":"category-select"},null,8,["options","modelValue"])]))}},Y=_(Q,[["__scopeId","data-v-df9ae791"]]),X="data:image/svg+xml,%3csvg%20width='24'%20height='24'%20viewBox='0%200%2024%2024'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M4%204H6.90909L8.85818%2013.7382C8.92469%2014.073%209.10684%2014.3738%209.37276%2014.5879C9.63868%2014.8019%209.97142%2014.9156%2010.3127%2014.9091H17.3818C17.7231%2014.9156%2018.0559%2014.8019%2018.3218%2014.5879C18.5877%2014.3738%2018.7699%2014.073%2018.8364%2013.7382L20%207.63636H7.63636M10.5455%2018.5455C10.5455%2018.9471%2010.2198%2019.2727%209.81818%2019.2727C9.41652%2019.2727%209.09091%2018.9471%209.09091%2018.5455C9.09091%2018.1438%209.41652%2017.8182%209.81818%2017.8182C10.2198%2017.8182%2010.5455%2018.1438%2010.5455%2018.5455ZM18.5455%2018.5455C18.5455%2018.9471%2018.2198%2019.2727%2017.8182%2019.2727C17.4165%2019.2727%2017.0909%2018.9471%2017.0909%2018.5455C17.0909%2018.1438%2017.4165%2017.8182%2017.8182%2017.8182C18.2198%2017.8182%2018.5455%2018.1438%2018.5455%2018.5455Z'%20stroke='white'%20stroke-linecap='round'%20stroke-linejoin='round'/%3e%3c/svg%3e",ee=e=>(k("data-v-a3cecfe2"),e=e(),x(),e),te={key:0,class:"single-event"},ae={class:"date"},oe=["innerHTML"],se={class:"time","aria-label":"Event time"},ne={class:"event"},le={class:"type-badge","aria-label":"Event category"},ie={class:"event-name"},ce={class:"event-description"},re={class:"event-location"},de={class:"actions"},ue=["aria-label","tabindex"],ve=ee(()=>o("img",{src:X,alt:"Shopping Cart Icon"},null,-1)),pe={class:"price"},me={__name:"EventItem",props:{event:{type:Object,default:()=>{},required:!0},index:{type:Number,default:0}},emits:["buy-ticket"],setup(e,{emit:c}){const a=c,r=e,t=()=>{a("buy-ticket",r.event)},s=i=>{let[n,m]=i.split(":").map(Number),g=n>=12?"pm":"am";return n=n%12,n=n||12,`${n}${m>0?":"+m.toString().padStart(2,"0"):""} ${g}`},d=i=>{const[n,m,g]=i.split("-").map(Number),w=["January","February","March","April","May","June","July","August","September","October","November","December"],l=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],u=new Date(n,m-1,g),f=l[u.getDay()],$=w[m-1];return`<strong>${f}</strong>, ${g}. ${$} ${n}`};return(i,n)=>e.event?(v(),p("div",te,[o("div",ae,[o("span",{innerHTML:d(e.event.date),"aria-label":"Event date"},null,8,oe),o("strong",se,h(s(e.event.time)),1)]),o("div",ne,[o("span",le,h(e.event.category),1),o("h3",ie,h(e.event.title),1),o("p",ce,h(e.event.description),1),o("p",re,h(e.event.location),1)]),o("div",de,[o("button",{class:"btn","aria-label":"Buy Ticket for "+e.event.title,tabindex:e.index,onClick:t},[E(" Buy Ticket "),ve],8,ue),o("p",pe,h(e.event.price)+"€",1)])])):L("",!0)}},he=_(me,[["__scopeId","data-v-a3cecfe2"]]),fe={key:0,class:"list-wrapper"},ye={key:1,class:"no-data",role:"alert"},ge=j("<h3 data-v-9afcd234>No Events Found 🎵</h3><p data-v-9afcd234> It looks like there are no events matching your search criteria right now. Don&#39;t worry, the music scene is always buzzing with new and exciting events! <br data-v-9afcd234><br data-v-9afcd234> Here are a few things you can try: <br data-v-9afcd234><br data-v-9afcd234><strong data-v-9afcd234>Check Back Later:</strong> New events are added all the time, so be sure to come back and see what&#39;s new. <br data-v-9afcd234><strong data-v-9afcd234>Adjust Your Filters:</strong> Try broadening your search or using different filters to find more events. <br data-v-9afcd234><strong data-v-9afcd234>Explore Popular Events:</strong> Take a look at some of our most popular events currently happening. <br data-v-9afcd234><br data-v-9afcd234> Still can&#39;t find what you&#39;re looking for? Reach out to us, and we&#39;ll help you discover the perfect event for you! </p>",2),be=[ge],_e={__name:"EventList",props:{events:{type:Array,default:()=>[],required:!0}},setup(e){const c=a=>{console.log(`Ticket bought for: ${a.title}`)};return(a,r)=>e.events.length>0?(v(),p("div",fe,[(v(!0),p(T,null,I(e.events,(t,s)=>(v(),O(he,{key:t.id,event:t,index:s,onBuyTicket:c},null,8,["event","index"]))),128))])):(v(),p("div",ye,be))}},we=_(_e,[["__scopeId","data-v-9afcd234"]]),ke=e=>(k("data-v-d0f0aecb"),e=e(),x(),e),xe={class:"container"},$e=ke(()=>o("h1",null,"Program and tickets",-1)),Ce={"aria-labelledby":"filter-section"},Se={"aria-labelledby":"event-list-section"},Ee={__name:"index",setup(e){const c=z(),a=y([]),r=y([]),t=y([]),s=d=>{a.value=c.events.filter(i=>(!d.category||i.category===d.category)&&(!d.location||i.location===d.location))};return S(async()=>{await c.fetchEvents(),a.value=c.events,r.value=c.categories,t.value=c.locations}),(d,i)=>(v(),p("main",xe,[$e,o("section",Ce,[b(Y,{categories:r.value,locations:t.value,onFilter:s,"aria-labelledby":"filter-section"},null,8,["categories","locations"])]),o("section",Se,[b(we,{events:a.value,class:"mt-5","aria-labelledby":"event-list-section"},null,8,["events"])])]))}},Ie=_(Ee,[["__scopeId","data-v-d0f0aecb"]]);export{Ie as default};
