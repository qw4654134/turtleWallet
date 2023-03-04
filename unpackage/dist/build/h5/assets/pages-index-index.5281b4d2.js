import{k as a,l as e,m as t,j as l,n as s,o as c,c as o,w as i,i as n,b as d,d as u,t as p,p as h,q as f,F as r,u as _,v as m}from"./index.00515032.js";import{_ as g}from"./_plugin-vue_export-helper.cdc0426e.js";const x=g({data:()=>({systemLocale:"",applicationLocale:""}),computed:{locales(){return[{text:this.$t("locale.auto"),code:"auto"},{text:this.$t("locale.en"),code:"en"},{text:this.$t("locale.zh-hans"),code:"zh-Hans"},{text:this.$t("locale.zh-hant"),code:"zh-Hant"},{text:this.$t("locale.ja"),code:"ja"}]}},onLoad(){let l=a();this.systemLocale=l.language,this.applicationLocale=e(),this.isAndroid="android"===l.platform.toLowerCase(),t((a=>{this.applicationLocale=a.locale}))},methods:{onLocaleChange(a){this.isAndroid?l({content:this.$t("index.language-change-confirm"),success:e=>{e.confirm&&s(a.code)}}):(s(a.code),this.$i18n.locale=a.code)}}},[["render",function(a,e,t,l,s,g){const x=n,$=_;return c(),o(x,{class:"container"},{default:i((()=>[d(x,{class:"title"},{default:i((()=>[u(p(a.$t("index.demo")),1)])),_:1}),d(x,{class:"description"},{default:i((()=>[u(p(a.$t("index.demo-description")),1)])),_:1}),d(x,{class:"detail-link"},{default:i((()=>[u(p(a.$t("index.detail"))+": ",1),d($,{class:"link"},{default:i((()=>[u("https://uniapp.dcloud.net.cn/collocation/i18n")])),_:1})])),_:1}),d(x,{class:"locale-setting"},{default:i((()=>[u(p(a.$t("index.language-info")),1)])),_:1}),d(x,{class:"list-item"},{default:i((()=>[d($,{class:"k"},{default:i((()=>[u(p(a.$t("index.system-language"))+":",1)])),_:1}),d($,{class:"v"},{default:i((()=>[u(p(s.systemLocale),1)])),_:1})])),_:1}),d(x,{class:"list-item"},{default:i((()=>[d($,{class:"k"},{default:i((()=>[u(p(a.$t("index.application-language"))+":",1)])),_:1}),d($,{class:"v"},{default:i((()=>[u(p(s.applicationLocale),1)])),_:1})])),_:1}),d(x,{class:"locale-setting"},{default:i((()=>[u(p(a.$t("index.language")),1)])),_:1}),d(x,{class:"locale-list"},{default:i((()=>[(c(!0),h(r,null,f(g.locales,((a,e)=>(c(),o(x,{class:"locale-item",key:e,onClick:e=>g.onLocaleChange(a)},{default:i((()=>[d($,{class:"text"},{default:i((()=>[u(p(a.text),1)])),_:2},1024),a.code==s.applicationLocale?(c(),o($,{key:0,class:"icon-check"})):m("",!0)])),_:2},1032,["onClick"])))),128))])),_:1})])),_:1})}],["__scopeId","data-v-ab99941d"]]);export{x as default};
