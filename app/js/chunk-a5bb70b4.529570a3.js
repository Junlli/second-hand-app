(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a5bb70b4"],{"0029":function(t,e,c){"use strict";var n=c("8581"),i=c.n(n);i.a},1399:function(t,e,c){"use strict";c.r(e);var n=function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"collection"},[c("home-header",{attrs:{message:"我的收藏"}}),c("div",[c("ul",t._l(t.collectionList,function(e){return c("li",[c("van-card",{attrs:{price:e.commodity.c_price/100,title:e.commodity.c_title,thumb:t.$SERVER.FILEURL+e.commodity.c_images[0]}},[c("div",{attrs:{slot:"footer"},slot:"footer"},[c("van-button",{on:{click:function(c){return t.cancelCollect(e._id)}}},[t._v("删除")])],1)])],1)}),0)])],1)},i=[],o=c("cebc"),a=c("2f62"),s=c("71c2"),r={name:"collection",data:function(){return{collectionList:[]}},components:{HomeHeader:s["a"]},computed:Object(o["a"])({},Object(a["d"])(["userInfo"]),Object(a["b"])([])),methods:Object(o["a"])({},Object(a["c"])([]),{getCollectionList:function(){var t=this;this.$api(this.$SERVER.GET_COLLECTIONLIST,{params:{u_id:this.userInfo._id}}).then(function(e){return t.collectionList=e.data.list})},cancelCollect:function(t){var e=this;this.$api(this.$SERVER.GET_COLLECTIONDEL,{params:{id:t}}).then(function(t){e.getCollectionList()})}}),created:function(){this.getCollectionList()},mounted:function(){}},l=r,u=(c("0029"),c("2877")),d=Object(u["a"])(l,n,i,!1,null,"4742a584",null);e["default"]=d.exports},"1df0":function(t,e,c){"use strict";var n=c("85ba"),i=c.n(n);i.a},"71c2":function(t,e,c){"use strict";var n=function(){var t=this,e=t.$createElement,c=t._self._c||e;return c("div",{staticClass:"header"},[c("header",{staticClass:"return"},[c("span",{staticClass:"iconfont return-icon",on:{click:t.toLastPage}},[t._v("")]),c("div",{staticClass:"title"},[t._v(t._s(t.message))])])])},i=[],o=c("cebc"),a=c("2f62"),s={data:function(){return{title:""}},props:["message"],computed:Object(o["a"])({},Object(a["d"])([]),Object(a["b"])([])),methods:Object(o["a"])({},Object(a["c"])([]),{toLastPage:function(){this.$router.go(-1)}}),created:function(){},mounted:function(){}},r=s,l=(c("1df0"),c("2877")),u=Object(l["a"])(r,n,i,!1,null,"13f53bd2",null);e["a"]=u.exports},8581:function(t,e,c){},"85ba":function(t,e,c){}}]);
//# sourceMappingURL=chunk-a5bb70b4.529570a3.js.map