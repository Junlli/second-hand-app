(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-11d2c284"],{"2c25":function(t,s,a){"use strict";a.r(s);var i=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"store"},[a("header",{staticClass:"return"},[a("span",{staticClass:"iconfont",on:{click:t.toLastPage}},[t._v("")])]),a("section",{staticClass:"user-info"},[a("a",{staticClass:"icon",attrs:{href:""}},[a("img",{attrs:{src:t.seller.u_avatar,alt:""}})]),a("span",{staticClass:"userName"},[t._v(t._s(t.seller.u_name))]),a("span",{staticClass:"school"},[t._v(t._s(t.seller.u_school))])]),a("section",{staticClass:"list"},t._l(t.commodityList,function(s){return a("div",{staticClass:"product",on:{click:function(a){return t.toDetail(s._id)}}},[a("a",[a("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.$SERVER.FILEURL+s.c_images[0],expression:"$SERVER.FILEURL + item.c_images[0]"}],staticClass:"product-img",attrs:{alt:""}}),a("div",{staticClass:"detail"},[a("p",{staticClass:"name"},[t._v(t._s(s.c_title))]),a("div",{staticClass:"price"},[a("span",{staticClass:"left"},[t._v("￥")]),a("span",{staticClass:"right"},[t._v(t._s(s.c_price/100))])]),a("span",{staticClass:"sales"},[t._v("销量： "+t._s(s.c_sales))])])])])}),0)])},e=[],c=a("cebc"),n=a("2f62"),o={name:"Store",data:function(){return{commodityList:[],seller:""}},computed:Object(c["a"])({},Object(n["d"])(["userInfo"]),Object(n["b"])([])),methods:Object(c["a"])({},Object(n["c"])([]),{toLastPage:function(){this.$router.go(-1)},getCommodityList:function(){var t=this;this.$api(this.$SERVER.GET_COMMODITYLIST,{params:{u_id:this.$route.params.id,c_state:1}}).then(function(s){t.commodityList=s.data.list})},getUserInfo:function(){var t=this;this.$api(this.$SERVER.GET_USERINFO,{params:{id:this.$route.params.id}}).then(function(s){return t.seller=s.data})},toDetail:function(t){this.$router.push({name:"detail",params:{id:t}})}}),created:function(){this.getCommodityList(),this.getUserInfo()},mounted:function(){}},r=o,l=(a("693b"),a("2877")),u=Object(l["a"])(r,i,e,!1,null,"08118c80",null);s["default"]=u.exports},"693b":function(t,s,a){"use strict";var i=a("fa28"),e=a.n(i);e.a},fa28:function(t,s,a){}}]);
//# sourceMappingURL=chunk-11d2c284.dfe0a509.js.map