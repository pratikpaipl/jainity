(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{"p/Xa":function(n,o,t){"use strict";t.r(o),t.d(o,"OtpverificationPageModule",(function(){return l}));var i=t("ofXK"),e=t("3Pt+"),b=t("TEn/"),r=t("tyNb"),c=t("fXoL");const s=[{path:"",component:(()=>{class n{constructor(n,o){this.router=n,this.route=o,this.route.params.subscribe(n=>{console.log("params =>",n.mno),this.mno=n.mno})}onSubmitClick(){this.router.navigate(["/home"])}onResendClick(){this.router.navigate(["/home"])}ngOnInit(){}}return n.\u0275fac=function(o){return new(o||n)(c.Hb(r.g),c.Hb(r.a))},n.\u0275cmp=c.Bb({type:n,selectors:[["app-otpverification"]],decls:26,vars:0,consts:[[1,"page_block"],[1,"page_box"],["src","../../assets/img/logo.png",1,"logo"],[1,"content"],["position","floating"],["type","number","maxlength","6"],["shape","round","expand","block",1,"btn-orange","w-100",3,"click"],[2,"text-align","center"],["color","primary",3,"click"]],template:function(n,o){1&n&&(c.Kb(0,"ion-content"),c.Kb(1,"div",0),c.Kb(2,"div",1),c.Kb(3,"ion-grid"),c.Kb(4,"ion-row"),c.Kb(5,"ion-col"),c.Ib(6,"ion-img",2),c.Jb(),c.Jb(),c.Kb(7,"ion-row"),c.Kb(8,"ion-col"),c.Kb(9,"ion-label",3),c.dc(10,"Please Enter Verification Code Send to *****"),c.Jb(),c.Jb(),c.Jb(),c.Kb(11,"ion-row"),c.Kb(12,"ion-col"),c.Kb(13,"ion-item"),c.Kb(14,"ion-label",4),c.dc(15,"Enter OTP"),c.Jb(),c.Ib(16,"ion-input",5),c.Jb(),c.Jb(),c.Jb(),c.Kb(17,"ion-row"),c.Kb(18,"ion-col"),c.Kb(19,"ion-button",6),c.Sb("click",(function(){return o.onSubmitClick()})),c.dc(20,"SUBMIT"),c.Jb(),c.Jb(),c.Jb(),c.Kb(21,"ion-row"),c.Kb(22,"ion-col",7),c.Kb(23,"ion-label",8),c.Sb("click",(function(){return o.onResendClick()})),c.Kb(24,"u"),c.dc(25,"Resend?"),c.Jb(),c.Jb(),c.Jb(),c.Jb(),c.Jb(),c.Jb(),c.Jb(),c.Jb())},directives:[b.e,b.f,b.n,b.d,b.i,b.l,b.k,b.j,b.x,b.c],styles:[""]}),n})()}];let a=(()=>{class n{}return n.\u0275mod=c.Fb({type:n}),n.\u0275inj=c.Eb({factory:function(o){return new(o||n)},imports:[[r.i.forChild(s)],r.i]}),n})(),l=(()=>{class n{}return n.\u0275mod=c.Fb({type:n}),n.\u0275inj=c.Eb({factory:function(o){return new(o||n)},imports:[[i.b,e.b,b.t,a]]}),n})()}}]);