import{Z as e,X as o,o as a,c as s,w as t,i as d,b as l,p as r,q as n,F as i,d as c,y as m,A as _,a0 as f,t as u,S as b,e as g}from"./index.0a4c0685.js";import{_ as p}from"./z-paging.e80fc9a2.js";import{r as k}from"./uni-app.es.c3027b2b.js";import{A as x}from"./app.0d53c675.js";import{A as h}from"./address-books.73be62e8.js";import{_ as y}from"./ETH.9f110baa.js";import{_ as A}from"./_plugin-vue_export-helper.cdc0426e.js";const j=A({data:()=>({address_books:[],load_more_default_text:{en:"Pull up to load more","zh-Hans":"下拉加载更多"},load_more_loading_text:{en:"loading","zh-Hans":"加载中"},load_more_no_more_text:{en:"no more","zh-Hans":"没有了"},load_more_fail_text:{en:"Failed to load,try agin","zh-Hans":"加载失败,请重试"}}),onLoad(){x.checkAppInit()},onShow(){this.loadBooks()},methods:{loadBooks:function(){let e=h.getList();return Array.isArray(e)?(this.address_books=e,this.$refs.paging.complete(e),this.address_books):(this.$refs.paging.complete(!1),!1)},selectAddressBook:function(a){e("select_book",a),o()}}},[["render",function(e,o,x,h,A,j){const z=g,H=d,w=k(m("z-paging"),p),B=_,v=f;return a(),s(H,null,{default:t((()=>[l(w,{ref:"paging","refresher-enabled":!1,"to-bottom-loading-more-enabled":!1,"loading-more-default-text":A.load_more_default_text,"loading-more-loading-text":A.load_more_loading_text,"loading-more-no-more-text":A.load_more_no_more_text,"loading-more-fail-text":A.load_more_fail_text,modelValue:A.address_books,"onUpdate:modelValue":o[0]||(o[0]=e=>A.address_books=e),onQuery:j.loadBooks},{default:t((()=>[(a(!0),r(i,null,n(A.address_books,((e,o)=>(a(),s(H,{class:"address-book-item flex-row-start-center",onClick:o=>j.selectAddressBook(e)},{default:t((()=>[l(H,{class:"asset-info flex-column-center-center"},{default:t((()=>["ETH"==e.asset.symbol?(a(),s(z,{key:0,class:"asset-icon",src:y})):(a(),s(H,{key:1,class:"token-default-icon flex-row-center-center"},{default:t((()=>[c(u(e.asset.symbol[0]),1)])),_:2},1024)),l(H,{class:"font-desc-black"},{default:t((()=>[c(u(e.asset.symbol),1)])),_:2},1024)])),_:2},1024),l(H,{class:b(["book-info",[o!=A.address_books.length-1?"address-book-item-border":""]])},{default:t((()=>[l(H,{class:"book-name font-desc-gray"},{default:t((()=>[c(u(e.name),1)])),_:2},1024),l(H,{class:"book-address font-desc-black"},{default:t((()=>[c(u(e.address),1)])),_:2},1024),l(H,{class:"book-desc font-desc-gray-little"},{default:t((()=>[c(u(e.desc),1)])),_:2},1024)])),_:2},1032,["class"])])),_:2},1032,["onClick"])))),256))])),_:1},8,["loading-more-default-text","loading-more-loading-text","loading-more-no-more-text","loading-more-fail-text","modelValue","onQuery"]),l(v,{class:"add-btn flex-row-center-center","open-type":"navigate",url:"/pages/address-book/add-book"},{default:t((()=>[l(B,{class:"form-btn"},{default:t((()=>[c("Add")])),_:1})])),_:1})])),_:1})}],["__scopeId","data-v-f2a6b431"]]);export{j as default};
