(this.webpackJsonpgdcgraph=this.webpackJsonpgdcgraph||[]).push([[0],{57:function(n){n.exports=JSON.parse('{"a":"https://51.91.249.166:8080/"}')},65:function(n,t,e){},93:function(n,t,e){"use strict";e.r(t);var i,s,c,a,r=e(1),o=e.n(r),l=e(53),j=e.n(l),u=(e(65),e(10)),b=e(16),h=e(4),d=e(11),x=e(25),f=e(26),O=e(2),g=d.a.nav(i||(i=Object(u.a)(["\n    height: var(--nav-size);\n    width: 100%;\n    position: fixed;\n    float: left;\n    top: 0;\n    z-index: 9999;\n"]))),p=d.a.ul(s||(s=Object(u.a)(["\n    height: 100%;\n    list-style-type: none;\n    margin: 0;\n    overflow: hidden;\n    background-color: var(--background-dark);\n"]))),v=d.a.li(c||(c=Object(u.a)(["\n    height: 100%;\n    float: left;\n\n    & > a {\n        display: inline-block;\n        color: var(--text);\n        text-align: center;\n        padding: 14px 16px;\n        text-decoration: none;\n        height: 100%;\n    }\n\n    & > a:hover {\n        background-color: var(--background-light);\n    }\n\n    & > a.active {\n        background-color: var(--accent1);\n    }\n\n    & svg {\n        margin-right: 5px;\n    }\n"]))),m=function(){return Object(O.jsx)(g,{id:"navbar",children:Object(O.jsxs)(p,{children:[Object(O.jsx)(v,{children:Object(O.jsxs)(b.b,{exact:!0,to:"/",children:[Object(O.jsx)(x.a,{icon:f.a}),"GDC Graph"]})}),Object(O.jsx)(v,{children:Object(O.jsxs)(b.b,{to:"/players",children:[Object(O.jsx)(x.a,{icon:f.c}),"Joueurs"]})}),Object(O.jsx)(v,{children:Object(O.jsxs)(b.b,{exact:!0,to:"/missions",children:[Object(O.jsx)(x.a,{icon:f.b}),"Missions"]})})]})})},E=function(){return Object(O.jsx)("div",{})},S=e(24),D=e(38),L=e.n(D),y=e(54),C=e(39),F=e(56),k=e.n(F),I=e(57);!function(n){n[n.UNKNOWN=0]="UNKNOWN",n[n.SUCCESS=1]="SUCCESS",n[n.FAILED=2]="FAILED"}(a||(a={}));var N,A=a;!function(n){n[n.UNKNOWN=0]="UNKNOWN",n[n.ALIVE=1]="ALIVE",n[n.DEAD=2]="DEAD"}(N||(N={}));var w,W,_=N,U=d.a.div(w||(w=Object(u.a)(["\n    display: flex;\n    align-content: center;\n    justify-content: center;\n\n    & > * {\n        margin: 0 50px;\n    }\n"]))),V=function(n){var t=n.id,e=o.a.useState(),i=Object(S.a)(e,2),s=i[0],c=i[1];o.a.useEffect((function(){Object(y.a)(L.a.mark((function n(){return L.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.t0=c,n.next=3,fetch(k()(I.a,"/players/".concat(t)));case 3:return n.next=5,n.sent.json();case 5:n.t1=n.sent,(0,n.t0)(n.t1);case 7:case"end":return n.stop()}}),n)})))()}),[t]);var a=function(n){return s?s.missions.filter((function(t){return t.player_status===n})).length:0},r=function(n){return s?s.missions.filter((function(t){return t.mission_status===n})).length:0};return Object(O.jsxs)("div",{children:[Object(O.jsx)("h2",{children:null===s||void 0===s?void 0:s.infos.name}),Object(O.jsxs)("p",{children:[null===s||void 0===s?void 0:s.infos.count_missions," missions au compteur"]}),Object(O.jsxs)(U,{children:[Object(O.jsxs)("div",{children:[Object(O.jsx)("h3",{children:"Mort ou vif ?"}),Object(O.jsx)(C.a,{data:function(){var n=[];if(s){var t=a(_.ALIVE),e=a(_.DEAD);t&&n.push({angle:t,label:"En vie",subLabel:t.toString(),style:{fill:"#D9EDF7",strokeWidth:0}}),e&&n.push({angle:e,label:"Mort",subLabel:e.toString(),style:{fill:"#FCF8E3",strokeWidth:0}}),t+e!==s.infos.count_missions&&n.push({angle:s.infos.count_missions-(t+e),label:"Inconnu",subLabel:(s.infos.count_missions-(t+e)).toString(),style:{fill:"#CCC",strokeWidth:0}})}return n}(),showLabels:!0,animation:!0,width:300,height:300}),Object(O.jsxs)("p",{children:["Ratio : ",(a(_.ALIVE)/a(_.DEAD)).toLocaleString(void 0,{maximumFractionDigits:2})]})]}),Object(O.jsxs)("div",{children:[Object(O.jsx)("h3",{children:"Victoire ?"}),Object(O.jsx)(C.a,{data:function(){var n=[];if(s){var t=r(A.SUCCESS),e=r(A.FAILED);t&&n.push({angle:t,label:"Victoire",subLabel:t.toString(),style:{fill:"#DFF0D8",strokeWidth:0}}),e&&n.push({angle:e,label:"Echec",subLabel:e.toString(),style:{fill:"#F2DEDE",strokeWidth:0}}),t+e!==s.infos.count_missions&&n.push({angle:s.infos.count_missions-(t+e),label:"Inconnu",subLabel:(s.infos.count_missions-(t+e)).toString(),style:{fill:"#FCF8E3",strokeWidth:0}})}return n}(),showLabels:!0,animation:!0,width:300,height:300}),Object(O.jsxs)("p",{children:["Ratio : ",(r(A.SUCCESS)/r(A.FAILED)).toLocaleString(void 0,{maximumFractionDigits:2})]})]})]})]})},z=function(){return Object(O.jsx)("div",{})},J=function(){var n=Object(h.f)().id,t=o.a.useState(n?parseInt(n):0),e=Object(S.a)(t,2),i=e[0],s=e[1];return Object(O.jsxs)("div",{children:[Object(O.jsx)("h1",{children:"Joueurs"}),Object(O.jsx)("form",{children:Object(O.jsxs)("label",{children:["ID du joueur",Object(O.jsx)("input",{type:"number",value:i,onChange:function(n){n.target&&s(parseInt(n.target.value))}})]})}),0!=i?Object(O.jsx)(V,{id:i}):Object(O.jsx)(z,{})]})},K=function(){return Object(O.jsxs)("div",{children:[Object(O.jsx)("h1",{children:"404"}),Object(O.jsx)("p",{children:"Page not found"})]})},M=d.a.div(W||(W=Object(u.a)(["\n  margin-top: var(--nav-size);\n  text-align: center;\n  min-height: calc(100vh - var(--nav-size) - var(--footer-size) - 14px);\n"]))),P=function(){return Object(O.jsxs)(b.a,{basename:"/",children:[Object(O.jsx)(m,{}),Object(O.jsx)(M,{children:Object(O.jsxs)(h.c,{children:[Object(O.jsx)(h.a,{exact:!0,path:"/",component:E}),Object(O.jsx)(h.a,{exact:!0,path:["/players","/players/:id"],component:J}),Object(O.jsx)(h.a,{exact:!0,path:"/missions/:id",component:E}),Object(O.jsx)(h.a,{component:K})]})})]})},B=function(n){n&&n instanceof Function&&e.e(3).then(e.bind(null,95)).then((function(t){var e=t.getCLS,i=t.getFID,s=t.getFCP,c=t.getLCP,a=t.getTTFB;e(n),i(n),s(n),c(n),a(n)}))};j.a.render(Object(O.jsx)(o.a.StrictMode,{children:Object(O.jsx)(P,{})}),document.getElementById("root")),B()}},[[93,1,2]]]);
//# sourceMappingURL=main.c8819013.chunk.js.map