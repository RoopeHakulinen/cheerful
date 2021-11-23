"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[360],{6360:(C,l,c)=>{c.r(l),c.d(l,{AcrobaticsModule:()=>y});var s=c(6019),a=c(3886),t=c(3668),d=c(5986),p=c(2450),r=c(1510);const u=function(i){return["/acrobatics",i]};let f=(()=>{class i{}return i.\u0275fac=function(o){return new(o||i)},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-show-acrobatic"]],inputs:{id:"id",name:"name",icon:"icon",difficulty:"difficulty"},decls:10,vars:10,consts:[[1,"acrobatics-container","clickable",3,"routerLink"],[1,"title"],[1,"icon"],["translate","ACROBATICS.DIFFICULTY",1,"difficulty"],[1,"difficulty-number"]],template:function(o,e){1&o&&(t.TgZ(0,"div",0),t.TgZ(1,"div",1),t._uU(2),t.ALo(3,"translate"),t.ALo(4,"uppercase"),t.qZA(),t.TgZ(5,"mat-icon",2),t._uU(6),t.qZA(),t._UZ(7,"div",3),t.TgZ(8,"div",4),t._uU(9),t.qZA(),t.qZA()),2&o&&(t.Q6J("routerLink",t.VKq(8,u,e.id)),t.xp6(2),t.Oqu(t.lcZ(3,4,t.lcZ(4,6,"ACROBATICS."+e.name))),t.xp6(4),t.Oqu(e.icon),t.xp6(3),t.Oqu(e.difficulty))},directives:[a.rH,p.Hw,r.Pi],pipes:[r.X$,s.gd],styles:['.title[_ngcontent-%COMP%]{grid-area:title;text-decoration:underline}.icon[_ngcontent-%COMP%]{grid-area:icon-container;margin-top:5px;font-size:40px;width:100%;height:100%}.difficulty[_ngcontent-%COMP%]{grid-area:difficulty}.difficulty-number[_ngcontent-%COMP%]{grid-area:difficulty-number}.acrobatics-container[_ngcontent-%COMP%]{height:100%;font-family:"Roboto",sans-serif;display:grid;grid-template-columns:100%;grid-template-rows:20% 40% 20% 20%;grid-template-areas:"title" "icon-container" "difficulty" "difficulty-number"}']}),i})();function m(i,n){if(1&i&&(t.TgZ(0,"div",3),t._UZ(1,"app-show-acrobatic",4),t.qZA()),2&i){const o=n.$implicit;t.xp6(1),t.Q6J("difficulty",o.difficulty)("icon",o.icon)("id",o.id)("name",o.name)}}const g=[{path:":id",component:(()=>{class i{constructor(o){this.route=o,this.id=parseInt(this.route.snapshot.paramMap.get("id"),10)}}return i.\u0275fac=function(o){return new(o||i)(t.Y36(a.gz))},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-single-acrobatic-page"]],decls:7,vars:4,consts:[["backUrl","/acrobatics",3,"title"],[1,"single-acrobatic-page"]],template:function(o,e){1&o&&(t._UZ(0,"app-toolbar",0),t.ALo(1,"translate"),t.TgZ(2,"div",1),t.TgZ(3,"h1"),t._uU(4),t.qZA(),t.TgZ(5,"p"),t._uU(6,"Lis\xe4tietoja koreografiasta yms."),t.qZA(),t.qZA()),2&o&&(t.Q6J("title",t.lcZ(1,2,"ACROBATICS.TITLE")),t.xp6(4),t.hij("Koreografian id: ",e.id,""))},directives:[d.n],pipes:[r.X$],styles:[".single-acrobatic-page[_ngcontent-%COMP%]{text-align:center;width:100%;height:100%}"]}),i})()},{path:"",component:(()=>{class i{constructor(){this.availableAcrobatics=[{id:1,name:"Jump",icon:"settings_accessibility",difficulty:2},{id:2,name:"Stand",icon:"accessibility",difficulty:1},{id:3,name:"Walk",icon:"directions_walk",difficulty:1},{id:4,name:"Run",icon:"directions_run",difficulty:2},{id:5,name:"Wave",icon:"emoji_people",difficulty:1},{id:6,name:"Throw",icon:"sports_handball",difficulty:3},{id:7,name:"Lift",icon:"sports_kabaddi",difficulty:4}]}}return i.\u0275fac=function(o){return new(o||i)},i.\u0275cmp=t.Xpm({type:i,selectors:[["app-acrobatics"]],decls:4,vars:4,consts:[["backUrl","/choreographies",3,"title"],[1,"acrobatics"],["class","single-acrobatic",4,"ngFor","ngForOf"],[1,"single-acrobatic"],[3,"difficulty","icon","id","name"]],template:function(o,e){1&o&&(t._UZ(0,"app-toolbar",0),t.ALo(1,"translate"),t.TgZ(2,"div",1),t.YNc(3,m,2,4,"div",2),t.qZA()),2&o&&(t.Q6J("title",t.lcZ(1,2,"ACROBATICS.TITLE")),t.xp6(3),t.Q6J("ngForOf",e.availableAcrobatics))},directives:[d.n,s.sg,f],pipes:[r.X$],styles:[".acrobatics[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.acrobatics[_ngcontent-%COMP%]   .single-acrobatic[_ngcontent-%COMP%]{text-align:center;margin:5%;height:150px;width:150px;border:2px solid black;border-radius:20%;background:azure}"]}),i})()}];let b=(()=>{class i{}return i.\u0275fac=function(o){return new(o||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[[a.Bz.forChild(g)],a.Bz]}),i})();var A=c(3156);let y=(()=>{class i{}return i.\u0275fac=function(o){return new(o||i)},i.\u0275mod=t.oAB({type:i}),i.\u0275inj=t.cJS({imports:[[s.ez,b,p.Ps,A.q]]}),i})()}}]);