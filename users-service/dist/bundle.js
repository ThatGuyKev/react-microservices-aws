!function(e){var r={};function n(s){if(r[s])return r[s].exports;var t=r[s]={i:s,l:!1,exports:{}};return e[s].call(t.exports,t,t.exports,n),t.l=!0,t.exports}n.m=e,n.c=r,n.d=function(e,r,s){n.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,r){if(1&r&&(e=n(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var t in e)n.d(s,t,function(r){return e[r]}.bind(null,t));return s},n.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(r,"a",r),r},n.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},n.p="",n(n.s=8)}([function(e,r){e.exports=require("sequelize")},function(e,r){e.exports=require("bcryptjs")},function(e,r){e.exports=require("body-parser")},function(e,r){e.exports=require("cors")},function(e,r){e.exports=require("express")},function(e,r){e.exports=require("date-fns")},function(e,r){e.exports=require("uuid/v4")},function(e,r){e.exports=require("@babel/polyfill")},function(e,r,n){"use strict";n.r(r);n(7);var s=n(0);const t={};var o=(e,r)=>{if(!(e in process.env)){if(r)return r;throw new Error(`${e} not found in process.env!`)}return t[e]?t[e]:(t[e]=process.env[e],process.env[e])};const a=o("DB_URI");var i=new s.Sequelize(a,{dialectOptions:{charset:"utf8",multipleStatements:!0},logging:!1}),u=n(2),l=n.n(u),d=n(3),c=n.n(d),p=n(4),y=n.n(p),f=n(5);class w extends s.Model{}w.init({id:{allowNull:!1,primaryKey:!0,type:s.DataTypes.UUID},email:{allowNull:!1,type:s.DataTypes.STRING,unique:!0},passwordHash:{allowNull:!1,type:s.DataTypes.CHAR(64)}},{defaultScope:{rawAttribultes:{exclude:["passwordHash"]}},modelName:"users",sequelize:i});class b extends s.Model{}b.init({id:{allowNull:!1,primaryKey:!0,type:s.DataTypes.UUID},userId:{allowNull:!1,reference:{key:"id",model:"users"},type:s.DataTypes.UUID},expiresAt:{allowNull:!1,type:s.DataTypes.DATE}},{modelName:"userSessions",paranoid:!1,sequelize:i,updatedAt:!1});var m=n(6),v=n.n(m);var I=()=>v()(),x=n(1),g=n.n(x);var h=e=>g.a.hashSync(e,g.a.genSaltSync(12));var j=(e,r)=>g.a.compareSync(e,r);var D=e=>{e.post("/sessions",async(e,r,n)=>{if(!e.body.email||!e.body.password)return n(new Error("Invalid body!"));try{const s=await w.findOne({attributes:{},where:{email:e.body.email}});if(!s)return n(new Error("Invalid email!"));if(!j(e.body.password,s.passwordHash))return n(new Error("Incorrect password"));const t=Object(f.addHours)(new Date,1),o=I(),a=await b.create({expiresAt:t,id:o,userId:s.id});return r.json(a)}catch(e){return n(e)}}),e.delete("/sessions/:sessionId",async(e,r,n)=>{try{const s=await b.findByPk(e.params.sessionId);return s?(await s.destroy(),r.end()):n(new Error("Invalid session ID"))}catch(e){return n(e)}}),e.get("/sessions/:sessionId",async(e,r,n)=>{try{const s=await b.findByPk(e.params.sessionId);return s?r.json(s):n(new Error("Invalid session ID"))}catch(e){return n(e)}}),e.post("/users",async(e,r,n)=>{if(!e.body.email||!e.body.password)return n(new Error("Invalid body!"));try{const n=await w.create({email:e.body.email,id:I(),passwordHash:h(e.body.password)});return r.json(n)}catch(e){return n(e)}}),e.get("/users/:userId",async(e,r,n)=>{try{const s=await w.findByPk(e.params.userId);return s?r.json(s):n(new Error("Invalid user ID"))}catch(e){return n(e)}})};const S=o("PORT",7101),q=y()();q.use(l.a.json()),q.use(c()({origin:(e,r)=>r(null,!0),credentials:!0})),D(q),q.use((e,r,n,s)=>n.status(500).json({message:e.message})),q.listen(S,"0.0.0.0",()=>{console.info(`Users service listening on ${S}`)})}]);