(this.webpackJsonpgdcgraph=this.webpackJsonpgdcgraph||[]).push([[0],{44:function(e){e.exports=JSON.parse('{"a":"https://oxypomme.fr/gdc/"}')},69:function(e){e.exports=JSON.parse("[0,3,5,6]")},84:function(e,t,n){},97:function(e,t,n){"use strict";n.r(t);var a,i,c,r,s,o,u,l,d,j,b,h=n(0),p=n.n(h),m=n(31),O=n.n(m),x=n(46),f=n(14),v=n.n(f),g=n(68),y=n.n(g),S=(n(83),n(84),n(6)),k=n(33),_=n(9),C=n(7),D=n(19),w=n(11),E=n(1),A=C.a.nav(a||(a=Object(S.a)(["\n    height: var(--nav-size);\n    width: 100%;\n    position: fixed;\n    float: left;\n    top: 0;\n    z-index: 9999;\n"]))),F=C.a.ul(i||(i=Object(S.a)(["\n    height: 100%;\n    list-style-type: none;\n    margin: 0;\n    overflow: hidden;\n    background-color: var(--background-dark);\n"]))),M=C.a.li(c||(c=Object(S.a)(["\n    height: 100%;\n    float: ",";\n\n    & > a {\n        display: inline-block;\n        color: var(--text);\n        text-align: center;\n        padding: 14px 16px;\n        text-decoration: none;\n        height: 100%;\n        &:hover {\n            background-color: var(--background-light);\n        }\n        &.active {\n            background-color: var(--accent1);\n        }\n    }\n\n    & svg {\n        margin-right: 5px;\n    }\n"])),(function(e){return e.right?"right":"left"})),L=function(){return Object(E.jsx)(A,{id:"navbar",children:Object(E.jsxs)(F,{children:[Object(E.jsx)(M,{children:Object(E.jsxs)(k.b,{exact:!0,to:"/",children:[Object(E.jsx)(D.a,{icon:w.d}),"GDC Graph"]})}),Object(E.jsx)(M,{children:Object(E.jsxs)(k.b,{to:"/players",children:[Object(E.jsx)(D.a,{icon:w.n}),"Joueurs"]})}),Object(E.jsx)(M,{children:Object(E.jsxs)(k.b,{exact:!0,to:"/missions",children:[Object(E.jsx)(D.a,{icon:w.f}),"Missions"]})}),Object(E.jsx)(M,{children:Object(E.jsxs)(k.b,{exact:!0,to:"/maps",children:[Object(E.jsx)(D.a,{icon:w.g}),"Maps"]})}),Object(E.jsx)(M,{right:!0,children:Object(E.jsxs)("a",{href:"https://grecedecanards.fr/GDCStats/",children:[Object(E.jsx)(D.a,{icon:w.c}),"GDC Stats"]})})]})})},N=C.a.div(r||(r=Object(S.a)(["\n    flex: 1 0 25%;\n    border: 1px solid black;\n    border-radius: 10px;\n    margin: 5%;\n    padding: 5%;\n    cursor: pointer;\n"]))),I=function(e){var t=e.image,n=e.title,a=e.desc,i=e.onClick;return Object(E.jsxs)(N,{tabIndex:0,onClick:i,children:[Object(E.jsx)("img",{src:t}),Object(E.jsx)("h2",{children:n}),Object(E.jsx)("p",{children:a})]})},P=C.a.div(s||(s=Object(S.a)(["\n    display: flex;\n    justify-items: center;\n    align-items: center;\n    width: 50%;\n    margin: 0 auto;\n"]))),V=function(){var e=Object(_.f)();return Object(E.jsxs)(E.Fragment,{children:[Object(E.jsxs)(P,{children:[Object(E.jsx)(I,{image:"",title:"Joueurs",desc:"Affiche des stats g\xe9n\xe9rales sur les joueurs, ou un joueur en particulier.",onClick:function(){e.push("/players")}}),Object(E.jsx)(I,{image:"",title:"Missions",desc:"Affiche des stats g\xe9n\xe9rales sur les missions, ou une mission en particulier.",onClick:function(){e.push("/missions")}}),Object(E.jsx)(I,{image:"",title:"Maps",desc:"Affiche des stats g\xe9n\xe9rales sur les maps",onClick:function(){e.push("/maps")}})]}),Object(E.jsxs)("p",{children:["Outil d\xe9velopp\xe9 pour les canards de ",Object(E.jsx)("a",{href:"https://grecedecanards.fr/",children:"Gr\xe8ce de Canard"}),"."]}),Object(E.jsxs)("p",{children:["Li\xe9 \xe0 ",Object(E.jsx)("a",{href:"https://grecedecanards.fr/GDCStats/",children:"GDC Stats"}),"."]})]})},Y=n(10),T=n(8),J=n(27),U=function(){return Object(x.b)()},W=x.c,H=n(18),R=n(34),z=n.n(R),G=n(43),B=n(30),K=n(49),q=n(44),$=n(45),Q=n.n($),X=Object(B.b)("player/fetchPlayerList",Object(G.a)(z.a.mark((function e(){return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(Q()(q.a,"/players"));case 2:return e.next=4,e.sent.json();case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})))),Z=Object(B.b)("player/fetchPlayer",function(){var e=Object(G.a)(z.a.mark((function e(t,n){var a,i,c,r;return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=n.getState,i=a().player.players,-1===(c=i.findIndex((function(e){return e.id===parseInt(t)||e.name===t})))){e.next=5;break}return e.abrupt("return",i[c]);case 5:return e.next=7,fetch(Q()(q.a,"/players/".concat(t)));case 7:return e.next=9,e.sent.json();case 9:if(!(r=e.sent).name){e.next=12;break}return e.abrupt("return",r);case 12:return e.abrupt("return",null);case 13:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}()),ee=Object(B.c)({name:"player",initialState:{playerList:{players:[],updated:""},players:[],lastFetchIndex:-1,isFetching:!1},extraReducers:(o={},Object(H.a)(o,X.pending.type,(function(e){return Object(T.a)(Object(T.a)({},e),{},{isFetching:!0})})),Object(H.a)(o,X.fulfilled.type,(function(e,t){var n=t.payload;return Object(T.a)(Object(T.a)({},e),{},{playerList:n,isFetching:!1})})),Object(H.a)(o,X.rejected.type,(function(e,t){var n=t.error;return console.error(n),Object(T.a)(Object(T.a)({},e),{},{isFetching:!1})})),Object(H.a)(o,Z.pending.type,(function(e){return Object(T.a)(Object(T.a)({},e),{},{isFetching:!0})})),Object(H.a)(o,Z.fulfilled.type,(function(e,t){var n=t.payload,a=Object(J.a)(e.players),i=-1;return n&&-1===(i=a.findIndex((function(e){return e.id==n.id})))&&(i=a.length,a=[].concat(Object(J.a)(a),[n])),Object(T.a)(Object(T.a)({},e),{},{players:a,lastFetchIndex:i,isFetching:!1})})),Object(H.a)(o,Z.rejected.type,(function(e,t){var n=t.error;return console.error(n),Object(T.a)(Object(T.a)({},e),{},{isFetching:!1})})),o),reducers:{}}),te=function(e){return e.player},ne=Object(K.a)(te,(function(e){return e.playerList})),ae=Object(K.a)(te,(function(e){return e.players[e.lastFetchIndex]})),ie=Object(K.a)(te,(function(e){return e.isFetching})),ce=ee.reducer,re=C.a.div(u||(u=Object(S.a)(["\n    border-bottom: 1px solid ",";\n    ","\n"])),(function(e){return e.color?e.color:"var(--background-light)"}),(function(e){return e.width?"width: ".concat(e.width," ;"):""})),se=C.a.div(l||(l=Object(S.a)(["\n    border-left: 1px solid ",";\n    ","\n"])),(function(e){return e.color?e.color:"var(--background-light)"}),(function(e){return e.height?"height: ".concat(e.height," ;"):""})),oe=n(4),ue=Object(oe.d)(d||(d=Object(S.a)(["\n    from {\n        transform: rotate(0deg);\n    }\n    to {\n        transform: rotate(360deg);\n    }\n"]))),le=C.a.div(j||(j=Object(S.a)(["\n    position: absolute;\n    top: 0;\n    left:0 ;\n    z-index: 9998;\n    background-color: black;\n    opacity: 0.5;\n    width: 100vw;\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n    & > svg {\n        animation: "," 2s linear infinite;\n    }\n"])),ue),de=function(){return Object(E.jsx)(le,{children:Object(E.jsx)(D.a,{icon:w.l,color:"white",size:"6x"})})};!function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.SUCCESS=1]="SUCCESS",e[e.FAILED=2]="FAILED"}(b||(b={}));var je,be=b;!function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.ALIVE=1]="ALIVE",e[e.DEAD=2]="DEAD"}(je||(je={}));var he,pe,me,Oe,xe,fe,ve,ge,ye,Se,ke,_e,Ce,De,we,Ee,Ae,Fe,Me,Le,Ne,Ie,Pe,Ve=je,Ye=C.a.span(he||(he=Object(S.a)(["\n    background-color: ",";\n    font-size: 8pt;\n    padding: 2px;\n    border-radius: 5px;\n    vertical-align: text-top;\n"])),(function(e){return e.color})),Te=function(e){var t=e.element;if(void 0===t)return Object(E.jsx)(E.Fragment,{});var n=p.a.useState(""),a=Object(Y.a)(n,2),i=a[0],c=a[1],r=p.a.useState(""),s=Object(Y.a)(r,2),o=s[0],u=s[1];return p.a.useEffect((function(){switch(t){case be.SUCCESS:c("#81d5ff"),u("Succ\xe8s");break;case Ve.ALIVE:c("#81d5ff"),u("Vivant");break;case be.FAILED:c("#ee9e9e"),u("Echec");break;case Ve.DEAD:c("#ee9e9e"),u("Mort");break;default:c("#fceb96"),u("Inconnu")}}),[t]),Object(E.jsx)(Ye,{color:i,children:o})},Je=n(69),Ue=n(25),We={colors:["#81d5ff","#ee9e9e","#fceb96","#ADEBAD","#C6A5CC"],legend:{position:"bottom"},pieSliceTextStyle:{color:"black"}},He=n(53),Re=n(74),ze=C.a.div(pe||(pe=Object(S.a)(["\n\tbackground: var(--background-dark);\n\twidth: 100%;\n\tpadding: 10px;\n\tmargin: 10px;\n\tborder-radius: 5px;\n\tposition: relative;\n\t& > h4 {\n\t\tmargin: 0;\n\t\tmargin-left: 5px;\n\t\tdisplay: inline;\n\t}\n\t& > svg {\n\t\tposition: absolute;\n\t\tleft: 10px;\n\t}\n"]))),Ge=.4,Be=function(e){var t=e.player,n=p.a.useState([]),a=Object(Y.a)(n,2),i=a[0],c=a[1];return p.a.useEffect((function(){var e=[];if(t){var n,a;t.total_player_mission_status.SUCCES_Mort/t.total_mission_status.SUCCES>=Ge&&e.push({name:"Elle a fini sans toi",icon:w.k,desc:"Est mort dans ".concat((t.total_player_mission_status.SUCCES_Mort/t.total_mission_status.SUCCES*100).toLocaleString(void 0,{maximumFractionDigits:2}),"% de ses missions accomplies")}),t.count_missions>=400&&e.push({name:"Petit joueur",icon:w.e,desc:"A jou\xe9 seulement ".concat(t.count_missions," missions")});var i=Object.keys(t.days).map((function(e,n){return{day:v()().day(parseInt(e)).format("dddd"),count:Object.values(t.days)[n].count}})).sort((function(e,t){return t.count-e.count}));(null===(n=i[0])||void 0===n?void 0:n.count)/t.count_missions>=Ge&&e.push({name:"Joueur du ".concat(i[0].day),icon:w.b,desc:"A jou\xe9 ".concat((i[0].count/t.count_missions*100).toLocaleString(void 0,{maximumFractionDigits:2}),"% de ses missions le ").concat(i[0].day)});var r=Object.keys(t.roles.roles_count).map((function(e,n){return{name:e,count:Object.values(null===t||void 0===t?void 0:t.roles.roles_count)[n]}})).sort((function(e,t){return t.count-e.count}));(null===(a=r[0])||void 0===a?void 0:a.count)/t.count_missions>=Ge&&e.push({name:"\xc9ternel ".concat(r[0].name),desc:"A jou\xe9 ".concat((r[0].count/t.count_missions*100).toLocaleString(void 0,{maximumFractionDigits:2}),"% de ses missions en tant que ").concat(r[0].name)});var s,o=0,u=Object(He.a)(r);try{for(u.s();!(s=u.n()).done;){var l=s.value;l.name.includes("Leader")&&(o+=l.count)}}catch(b){u.e(b)}finally{u.f()}if(o/t.count_missions>=Ge&&e.push({name:"Leader un jour, Leader toujours",icon:w.h,desc:"A jou\xe9 ".concat((o/t.count_missions*100).toLocaleString(void 0,{maximumFractionDigits:2}),"% de ses missions en tant que Leader (SL, TL ou Leader)")}),t.last_mission){var d,j=v()().diff(v()(null===(d=t.last_mission)||void 0===d?void 0:d.date,"DD/MM/YYYY"),"month");j>2&&e.push({name:"Je sais o\xf9 tu te cache !",icon:w.i,desc:"A jou\xe9 sa derni\xe8re mission il y a ".concat(j," mois")})}t.streak.mort.current&&t.streak.mort.count>=4&&e.push({name:"J'ai beau \xeatre matinal...'",icon:w.a,desc:"Est mort ces ".concat(t.streak.mort.count," derni\xe8res missions")}),t.streak.vivant.current&&t.streak.vivant.count>=4&&e.push({name:"Mourrir peut attendre",icon:w.j,desc:"Est vivant ces ".concat(t.streak.vivant.count," derni\xe8res missions")})}c(e)}),[t]),Object(E.jsx)(E.Fragment,{children:i.map((function(e,t){return Object(E.jsxs)(E.Fragment,{children:[Object(E.jsxs)(ze,{"data-tip":e.desc,children:[Object(E.jsx)(D.a,{icon:e.icon||w.m}),Object(E.jsx)("h4",{children:e.name})]},t),Object(E.jsx)(Re.a,{})]})}))})},Ke=n(71),qe=function(e){var t=e.stats,n=e.columns;return Object(E.jsx)(Ue.a,{width:"100%",height:"250px",chartType:"ComboChart",loader:Object(E.jsx)("div",{children:"Waiting Data"}),data:t,options:Object(T.a)({isStacked:!0,vAxis:{title:"Nombre de missions"},hAxis:{title:"Journ\xe9e"},seriesType:"bars",series:{3:{type:"line"}}},We),chartWrapperParams:{view:{columns:n}}})},$e=[{value:1,label:"Total"},{value:2,label:"Mort ou vif"},{value:3,label:"Victoire"}],Qe=function(e){var t=e.stats,n=p.a.useState(1),a=Object(Y.a)(n,2),i=a[0],c=a[1];return Object(E.jsxs)(E.Fragment,{children:[1===i?Object(E.jsx)(qe,{stats:t[0],columns:[0,4]}):Object(E.jsx)(E.Fragment,{}),2===i?Object(E.jsx)(qe,{stats:t[0],columns:[0,1,2,3,4]}):Object(E.jsx)(E.Fragment,{}),3===i?Object(E.jsx)(qe,{stats:t[1],columns:[0,1,2,3,4,5]}):Object(E.jsx)(E.Fragment,{}),Object(E.jsx)(Ke.a,{defaultValue:$e[0],options:$e,onChange:function(e){(null===e||void 0===e?void 0:e.value)&&c(e.value)},menuPlacement:"top"})]})},Xe=C.a.div(me||(me=Object(S.a)(["\n\twidth: 50%;\n"]))),Ze=C.a.p(Oe||(Oe=Object(S.a)(["\n\tcolor: var(--background-light);\n\tmargin: 5px 0 0 0;\n"]))),et=C.a.div(xe||(xe=Object(S.a)(["\n\tdisplay: flex;\n\tjustify-content: space-between;\n"]))),tt=C.a.div(fe||(fe=Object(S.a)(["\n\ttext-align: left;\n"]))),nt=C.a.div(ve||(ve=Object(S.a)(["\n\ttext-align: right;\n"]))),at=C.a.div(ge||(ge=Object(S.a)(["\n\tdisplay: flex;\n\talign-content: center;\n\tjustify-content: center;\n\tflex-wrap: wrap;\n\tmargin-top: 20px;\n"]))),it=C.a.div(ye||(ye=Object(S.a)(["\n\tflex-basis: ",";\n\twidth: ",';\n\t& *[dir="ltr"] {\n\t\tmargin: 0 auto;\n\t}\n'])),(function(e){return e.wide?"75%":"49%"}),(function(e){return e.wide?e.wide:"25%"})),ct=function(e){var t,n,a=U(),i=e.id,c=W(ae),r=W(ie),s=p.a.useState({}),o=Object(Y.a)(s,2),u=o[0],l=o[1],d=p.a.useState({}),j=Object(Y.a)(d,2),b=j[0],h=j[1],m=p.a.useState({}),O=Object(Y.a)(m,2),x=O[0],f=O[1],g=p.a.useState({}),y=Object(Y.a)(g,2),S=y[0],k=y[1],_=p.a.useState(new Array(0)),C=Object(Y.a)(_,2),D=C[0],w=C[1];p.a.useEffect((function(){a(Z(i))}),[i]);var A=function(e,t){for(var n=1,a=0,i=new Date(t,e,n);i.getMonth()===e;)Je.includes(i.getDay())&&a++,n++,i=new Date(t,e,n);return a};return p.a.useEffect((function(){r||(l(function(){var e=[["Role","Nombre"]];if(c){for(var t=0;t<Object.keys(c.roles.roles_count).length;t++){var n=Object.keys(c.roles.roles_count)[t];Object.values(c.roles.roles_count)[t]>0&&e.push([n,Object.values(c.roles.roles_count)[t]])}return e.sort((function(e,t){return"number"===typeof e[1]&&"number"===typeof t[1]?t[1]-e[1]:0}))}return[].concat(e,[["",0]])}()),h(function(){var e=[["Status fin","Nombre"]];if(c){var t=c.total_player_status.Vivant,n=c.total_player_status.Mort;return t&&e.push(["Vivant",t]),n&&e.push(["Mort",n]),t+n!==c.count_missions&&e.push(["Inconnu",c.count_missions-(t+n)]),e}return[].concat(e,[["",0]])}()),f(function(){var e=[["Verdict","Nombre"]];if(c){var t=c.total_mission_status.SUCCES,n=c.total_mission_status.ECHEC,a=c.total_mission_status.PVP;return t&&e.push(["Succ\xe8s",t]),n&&e.push(["Echec",n]),a&&e.push(["PVP",a]),t+n+a!==c.count_missions&&e.push(["Inconnu",c.count_missions-(t+n+a)]),e}return[].concat(e,[["",0]])}()),k(function(){var e=["Mois","Nombre","Maximum*"];if(c){for(var t=[],n=0;n<Object.keys(c.months).length;n++){var a=Object.keys(c.months)[n],i=v()(a,"MMM YYYY");Object.values(c.months)[n]>0&&t.push([a,Object.values(c.months)[n],A(i.month(),i.year())])}return[e].concat(Object(J.a)(t.reverse()))}return[e,["",0,0]]}()),w(function(){var e=[["Journ\xe9e","Vivant","Mort","Inconnu","Total",""]],t=[["Journ\xe9e","Succ\xe8s","Echec","Inconnu","Total","PVP"]];if(c){for(var n=0;n<Object.keys(c.days).length;n++){var a=Object.keys(c.days)[n],i=Object.values(c.days)[n];if(i.count>0){var r=v()().day(parseInt(a)).format("dd");e.push([r,i.Vivant,i.Mort,i.Inconnu,i.count,0]),t.push([r,i.SUCCES,i.ECHEC,i.INCONNU,i.count,i.PVP])}}return[e,t]}return[[].concat(e,[["",0,0,0,0,0]]),[].concat(t,[["",0,0,0,0,0]])]}()))}),[r]),Object(E.jsxs)(Xe,{children:[r?Object(E.jsx)(de,{}):Object(E.jsx)(E.Fragment,{}),Object(E.jsxs)(Ze,{children:["Mis \xe0 jour le : ",v()(null===c||void 0===c?void 0:c.updated).format("DD/MM/YYYY - HH:mm")]}),Object(E.jsxs)(et,{children:[Object(E.jsxs)(tt,{children:[Object(E.jsxs)("h2",{children:["#",null===c||void 0===c?void 0:c.id," - ",null===c||void 0===c?void 0:c.name]}),Object(E.jsxs)("p",{children:[(null===c||void 0===c?void 0:c.count_missions)||0," missions au compteur"]}),Object(E.jsxs)("p",{children:["Derni\xe8re mission jou\xe9 le ",null===c||void 0===c||null===(t=c.last_mission)||void 0===t?void 0:t.date," ",Object(E.jsx)(Te,{element:null===c||void 0===c||null===(n=c.last_mission)||void 0===n?void 0:n.mission_status})]})]}),Object(E.jsx)(nt,{children:Object(E.jsx)(Be,{player:c})})]}),Object(E.jsx)(re,{}),Object(E.jsxs)(at,{children:[Object(E.jsxs)(it,{children:[Object(E.jsx)("h3",{children:"Mort ou vif"}),Object(E.jsx)(Ue.a,{width:"100%",height:"auto",chartType:"PieChart",loader:Object(E.jsx)("div",{children:"Waiting Data"}),data:b,options:Object(T.a)({},We)}),Object(E.jsxs)("p",{children:["Ratio :"," ",((null===c||void 0===c?void 0:c.total_player_status.Vivant)/(null===c||void 0===c?void 0:c.total_player_status.Mort)).toLocaleString(void 0,{maximumFractionDigits:2})]}),Object(E.jsxs)("p",{children:["A \xe9t\xe9 vivant"," ",(null===c||void 0===c?void 0:c.streak.vivant.count)>(null===c||void 0===c?void 0:c.streak.vivant.max)?null===c||void 0===c?void 0:c.streak.vivant.count:null===c||void 0===c?void 0:c.streak.vivant.max," ","fois sans interruption"]}),Object(E.jsxs)("p",{children:["A \xe9t\xe9 mort"," ",(null===c||void 0===c?void 0:c.streak.mort.count)>(null===c||void 0===c?void 0:c.streak.mort.max)?null===c||void 0===c?void 0:c.streak.mort.count:null===c||void 0===c?void 0:c.streak.mort.max," ","fois sans interruption"]})]}),Object(E.jsx)(se,{}),Object(E.jsxs)(it,{children:[Object(E.jsx)("h3",{children:"Victoire"}),Object(E.jsx)(Ue.a,{width:"100%",height:"auto",chartType:"PieChart",loader:Object(E.jsx)("div",{children:"Waiting Data"}),data:x,options:Object(T.a)({},We)}),Object(E.jsxs)("p",{children:["Ratio :"," ",((null===c||void 0===c?void 0:c.total_mission_status.SUCCES)/(null===c||void 0===c?void 0:c.total_mission_status.ECHEC)).toLocaleString(void 0,{maximumFractionDigits:2})]})]}),Object(E.jsxs)(it,{wide:"100%",children:[Object(E.jsx)("h3",{children:"Roles"}),Object(E.jsx)(Ue.a,{width:"100%",height:"300px",chartType:"ColumnChart",loader:Object(E.jsx)("div",{children:"Waiting Data"}),data:u,options:{isStacked:!0,legend:"none",vAxis:{title:"Nombre de missions"},hAxis:{title:"Role",textPosition:"none"},colors:["#ADEBAD"]}})]}),Object(E.jsxs)(it,{children:[Object(E.jsx)("h3",{children:"Nombre de missions par mois"}),Object(E.jsx)(Ue.a,{width:"100%",height:"250px",chartType:"LineChart",loader:Object(E.jsx)("div",{children:"Waiting Data"}),data:S,options:Object(T.a)({isStacked:!0,vAxis:{title:"Nombre de missions",minValue:0},hAxis:{title:"Mois"},series:{1:{lineDashStyle:[4,4]}}},We)}),Object(E.jsx)("p",{children:"*//TODO Explication Max"})]}),Object(E.jsxs)(it,{children:[Object(E.jsx)("h3",{children:"Nombre de missions par journ\xe9e"}),Object(E.jsx)(Qe,{stats:D})]})]})]})},rt=C.a.div(Se||(Se=Object(S.a)(["\n    display: flex;\n    justify-content: center;\n    align-content: center;\n"]))),st=C.a.p(ke||(ke=Object(S.a)(["\n    color: var(--background-light);\n    margin: 5px 0 0 0;\n"]))),ot=function(){var e=U(),t=W(ne),n=W(ie),a=p.a.useState(),i=Object(Y.a)(a,2),c=i[0],r=i[1],s=p.a.useState(),o=Object(Y.a)(s,2),u=o[0],l=o[1];p.a.useEffect((function(){t.players.length<=0?e(X()):(r(d()),l(j()))}),[t]);var d=function(){var e=["Joueur","Nombre de missions"];return t.players.length>0?[e].concat(Object(J.a)(t.players.slice().sort((function(e,t){return t.count_missions-e.count_missions})).slice(0,3).map((function(e){return[e.name,e.count_missions]})))):[e,["",0]]},j=function(){if(t.players.length>0){var e,n=0,a=Object(He.a)(t.players);try{for(a.s();!(e=a.n()).done;){n+=e.value.count_missions}}catch(i){a.e(i)}finally{a.f()}return n/t.players.length}return 0};return Object(E.jsxs)("div",{children:[n?Object(E.jsx)(de,{}):Object(E.jsx)(E.Fragment,{}),Object(E.jsxs)(st,{children:["Mis \xe0 jour le : ",v()(null===t||void 0===t?void 0:t.updated).format("DD/MM/YYYY - HH:mm:ss")]}),Object(E.jsxs)("h2",{children:[null===t||void 0===t?void 0:t.players.length," joueurs ont \xe9t\xe9 trouv\xe9s"]}),Object(E.jsx)(rt,{children:Object(E.jsx)(Ue.a,{width:"auto",height:"auto",chartType:"ColumnChart",loader:Object(E.jsx)("div",{children:"Loading Chart"}),data:c,options:{isStacked:!0,chart:{title:"3 plus gros joueurs"},legend:"none",vAxis:{title:"Nombre de missions"},colors:["#ADEBAD"]}})}),Object(E.jsxs)("p",{children:["Chaque joueur a jou\xe9 ",null===u||void 0===u?void 0:u.toLocaleString(void 0,{maximumFractionDigits:0})," missions en moyenne"]})]})},ut=n(72),lt=C.a.div(_e||(_e=Object(S.a)(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    width: 15%;\n\n    & > label {\n        width: 100%;\n        display: flex;\n        flex-direction: column;\n        text-align: left;\n        & > * {\n            margin: 5px 0 10px 0;\n            & > div:first-of-type {\n                border-radius: 5px 5px 0 0;\n                border: 0;\n                border-bottom: 1px solid var(--text);\n            }\n        }\n    }\n"]))),dt=function(e){var t=e.setPlayer,n=U(),a=Object(_.g)(),i=W(ne),c=p.a.useState(new Array(0)),r=Object(Y.a)(c,2),s=r[0],o=r[1],u=p.a.useRef(null);return p.a.useEffect((function(){i.players.length>0?o(i.players.map((function(e){return{name:e.name,value:e.id}}))):o([{name:"R\xe9cuperer les joueurs",value:0}])}),[i]),Object(E.jsx)(lt,{children:Object(E.jsxs)("label",{children:["Joueur :",Object(E.jsx)(ut.a,{ref:u,options:s,onChange:function(e){e&&(0===e.value?n(X()):(t(e.value.toString()),window.history.replaceState(null,"","#"+a.pathname.replace(/(\b\/.*$|$)/,"/"+e.value.toString()))))},onKeyDown:function(e){"Delete"===e.key&&u.current&&u.current.select&&(u.current.select.select.clearValue(),t(""),window.history.replaceState(null,"","#"+a.pathname.replace(/(\b\/.*$|$)/,"")))},components:{DropdownIndicator:function(){return null},IndicatorSeparator:function(){return null},Placeholder:function(){return null}},getOptionLabel:function(e){return"".concat(0!=e.value?"string"!==typeof e.value||parseInt(e.value)?"#".concat(e.value):e.value:"").concat(e.value&&e.name?" - ":"").concat(e.name||"")}})]})})},jt=C.a.div(Ce||(Ce=Object(S.a)(["\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n"]))),bt=function(e){var t=e.playerID,n=p.a.useState(t),a=Object(Y.a)(n,2),i=a[0],c=a[1];return Object(E.jsxs)(jt,{children:[Object(E.jsx)(dt,{setPlayer:c}),Object(E.jsx)(re,{width:"50%"}),i?Object(E.jsx)(ct,{id:i}):Object(E.jsx)(ot,{})]})},ht=C.a.h1(De||(De=Object(S.a)(["\n    visibility: hidden;\n    margin: 0;\n"]))),pt=function(){var e=Object(_.h)().id;return Object(E.jsxs)("div",{children:[Object(E.jsx)(ht,{children:"Joueurs"}),Object(E.jsx)(bt,{playerID:e})]})},mt=n.p+"static/media/canardhurt.ed18cd85.png",Ot=C.a.div(we||(we=Object(S.a)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    height: 100%;\n"]))),xt=function(){return Object(E.jsxs)(Ot,{children:[Object(E.jsx)("h1",{children:"404"}),Object(E.jsx)("h2",{children:"Page non trouv\xe9e"}),Object(E.jsx)("img",{src:mt}),Object(E.jsx)("p",{children:"Alors l\xe0, on vous a perdu..."})]})},ft=C.a.div(Ee||(Ee=Object(S.a)(["\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center;\n    height: 100%;\n"]))),vt=function(){return Object(E.jsxs)(ft,{children:[Object(E.jsx)("h1",{children:"501"}),Object(E.jsx)("h2",{children:"Page en cours de construction"}),Object(E.jsxs)("p",{children:['"Vous pouvez attendre le temps que je bosse ?"',Object(E.jsx)("br",{}),Object(E.jsx)("a",{href:"https://github.com/oxypomme",children:"OxyTom"}),", 2021"]})]})},gt=Object(B.b)("maps/fetchMapList",Object(G.a)(z.a.mark((function e(){return z.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(Q()(q.a,"/maps"));case 2:return e.next=4,e.sent.json();case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})))),yt=Object(B.c)({name:"map",initialState:{mapList:{maps:[],updated:""},isFetching:!1},extraReducers:(Ae={},Object(H.a)(Ae,gt.pending.type,(function(e){return Object(T.a)(Object(T.a)({},e),{},{isFetching:!0})})),Object(H.a)(Ae,gt.fulfilled.type,(function(e,t){var n=t.payload;return Object(T.a)(Object(T.a)({},e),{},{mapList:n,isFetching:!1})})),Object(H.a)(Ae,gt.rejected.type,(function(e,t){var n=t.error;return console.error(n),Object(T.a)(Object(T.a)({},e),{},{isFetching:!1})})),Ae),reducers:{}}),St=function(e){return e.map},kt=Object(K.a)(St,(function(e){return e.mapList})),_t=Object(K.a)(St,(function(e){return e.isFetching})),Ct=yt.reducer,Dt=C.a.div(Fe||(Fe=Object(S.a)(["\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    flex-direction: column;\n"]))),wt=C.a.p(Me||(Me=Object(S.a)(["\n    color: var(--background-light);\n    margin: 5px 0 0 0;\n"]))),Et=function(){var e=U(),t=W(kt),n=W(_t),a=p.a.useState(),i=Object(Y.a)(a,2),c=i[0],r=i[1];p.a.useEffect((function(){(null===t||void 0===t?void 0:t.maps.length)<=0?e(gt()):r(s())}),[t]);var s=function(){var e=["Map","Nombre de missions"];return(null===t||void 0===t?void 0:t.maps.length)>0?[e].concat(Object(J.a)(null===t||void 0===t?void 0:t.maps.slice().sort((function(e,t){return e.mission_count-t.mission_count})).slice(0,5).map((function(e){return[e.name,e.mission_count]})))):[e,["",0]]};return Object(E.jsxs)("div",{children:[n?Object(E.jsx)(de,{}):Object(E.jsx)(E.Fragment,{}),Object(E.jsxs)(wt,{children:["Mis \xe0 jour le : ",v()(null===t||void 0===t?void 0:t.updated).format("DD/MM/YYYY - HH:mm")]}),Object(E.jsxs)(Dt,{children:[Object(E.jsx)("h2",{children:"Maps les moins jou\xe9es"}),Object(E.jsx)(Ue.a,{width:"600px",height:"300px",chartType:"ColumnChart",loader:Object(E.jsx)("div",{children:"Loading Chart"}),data:c,options:{isStacked:!0,hAxis:{title:"Map"},legend:"none",vAxis:{title:"Nombre de missions"},colors:["#ADEBAD"]}})]})]})},At=function(){return Object(E.jsx)(E.Fragment,{children:Object(E.jsx)(Et,{})})},Ft=n(73),Mt=C.a.footer(Le||(Le=Object(S.a)(["\n    background-color: var(--background-dark);\n    text-align: center;\n    font-size: 14px;\n    height: var(--footer-size);\n    padding: 5px;\n    \n    position:absolute;\n    width:100%;\n    bottom:0px;\n"]))),Lt=C.a.span(Ne||(Ne=Object(S.a)(["\n    text-decoration: underline;\n"]))),Nt=C.a.a(Ie||(Ie=Object(S.a)(["\n    ","\n    text-decoration: none;\n    & > svg{\n        ","\n        transition: opacity 0.25s;\n    }\n    &:hover > svg{\n        opacity: 0.75;\n    }\n"])),(function(e){return e.VAlign?"vertical-align: middle;":""}),(function(e){return e.margin?"margin:"+e.margin+";":""})),It=function(){return Object(E.jsxs)(Mt,{children:[Object(E.jsxs)("p",{children:["All icons used are from ",Object(E.jsxs)(Nt,{href:"https://fontawesome.com",children:[Object(E.jsx)(D.a,{icon:Ft.a,color:"#339af0"})," ",Object(E.jsx)(Lt,{children:"Font Awesome"})]}),"."]}),Object(E.jsx)("p",{children:Object(E.jsx)("a",{href:"https://github.com/oxypomme/gdcgraph/graphs/contributors",children:"Liste des contributeurs"})})]})},Pt=C.a.div(Pe||(Pe=Object(S.a)(["\n  text-align: center;\n"]))),Vt=function(){return Object(E.jsxs)(k.a,{basename:"/",children:[Object(E.jsx)(L,{}),Object(E.jsx)(Pt,{children:Object(E.jsxs)(_.c,{children:[Object(E.jsx)(_.a,{exact:!0,path:"/",component:V}),Object(E.jsx)(_.a,{exact:!0,path:["/players","/players/:id"],component:pt}),Object(E.jsx)(_.a,{exact:!0,path:["/missions","/missions/:id"],component:vt}),Object(E.jsx)(_.a,{exact:!0,path:"/maps",component:At}),Object(E.jsx)(_.a,{component:xt})]})}),Object(E.jsx)(It,{})]})},Yt=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,99)).then((function(t){var n=t.getCLS,a=t.getFID,i=t.getFCP,c=t.getLCP,r=t.getTTFB;n(e),a(e),i(e),c(e),r(e)}))},Tt=n(15),Jt=Object(Tt.c)({player:ce,map:Ct});var Ut=Object(B.a)({reducer:Jt});v.a.extend(y.a),v.a.locale("fr"),O.a.render(Object(E.jsx)(p.a.StrictMode,{children:Object(E.jsx)(x.a,{store:Ut,children:Object(E.jsx)(Vt,{})})}),document.getElementById("root")),Yt()}},[[97,1,2]]]);
//# sourceMappingURL=main.83e2c2ad.chunk.js.map