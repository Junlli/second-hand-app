(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4b48a53e"],{"0c64":function(t,c,s){},"9c97":function(t,c,s){"use strict";var o=s("0c64"),i=s.n(o);i.a},feb7:function(t,c,s){"use strict";s.r(c);var o=function(){var t=this,c=t.$createElement,s=t._self._c||c;return s("div",{staticClass:"page"},[s("header",{staticClass:"selectSchool"},[s("span",{staticClass:"iconfont",on:{click:t.toCity}},[t._v("")]),s("span",{staticClass:"school"},[t._v("学校选择")])]),s("div",[s("h2",{staticClass:"city"},[t._v(t._s(t.city))]),s("ul",t._l(t.schoolList,function(c){return s("li",{staticClass:"schoolName",on:{click:function(s){return t.changeSchool(c.name)}}},[t._v(t._s(c.name))])}),0)])])},i=[],n=s("cebc"),a=s("2f62"),e={data:function(){return{city:this.$route.params.id,schoolList:[]}},computed:Object(n["a"])({},Object(a["d"])(["schoolName"])),methods:Object(n["a"])({},Object(a["c"])(["setSchool"]),{toCity:function(){this.$router.push("/city")},changeSchool:function(t){this.setSchool(t),this.$router.push("/")}}),created:function(){var t=this;this.$api(this.$SERVER.GET_SCHOOLBYCITYNAME,{params:{name:this.city}}).then(function(c){t.schoolList=c.data})}},h=e,l=(s("9c97"),s("2877")),u=Object(l["a"])(h,o,i,!1,null,"0d16b9f2",null);c["default"]=u.exports}}]);
//# sourceMappingURL=chunk-4b48a53e.245106dc.js.map