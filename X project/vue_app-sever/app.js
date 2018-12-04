//app.js
//1:加载模块
const express = require("express");
const qs=require("querystring")
const pool  = require("./pool");
const session = require('express-session');
//2:创建express对象
var app = express();
var local="http://172.20.10.6:1674/img/";
//服务器node.js 允许跨域访问配置项
//2.1:引入跨域模块   
const cors = require("cors");
//2.2:配置允许哪个程序跨域访问 脚手架   11:16
app.use(cors({
  origin:[
    "http://127.0.0.1:1999","http://localhost:1999"],
  credentials:true
}))

//3:指定静态目录
//服务器指定目录 绝对路径 出错
app.use(express.static(__dirname+"/public"));
app.use(session({
  secret:'随机字符串',
  cookie:{maxAge:60*1000*30},
  resave:false,
  saveUninitialized:true
}));
//4:绑定监听端口
app.listen(1674);
//功能一:学子商城首页图片轮播
//GET /imagelist   json
app.get("/imagelist",(req,res)=>{
  var obj = [
  [
    {id:0,img_url:local+"index/banner0.jpg"},
    {id:1,img_url:local+"index/banner1.jpg"},
    {id:2,img_url:local+"index/banner2.jpg"},
    {id:3,img_url:local+"index/banner3.jpg"}
  ],
  [
    [local+"index/guanwangshouye_640_01.jpg"],
    [local+"index/chaoliuzhi.jpg"],
    [local+"index/guanwangshouye_640_03.jpg"],
    [local+"index/guanwangshouye_640_04.jpg"],
    [local+"index/guanwangshouye_640_05.jpg"],
    [local+"index/guanwangshouye_640_06.jpg"],
    [local+"index/guanwangshouye_640_07.jpg"],
    [local+"index/guanwangshouye_640_08.jpg"],
    [local+"index/guanwangshouye_640_09.jpg"],
    [local+"index/guanwangshouye_640_10.jpg"],
    [local+"index/guanwangshouye_640_11.jpg"],
    [local+"index/guanwangshouye_640_12.jpg"],
    [local+"index/guanwangshouye_640_13.jpg"],
    [local+"index/guanwangshouye_640_14.jpg"],
    [local+"index/guanwangshouye_640_15.jpg"],
    [local+"index/guanwangshouye_640_16.jpg"],
    [local+"index/guanwangshouye_640_17.jpg"],
    [local+"index/guanwangshouye_640_18.jpg"],
    [local+"index/guanwangshouye_640_19.jpg"],
    [local+"index/guanwangshouye_640_20.jpg"],
    [local+"index/guanwangshouye_640_21.jpg"],
    [local+"index/guanwangshouye_640_22.jpg"],
    [local+"index/guanwangshouye_640_23.jpg"],
    [local+"index/guanwangshouye_640_24.jpg"],
    [local+"index/guanwangshouye_640_25.jpg"],
    [local+"index/guanwangshouye_640_26.jpg"],
    [local+"index/guanwangshouye_640_27.jpg"],
    [local+"index/guanwangshouye_640_28.jpg"],
    [local+"index/guanwangshouye_640_29.jpg"],
    [local+"index/guanwangshouye_640_30.jpg"],
    [local+"index/guanwangshouye_640_31.jpg"],
    [local+"index/guanwangshouye_640_32.jpg"],
    [local+"index/guanwangshouye_640_33.jpg"],
    [local+"index/guanwangshouye_640_34.jpg"],
    [local+"index/guanwangshouye_640_35.jpg"],
    [local+"index/guanwangshouye_640_36.jpg"],
    [local+"index/guanwangshouye_640_37.jpg"],
    [local+"index/guanwangshouye_640_38.jpg"],
    [local+"index/guanwangshouye_640_39.jpg"],
    [local+"index/guanwangshouye_640_40.jpg"],
    [local+"index/guanwangshouye_640_41.jpg"],
    [local+"index/guanwangshouye_640_42.jpg"],
    [local+"index/guanwangshouye_640_43.jpg"],
    [local+"index/guanwangshouye_640_44.jpg"],
    [local+"index/guanwangshouye_640_45.jpg"],
    [local+"index/guanwangshouye_640_46.jpg"],
    [local+"index/guanwangshouye_640_47.jpg"],
    [local+"index/guanwangshouye_640_48.jpg"],
    [local+"index/guanwangshouye_640_49.jpg"],
    [local+"index/guanwangshouye_640_50.jpg"],
    [local+"index/guanwangshouye_640_51.jpg"],
    [local+"index/guanwangshouye_640_52.jpg"],
    [local+"index/guanwangshouye_640_53.jpg"],
    [local+"index/logoN.png"],
  ],
];
  res.send(obj)
});


app.post("/login",(req,res)=>{
  req.on("data",(buf)=>{
    var str=buf.toString();
    var obj=JSON.parse(str);
    var un=obj.un;
    var up=obj.up;
    var sql="SELECT * FROM login WHERE uname=? AND upwd=?"
    pool.query(sql,[un,up],(err,result)=>{
      if(err) throw err;
      if(result.length==0){
        res.send({c:-1,msg:"账号或密码错误"})
      }else{
        res.send({c:1,msg:"登录成功"})
      }
    })
  })
})


app.get("/test01",(req,res)=>{
  var id=req.query.id;
  var age=req.query.age;
  res.send(id+1+age);
})

app.post("/register",(req,res)=>{
  req.on("data",(buf)=>{
    var str=buf.toString();
    var obj=JSON.parse(str);
    var un=obj.un;
    var up=obj.up;
    var phone=obj.phone;
    var sql="SELECT uname FROM users WHERE uname=?"
    pool.query(sql,[un],(err,result)=>{
      if(err) throw err;
      if(result.length==0){
        var sql="INSERT into users VALUES(null,null,?,?,?,null,null)"
        pool.query(sql,[un,up,phone],(err,result)=>{
          if(err) throw err;
          if(result.affectedRows>0){
            res.send({c:1,msg:"注册成功"})
            var sql="INSERT into login VALUES(null,?,?)"
            pool.query(sql,[un,up],(err,result)=>{
              if(err) throw err;
            })
          }else{
            res.send({c:-1,msg:"注册失败"})
          }
        })
      }else{
        res.send({c:-1,msg:"相同用户名,请重新输入！"})
      }
    })
  })
})

app.get("/shoplist",(req,res)=>{
  var obj=[
    {id:1,title:"全部"},
    {id:2,title:"男鞋",
    list:[
        {img:local+"shoplist/20189291350143870A0EC66B898A64A8626B32F968089EC3.jpg",title:"跑步鞋"},
        {img:local+"shoplist/201872014221987821BD5CC6C1F8E392E17FC17475D506E3.jpg",title:"综训鞋"},
        {img:local+"shoplist/D7B7B9AC2AA104FAC66BEF547AF0BC6D.jpg",title:"休闲鞋"},
        {img:local+"shoplist/F3E1AC00FB0B89F7F9C952217FAB4F8C.jpg",title:"板鞋"},
        {img:local+"shoplist/928440AECF70A75D20861D45C80074F2.jpg",title:"篮球鞋"},
        {img:local+"shoplist/4886DD1175B83F72D5E6AADFD418B982.jpg",title:"足球鞋"}
      ]
    },
    {id:3,title:"女鞋",list:[
        {img:local+"shoplist/E962F10037783C0FD481E4E30D60F28D.jpg",title:"跑步鞋"},
        {img:local+"shoplist/F97945EA5610BB9B3B68A9B0745D11DB.jpg",title:"休闲鞋"},
        {img:local+"shoplist/C91C70EB6EF22AD408C99BEE3449E262.jpg",title:"板鞋"},
        {img:local+"shoplist/20187201423213140021E74FC5F6964318BEA977AB4B563E.jpg",title:"综训鞋"}
      ]
    },
    {id:4,title:"男装",list:[
      {img:local+"shoplist/062B1E0DEEC3ED7CD82B91F27E0AD280.jpg",title:"针织衫/卫衣/长T"},
      {img:local+"shoplist/201881022241773275945C49010FB555A1A5CC10A064F5CF.jpg",title:"长裤"},
      {img:local+"shoplist/CB93D94CD20C70CA467290D4F7862E26.jpg",title:"风衣夹克"},
      {img:local+"shoplist/2A6E54A3DEF6EEE9B13B6E6C759F5E2A.jpg",title:"羽绒服"},
      {img:local+"shoplist/5AC683D8C855BD5FD02770F75E5211B2.jpg",title:"运动套装"},
      {img:local+"shoplist/2018810221959107AE51C734069E11D71D38DBC269D11820.jpg",title:"运动T恤"},
      {img:local+"shoplist/20188102223099525916A3061EBC29A185305AAA5BB6283.jpg",title:"休闲T恤"},
      {img:local+"shoplist/201881022235130880151831E85B13F0BB1840F3501A914D.jpg",title:"短裤"}
    ]
  },
  {id:5,title:"女装",list:[
      {img:local+"shoplist/88FE421700EEE8341342761A84271704.jpg",title:"针织衫/卫衣/长T"},
      {img:local+"shoplist/2018810223548540EB3A04E3E2B46B9344DF32AE6E0D12DE.jpg",title:"长裤"},
      {img:local+"shoplist/9948F3DA67A86ADFBE337F6DCC757FF2.jpg",title:"风衣夹克"},
      {img:local+"shoplist/7E13BFE2EC6A411E4AC4E063D9B90F92.jpg",title:"羽绒服"},
      {img:local+"shoplist/2018810223248667A0931EBCC2BD085CBE3D7EA768B05A68.jpg",title:"运动T恤"},
      {img:local+"shoplist/2018810223345597A5CB26ECEA1CCE549EA12906E5169CC1.jpg",title:"休闲T恤"},
      {img:local+"shoplist/2018810223437518BB356470914B5B72D5925015D50A4D55.jpg",title:"短裤"}
    ]
  },
  {id:6,title:"童鞋",list:[
    {img:local+"shoplist/6C8C9E63F607C947D32D0D1BB149B08C.jpg",title:"跑步鞋"},
    {img:local+"shoplist/CCB65C1C6F315FDB934B3CDE9A21BA4D.jpg",title:"休闲鞋"},
    {img:local+"shoplist/9C9C56D3E6B627CB8AAEA1404582CAC3.jpg",title:"板鞋"},
    {img:local+"shoplist/56E81BDD86ED08268880CDD9846354E1.jpg",title:"凉鞋"},
    ]
  },
  {id:7,title:"童鞋",list:[
    {img:local+"shoplist/2777EFE8ECDC60300C7AFF9AB488A9AA.jpg",title:"毛衣/卫衣/长袖T恤"},
    {img:local+"shoplist/E380129C062A5871A5716308C8AFEFE2.jpg",title:"长裤"},
    {img:local+"shoplist/F1DEADDF4BFE1E0E6665D75B4E0BE3D1.jpg",title:"棉服夹克"},
    {img:local+"shoplist/B47FF36115B50621DA9EF71C0A93AD51.jpg",title:"春秋外套"}
    ]
  },  
  {id:8,title:"运动配件",list:[
    {img:local+"shoplist/7A9A66BA0B32B30AF7AAD4CFF46FB0CD.jpg",title:"运动包"},
    {img:local+"shoplist/B6A5F3411352F4EFC5619E8E545E83B1.jpg",title:"运动袜"},
    {img:local+"shoplist/04766509DDB4518A476D1E26FE0C3C80.jpg",title:"帽子"},
    {img:local+"shoplist/201881022375381926474783AC242DA7BDA89C0ED64DC292.jpg",title:"护具"},
    {img:local+"shoplist/201881022365681886ABCC42877971F9DB09019B09EC300F.jpg",title:"内裤"},
    {img:local+"shoplist/7E62A53A891368E685739B1B3264F16D.jpg",title:"其他"}
    ]
  }
]
  res.send(obj);
})

app.get("/shoplists",(req,res)=>{
  var obj=[
    {id:1,img:local+"shoplists/1.jpg",title:"【一代风火鞋复刻】特步 专柜款 男子运动鞋 秋冬新款经典休闲老爹鞋982419326878",price:339,new:229,old:599,shop:0,color:["红色"],size:['39码', '40码', '41码','42码','43码','44码','45码'],sm_img:[local+"shopinfo/2018829161397907048F7FCFB88E5A105844C879323C775.jpg"],snum:982419326878,type:"休闲鞋",
    imginfo:[
      local+"shopinfo/982419326878yh_01.jpg",
      local+"shopinfo/982419326878yh_02.jpg",
      local+"shopinfo/982419326878yh_03.jpg",
      local+"shopinfo/982419326878yh_04.jpg",
      local+"shopinfo/982419326878yh_05.jpg",
      local+"shopinfo/982419326878yh_06.jpg",
      local+"shopinfo/982419326878yh_07.jpg",
      local+"shopinfo/982419326878yh_08.jpg",
      local+"shopinfo/982419326878yh_09.jpg",
      local+"shopinfo/982419326878yh_10.jpg",
      local+"shopinfo/TB2OaS1qFXXXXbbXXXXXXXXXXXX-353571709.jpg"
    ]},
    {id:2,img:local+"shoplists/2.jpg",title:"特步 专柜款 男子跑步鞋 动力巢X弹力十足科技运动鞋982319110157",price:339,new:239,old:439,shop:667,color:["黑色","黑红色","黑深灰色","兰红色","红色"],size:['39码', '40码', '41码','42码','43码','44码','45码'],sm_img:[local+"shopinfo/8238FC37A69C1B21ACC5FD1AAD82DE3A.jpg",local+"shopinfo/70B5F4ADBFEE085F0D3528E8C445979C.jpg",local+"shopinfo/87391E49773074E815EEC6D0BEC0223D.jpg",local+"shopinfo/E32DAB62661486B477FF2D60CCC15A2A.jpg",local+"shopinfo/8C2A14CFDE42AC5CF559877D87B263D1.jpg"],snum:982319110157,type:"跑步鞋",
    imginfo:[
      local+"shopinfo/982319110157yh_01.jpg",
      local+"shopinfo/982319110157yh_02.jpg",
      local+"shopinfo/982319110157yh_03.jpg",
      local+"shopinfo/982319110157yh_04.jpg",
      local+"shopinfo/982319110157yh_05.jpg",
      local+"shopinfo/982319110157yh_06.jpg",
      local+"shopinfo/982319110157yh_07.jpg",
      local+"shopinfo/982319110157yh_08.jpg",
      local+"shopinfo/982319110157yh_09.jpg",
      local+"shopinfo/982319110157yh_10.jpg",
      local+"shopinfo/982319110157yh_11.jpg",
      local+"shopinfo/982319110157yh_12.jpg",
      local+"shopinfo/982319110157yh_13.jpg",
      local+"shopinfo/982319110157yh_14.jpg",
      local+"shopinfo/982319110157yh_15.jpg",
      local+"shopinfo/982319110157yh_16.jpg",
      local+"shopinfo/982319110157yh_18.jpg",
      local+"shopinfo/982319110157yh_19.jpg",
      local+"shopinfo/982319110157yh_20.jpg",
      local+"shopinfo/982319110157yh_21.jpg",
      local+"shopinfo/cc.jpg",local+"shopinfo/sh.jpg"
    ]},
    {id:3,img:local+"shoplists/3.jpg",title:"特步 女子跑鞋 19年春季新品透气休闲皮面女子耐磨跑步鞋881118119265",price:109,new:99,old:239,shop:65,color:["黑白色","黑灰色"],size:['35码','36码', '37码', '38码','39码','40码'],sm_img:[local+"shopinfo/20181025182542105DE21637A03E443E51F66BE3D5BF60F20.jpg",local+"shopinfo/201810251825525895E3D945FADA621E40E5C6A822932889.jpg"],snum:881118119265,type:"跑步鞋",
    imginfo:[
      local+"shopinfo/881118119265-pcyh_01.jpg",
      local+"shopinfo/881118119265-pcyh_02.jpg",
      local+"shopinfo/881118119265-pcyh_03.jpg",
      local+"shopinfo/881118119265-pcyh_04.jpg",
      local+"shopinfo/881118119265-pcyh_05.jpg",
      local+"shopinfo/881118119265-pcyh_06.jpg",
      local+"shopinfo/881118119265-pcyh_07.jpg",
      local+"shopinfo/881118119265-pcyh_08.jpg",
      local+"shopinfo/881118119265-pcyh_09.jpg",
      local+"shopinfo/881118119265-pcyh_10.jpg",
      local+"shopinfo/881118119265-pcyh_11.jpg",
      local+"shopinfo/881118119265-pcyh_12.jpg",
      local+"shopinfo/881118119265-pcyh_13.jpg",
      local+"shopinfo/881118119265-pcyh_14.jpg",
      local+"shopinfo/881118119265-pcyh_15.jpg",
      local+"shopinfo/881118119265-pcyh_16.jpg",
      local+"shopinfo/881118119265-pcyh_18.jpg",
      local+"shopinfo/cc.jpg",local+"shopinfo/sh.jpg"
    ]},
    {id:4,img:local+"shoplists/4.jpg",title:"【Smiley】特步 男子针织长裤 2018秋冬新款Smiley联名款系列运动长裤982429631518",price:279,new:109,old:439,shop:667,color:["黑色"],size:['S码', 'M码', 'L码','XL码','2XL码',"3XL码"],sm_img:[local+"shopinfo/20181031923496369423DD69E80A76014D3E04DE0ED4CBB4.jpg"],snum:982429631518,type:"长裤",
    imginfo:[
      local+"shopinfo/982429631518_01.jpg",
      local+"shopinfo/982429631518_02.jpg",
      local+"shopinfo/982429631518_03.jpg",
      local+"shopinfo/982429631518_04.jpg",
      local+"shopinfo/982429631518_05.jpg",
      local+"shopinfo/982429631518_06.jpg",
      local+"shopinfo/982429631518_07.jpg",
      local+"shopinfo/982429631518_08.jpg",
      local+"shopinfo/982429631518_09.jpg",
      local+"shopinfo/982429631518_10.jpg",
      local+"shopinfo/982429631518_11.jpg",
      local+"shopinfo/982429631518_12.jpg",
      local+"shopinfo/982429631518_13.jpg",
      local+"shopinfo/TB2OaS1qFXXXXbbXXXXXXXXXXXX-353571709.jpg"
    ]},
    {id:5,img:local+"shoplists/5.jpg",title:"【Smiley】特步 专柜款 女装运动装羽绒服2018秋冬新款正品短款保暖轻薄982428190789",price:628,new:539,old:489,shop:522,color:["黑色","米白色"],size:['XS码','S码', 'M码', 'L码','XL码','XXL码'],sm_img:[local+"shopinfo/201891315595197801CA000711586EEFF748163E4C757256.jpg",local+"shopinfo/2018913155927692EB06D94227FC1BFC4FDAF05E1590A72F.jpg"],snum:982428190789,type:"羽绒服",
    imginfo:[
      local+"shopinfo/982428190789_01.jpg",
      local+"shopinfo/982428190789_02.jpg",
      local+"shopinfo/982428190789_03.jpg",
      local+"shopinfo/982428190789_04.jpg",
      local+"shopinfo/982428190789_05.jpg",
      local+"shopinfo/982428190789_06.jpg",
      local+"shopinfo/982428190789_07.jpg",
      local+"shopinfo/982428190789_08.jpg",
      local+"shopinfo/982428190789_09.jpg",
      local+"shopinfo/982428190789_10.jpg",
      local+"shopinfo/982428190789_11.jpg",
      local+"shopinfo/982428190789_12.jpg",
      local+"shopinfo/982428190789_13.jpg",
      local+"shopinfo/982428190789_14.jpg",
      local+"shopinfo/982428190789_15.jpg",
      local+"shopinfo/982428190789_16.jpg",
      local+"shopinfo/TB2OaS1qFXXXXbbXXXXXXXXXXXX-353571709.jpg"
    ]},
    {id:6,img:local+"shoplists/6.jpg",title:"特步 专柜款 男子夏季减震旋跑鞋 18年新品科技男鞋982219116965",price:249,new:199,old:1439,shop:87,color:["黑色","黑墨绿色","兰绿色","灰绿色"],size:['39码', '40码', '41码','42码','43码','44码','45码'],sm_img:[local+"shopinfo/B0D1E79DEC4F99A4A2CC3FDB245F5492.jpg",local+"shopinfo/2018971493420546D2EF0B9D49198EEDEB242169F8E403.jpg_620x10000q90g.jpg",local+"shopinfo/2018971414565074968FC9F1279F5BE369E6AC0DAD75A56.jpg",local+"shopinfo/45DB4AE29DE524DF1F091971D5E133D9.jpg"],snum:982219116965,type:"跑步鞋",
    imginfo:[
      local+"shopinfo/TB2RmqXgr9YBuNjy0FgXXcxcXXa_!!353571709.jpg",
      local+"shopinfo/TB2tGqGgER1BeNjy0FmXXb0wVXa_!!353571709.jpg",
      local+"shopinfo/TB2Pwq9XoD.BuNjt_h7XXaNDVXa_!!353571709.jpg",
      local+"shopinfo/TB2nVsediOYBuNjSsD4XXbSkFXa_!!353571709.jpg",
      local+"shopinfo/TB25lVDlH5YBuNjSspoXXbeNFXa_!!353571709.jpg",
      local+"shopinfo/TB2Ul6fgCtYBeNjSspaXXaOOFXa_!!353571709.jpg",
      local+"shopinfo/TB2NfCXgqmWBuNjy1XaXXXCbXXa_!!353571709.jpg",
      local+"shopinfo/TB2WyGkgxGYBuNjy0FnXXX5lpXa_!!353571709.jpg",
      local+"shopinfo/TB2UJNCgA9WBuNjSspeXXaz5VXa_!!353571709.jpg",
      local+"shopinfo/TB2RBaXgACWBuNjy0FaXXXUlXXa_!!353571709.jpg",
      local+"shopinfo/TB2iEXBgpGWBuNjy0FbXXb4sXXa_!!353571709.jpg",
      local+"shopinfo/TB2K6tEgAOWBuNjSsppXXXPgpXa_!!353571709.jpg",
      local+"shopinfo/TB2J0dVgx1YBuNjy1zcXXbNcXXa_!!353571709.jpg",
      local+"shopinfo/TB2yYK5gDlYBeNjSszcXXbwhFXa_!!353571709.jpg",
      local+"shopinfo/TB24b0zgpuWBuNjSszbXXcS7FXa_!!353571709.jpg",
      local+"shopinfo/TB2HItVguGSBuNjSspbXXciipXa_!!353571709.jpg",
      local+"shopinfo/TB2OaS1qFXXXXbbXXXXXXXXXXXX-353571709.jpg"
    ]},
    {id:7,img:local+"shoplists/7.jpg",title:"特步 男子夏季T恤 休闲透气简约百搭短袖882229019182",price:339,new:239,old:439,shop:66,color:["黑色","白色"],size:['L码','XL码'],sm_img:[local+"shopinfo/FA82720767895D23202C7DF8E804CDF9.jpg",local+"shopinfo/5A65BB76AA86BC7D535F660CE1FC352A.jpg"],snum:882229019182,type:"休闲T恤",
    imginfo:[
      local+"shopinfo/TB2OA3Tb29TBuNjy1zbXXXpepXa_!!353571709.jpg",
      local+"shopinfo/TB2uk7Tb29TBuNjy1zbXXXpepXa_!!353571709.jpg",
      local+"shopinfo/TB2w5wYbY1YBuNjSszhXXcUsFXa_!!353571709.jpg",
      local+"shopinfo/TB22Uo3b49YBuNjy0FfXXXIsVXa_!!353571709.jpg",
      local+"shopinfo/TB2hQM0b4SYBuNjSspjXXX73VXa_!!353571709.jpg",
      local+"shopinfo/TB2laQ_b4GYBuNjy0FnXXX5lpXa_!!353571709.jpg",
      local+"shopinfo/TB2STwUbY5YBuNjSspoXXbeNFXa_!!353571709.jpg",
      local+"shopinfo/TB2VEA4bY9YBuNjy0FgXXcxcXXa_!!353571709.jpg",
      local+"shopinfo/TB2yFZWb41YBuNjy1zcXXbNcXXa_!!353571709.jpg",
      local+"shopinfo/TB2LmkIb9CWBuNjy0FhXXb6EVXa_!!353571709.jpg",
      local+"shopinfo/TB2WHZZb1uSBuNjSsziXXbq8pXa_!!353571709.jpg",
      local+"shopinfo/TB2CBoPb25TBuNjSspcXXbnGFXa_!!353571709.jpg",
      local+"shopinfo/TB2OaS1qFXXXXbbXXXXXXXXXXXX-353571709.jpg"
    ]},
    {id:8,img:local+"shoplists/8.jpg",title:"特步 专柜款 男子春季跑步鞋 动力巢科技跑鞋982119116727",price:39,new:29,old:109,shop:55,color:["黑白色","黑金色","兰红色","红黑色","绿兰"],size:['39码', '40码', '41码','42码','43码','44码','45码'],sm_img:[local+"shopinfo/BC6709E34305B6846F733A8509A50EE5.jpg",local+"shopinfo/D9527A16D58D09E74F96A703F983A1AE.jpg",local+"shopinfo/D472DDDD24700F310F6951A0B0C3CA33.jpg",local+"shopinfo/40EBFDA0916C85B826EC75FDB0FB8D39.jpg",local+"shopinfo/64C211051CB97495031C0F82FC187E6A.jpg"],snum:982119116727,type:"跑步鞋",
    imginfo:[
      local+"shopinfo/982119116727yh_01.jpg",
      local+"shopinfo/982119116727yh_02.jpg",
      local+"shopinfo/982119116727yh_03.jpg",
      local+"shopinfo/982119116727yh_04.jpg",
      local+"shopinfo/982119116727yh_05.jpg",
      local+"shopinfo/982119116727yh_06.jpg",
      local+"shopinfo/982119116727yh_07.jpg",
      local+"shopinfo/982119116727yh_08.jpg",
      local+"shopinfo/982119116727yh_09.jpg",
      local+"shopinfo/982119116727yh_10.jpg",
      local+"shopinfo/982119116727yh_11.jpg",
      local+"shopinfo/982119116727yh_12.jpg",
      local+"shopinfo/982119116727yh_13.jpg",
      local+"shopinfo/982119116727yh_14.jpg",
      local+"shopinfo/982119116727yh_15.jpg",
      local+"shopinfo/982119116727yh_16.jpg",
      local+"shopinfo/982119116727yh_17.jpg",
      local+"shopinfo/982119116727yh_18.jpg",
      local+"shopinfo/982119116727_01.jpg",
      local+"shopinfo/982119116727_02.jpg",
      local+"shopinfo/982119116727_03.jpg",
      local+"shopinfo/982119116727_04.jpg",
      local+"shopinfo/982119116727_05.jpg",
      local+"shopinfo/982119116727_06.jpg",
      local+"shopinfo/982119116727_07.jpg",
      local+"shopinfo/982119116727_08.jpg",
      local+"shopinfo/982119116727_09.jpg",
      local+"shopinfo/982119116727_10.jpg",
      local+"shopinfo/982119116727_11.jpg",
      local+"shopinfo/982119116727_12.jpg",
      local+"shopinfo/cc.jpg",local+"shopinfo/sh.jpg"
    ]},
    {id:9,img:local+"shoplists/9.jpg",title:"特步 男子夏季T恤 都市休闲潮流男装882229019101",price:239,new:209,old:799,shop:855,color:["白色","黑色"],size:['M码', 'L码','XL码','2XL码','3XL码'],sm_img:[local+"shopinfo/EE484D39CE4BA7538ABF9AE7517B06C3.jpg",local+"shopinfo/7AB1CD424B4FD0907593AE4B0C5A3524.jpg"],snum:882229019101,type:"休闲T恤",
    imginfo:[
      local+"shopinfo/TB2xtPJbACWBuNjy0FaXXXUlXXa_!!353571709.jpg",
      local+"shopinfo/TB2jJnMbx9YBuNjy0FfXXXIsVXa_!!353571709.jpg",
      local+"shopinfo/TB22ATybr1YBuNjSszeXXablFXa_!!353571709.jpg",
      local+"shopinfo/TB2yRzwbv9TBuNjy0FcXXbeiFXa_!!353571709.jpg",
      local+"shopinfo/TB26QYybr1YBuNjSszeXXablFXa_!!353571709.jpg",
      local+"shopinfo/TB2O4C9X_qWBKNjSZFxXXcpLpXa_!!353571709.jpg",
      local+"shopinfo/TB2EhnGbuOSBuNjy0FdXXbDnVXa_!!353571709.jpg",
      local+"shopinfo/TB2XMxdbStYBeNjSspkXXbU8VXa_!!353571709.jpg",
      local+"shopinfo/TB2BYXdbSBYBeNjy0FeXXbnmFXa_!!353571709.jpg",
      local+"shopinfo/TB2zhvGbuOSBuNjy0FdXXbDnVXa_!!353571709.jpg",
      local+"shopinfo/TB2aYztbuuSBuNjSsplXXbe8pXa_!!353571709.jpg",
      local+"shopinfo/TB2QQHnbAKWBuNjy1zjXXcOypXa_!!353571709.jpg",
      local+"shopinfo/TB2pkunX7ZmBKNjSZPiXXXFNVXa_!!353571709.jpg",
      local+"shopinfo/TB2Z0fJbxSYBuNjSspjXXX73VXa_!!353571709.jpg",
      local+"shopinfo/cc.jpg",local+"shopinfo/sh.jpg"
    ]},
    {id:10,img:local+"shoplists/10.jpg",title:"特步 专柜款 男子跑步鞋 轻便缓震系带透气网面老爹鞋982219117011",price:49,new:39,old:109,shop:88,color:["白黑色","黑色"],size:['39码', '40码', '41码','42码','43码','44码','45码'],sm_img:[local+"shopinfo/59BDBF76A7BCD9E5C62640632192F76F.jpg",local+"shopinfo/BD95541C257909BCF60FA730E4C008D9.jpg"],snum:982219117011,type:"跑步鞋",
    imginfo:[
      local+"shopinfo/982219117011_01.jpg",
      local+"shopinfo/982219117011_02.jpg",
      local+"shopinfo/982219117011_03.jpg",
      local+"shopinfo/982219117011_04.jpg",
      local+"shopinfo/982219117011_05.jpg",
      local+"shopinfo/982219117011_06.jpg",
      local+"shopinfo/982219117011_07.jpg",
      local+"shopinfo/982219117011_08.jpg",
      local+"shopinfo/982219117011_09.jpg",
      local+"shopinfo/982219117011_10.jpg",
      local+"shopinfo/982219117011_11.jpg",
      local+"shopinfo/982219117011_12.jpg",
      local+"shopinfo/cc.jpg",local+"shopinfo/sh.jpg"
    ]},
  ]
  res.send(obj)
})
app.get("/shopinfo",(req,res)=>{
  var obj=[
    [
    {id:1,img_url:local+"shopinfo/2018829161397907048F7FCFB88E5A105844C879323C775.jpg"},
    {id:2,img_url:local+"shopinfo/2018829161399505A8EF25D9CBAE5558C07079E2CE8434F.jpg"},
    {id:3,img_url:local+"shopinfo/201882916140115515CC42DBFB9B72A7997A78D7BC80399.jpg"},
    {id:4,img_url:local+"shopinfo/201882916140297DAC9F1812E9DED406BF322D0A7F1EA26.jpg"},
    {id:5,img_url:local+"shopinfo/201882916140810364EC29A645527992486995B873730DD.jpg"}
    ],
    [
    {id:1,img_url:local+"shopinfo/70B5F4ADBFEE085F0D3528E8C445979C.jpg"},
    {id:2,img_url:local+"shopinfo/B8673312EDB462D90476F24CAEA155B8.jpg"},
    {id:3,img_url:local+"shopinfo/B397541D901FF40599ECC627B1D44341.jpg"},
    {id:4,img_url:local+"shopinfo/8461CBB983F678E0DF15D31687B76A6D.jpg"},
    {id:5,img_url:local+"shopinfo/4203EFC8165A5D9F1145686F004E046A.jpg"}
    ],
    [
    {id:1,img_url:local+"shopinfo/20181025182542105DE21637A03E443E51F66BE3D5BF60F20.jpg"},
    {id:2,img_url:local+"shopinfo/201810251825422300018540D6FF557F28CBA9DDF26606843.jpg"},
    {id:3,img_url:local+"shopinfo/20181025182542324F8A79EEDC812D395A38EE4062B0AC6FE.jpg"},
    {id:4,img_url:local+"shopinfo/20181025182542386FB601C36591819D9D7C7C2A18197C3A9.jpg"},
    {id:5,img_url:local+"shopinfo/20181025182542480850581E05737215B5DFC433F56B0D134.jpg"}
    ],
    [
    {id:1,img_url:local+"shopinfo/20181031923496369423DD69E80A76014D3E04DE0ED4CBB4.jpg"},
    {id:2,img_url:local+"shopinfo/20181031923497774353FE2C0D6D0665518DD4626AA64CE0.jpg"},
    {id:3,img_url:local+"shopinfo/20181031923502778F3605051F48FB5602659BD0C9890EAE.jpg"},
    {id:4,img_url:local+"shopinfo/20181031923503552A4FAF59C3DEA55E1FA5183EE662787B.jpg"},
    {id:5,img_url:local+"shopinfo/20181031923504966FCFEA10B8A9951175A2DC4616E5D99F.jpg"}
    ],
    [
    {id:1,img_url:local+"shopinfo/201891315595197801CA000711586EEFF748163E4C757256.jpg"},
    {id:2,img_url:local+"shopinfo/2018913155952313307FE40A719E84D0DACEF27657DEA19B.jpg"},
    {id:3,img_url:local+"shopinfo/2018913155952788EE8FE973C13E02BEC435FF535E89B3ED.jpg"},
    {id:4,img_url:local+"shopinfo/2018913155953123FE99DBF9D40F3738F68C4D67DDFCE728.jpg"},
    {id:5,img_url:local+"shopinfo/20189131559535050D2A73EF4541737242CBB8099A099026.jpg"}
    ],
    [
    {id:1,img_url:local+"shopinfo/B0D1E79DEC4F99A4A2CC3FDB245F5492.jpg"},
    {id:2,img_url:local+"shopinfo/7F296A0198DEF0E56DCB520CA78F2144.jpg"},
    {id:3,img_url:local+"shopinfo/88C51BFB5EBE5933E4F648029015835D.jpg"},
    {id:4,img_url:local+"shopinfo/74C92C9BCE7DBA8E44CAD4B06AE2ED13.jpg"},
    {id:5,img_url:local+"shopinfo/5E294CC109F5F7B47E070D9587B754B2.jpg"}
    ],
    [
    {id:1,img_url:local+"shopinfo/FA82720767895D23202C7DF8E804CDF9.jpg"},
    {id:2,img_url:local+"shopinfo/C37021394651A609AA67453ACC2CF508.jpg"},
    {id:3,img_url:local+"shopinfo/911654459EB595B379037A309D7A50C2.jpg"},
    {id:4,img_url:local+"shopinfo/295EDADFF5C5714A9DF2C07084FC4EA5.jpg"},
    {id:5,img_url:local+"shopinfo/694C0AC109804C61D4A815E8E4B4626B.jpg"}
    ],
    [
    {id:1,img_url:local+"shopinfo/BC6709E34305B6846F733A8509A50EE5.jpg"},
    {id:2,img_url:local+"shopinfo/F813DB086AE9D3D3BAEF38461F2DD4C7.jpg"},
    {id:3,img_url:local+"shopinfo/CF40451C9E13921B40961BF2C3A713AC.jpg"},
    {id:4,img_url:local+"shopinfo/06E95F62A710B0D85E237DD04EE580B7.jpg"},
    {id:5,img_url:local+"shopinfo/9D8E943A033A31EF0316C57943570436.jpg"}
    ],
    [
    {id:1,img_url:local+"shopinfo/EE484D39CE4BA7538ABF9AE7517B06C3.jpg"},
    {id:2,img_url:local+"shopinfo/C9D136FA635D4D02F9624268C4FD8CF7.jpg"},
    {id:3,img_url:local+"shopinfo/DDD2CFD22E125C5C5832754B62FD6661.jpg"},
    {id:4,img_url:local+"shopinfo/748AC795448F12DFD43031DF32AA787A.jpg"},
    {id:5,img_url:local+"shopinfo/43A5A2CA3FB313B791EC81CCC498318C.jpg"}
    ],
    [
    {id:1,img_url:local+"shopinfo/59BDBF76A7BCD9E5C62640632192F76F.jpg"},
    {id:2,img_url:local+"shopinfo/12F29D18A47E085054A7D49520CB58C0.jpg"},
    {id:3,img_url:local+"shopinfo/B5D898D78AD380F8EACFDD2D8760F869.jpg"},
    {id:4,img_url:local+"shopinfo/A13E271A47AAC00150B3B642FA38FF16.jpg"},
    {id:5,img_url:local+"shopinfo/A710EE063C29EDB1DB685943711FAB40.jpg"}
    ],
  ]
  res.send(obj)
})

app.get("/allshopinfo",(req,res)=>{
  var obj = [
  [
    {id:0,img_url:local+"shopinfo/TB23ZWQep5N.eBjSZFKXXX_QVXa-353571709.jpg"},
    {id:1,img_url:local+"shopinfo/SIZE_02.jpg"},
    {id:2,img_url:local+"shopinfo/SIZE_03.jpg"},
    {id:3,img_url:local+"shopinfo/SIZE_04.jpg"},
    {id:4,img_url:local+"shopinfo/SIZE_05.jpg"},
    {id:5,img_url:local+"shopinfo/TB2EwdKqYRkpuFjSspmXXc.9XXa-353571709.jpg"},
  ]
]
  res.send(obj)
})


app.post("/shopcart",(req,res)=>{
  req.on("data",(buf)=>{
    var str=buf.toString();
    var obj=JSON.parse(str);
    var id=obj.id;
    var title=obj.title;
    var price=obj.price;
    var color=obj.color;
    var size=obj.size;
    var count=obj.count;
    var img=obj.img;
    var sql='SELECT title,color,size from shopcart where img=? AND size=?'
    pool.query(sql,[img,size],(err,result)=>{
       if(err) throw err;
       if(result.length==0){
        var sql='INSERT into shopcart VALUES(null,?,?,?,?,?,?,?)'
        pool.query(sql,[id,title,price,color,size,count,img],(err,result)=>{
          if(err) throw err;
          res.send({code:1,msg:"添加购物车成功"});               
        })
       }else{
        var sql='SELECT count from shopcart where img=? AND size=?'
        pool.query(sql,[img,size],(err,result)=>{
          if(err) throw err;
          var c=result[0].count+count
          var sql='UPDATE shopcart SET count=? WHERE title=? AND color=?  AND size=?'
          pool.query(sql,[c,title,color,size],(err,result)=>{
            if(err) throw err;
            res.send({code:1,msg:"添加购物车成功"}); 
          })
        });
       }              
    })
  })
})


app.get("/shopcart",(req,res)=>{
  var sql='SELECT * from shopcart ORDER BY id DESC'
    pool.query(sql,(err,result)=>{
       if(err) throw err;
       res.send(result)
    })
})

app.post("/shopadd",(req,res)=>{
  req.on("data",(buf)=>{
    var str=buf.toString();
    var obj=JSON.parse(str);
    var img=obj.img;
    var count=obj.count;
    var size=obj.size;
    var sql='UPDATE shopcart SET count=? WHERE img=? AND size=?'
    pool.query(sql,[count,img,size],(err,result)=>{
      if(err) throw err;
      res.send("OK!")
    })
  })
})

app.post("/delshop",(req,res)=>{
  req.on("data",(buf)=>{
    var str=buf.toString();
    var obj=JSON.parse(str);
    var img=obj.img;
    var size=obj.size;
    var sql='DELETE FROM shopcart WHERE img=? AND size=?'
    pool.query(sql,[img,size],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0){
        res.send("删除成功")
      }else{
        res.send("删除失败")
      }
    })
  })
})

app.get("/comment",(req,res)=>{
    var nid=parseInt(req.query.id);
    var pno=req.query.pno;
    var pageSize=req.query.pageSize;
    var sql=" SELECT count(id) as c FROM comment";
        sql+=" WHERE nid=?";
    var obj={};
    var progress=0;
    pool.query(sql,[nid],(err,result)=>{
        if (err) throw err;
        var c=Math.ceil(result[0].c/pageSize);
        obj.pageCount=c;
        progress+=50;
        if(progress==100){
            res.send(obj);
        }
    })
    var sql=" SELECT content,ctime,uname,tx";
    sql+=" FROM comment";
    sql+=" WHERE nid = ?"
    sql+=" ORDER BY id DESC";
    sql+=" LIMIT ?,?";
    var offset=parseInt((pno-1)*pageSize);
    pageSize = parseInt(pageSize)
    pool.query(sql,[nid,offset,pageSize],(err,result)=>{
        if(err) throw err;
        obj.data=result;
        progress+=50;
        if(progress==100){
            res.send(obj);
        }
    })
})

app.post("/incomment",(req,res)=>{
  req.on("data",(buf)=>{
    var str=buf.toString();
    var obj=JSON.parse(str);
    var comment=obj.c;
    var id=parseInt(obj.id);
    var tx=local+"toux/tx.jpg"
    var uname=obj.uname
  
    var sql='INSERT into comment VALUES(null,?,?,?,now(),?)'
    pool.query(sql,[id,tx,uname,comment],(err,result)=>{
      if(err) throw err;
      if(result.affectedRows>0){
        res.send("评论成功")
      }else{
        res.send("评论失败")
      }
    })
  })
})

app.get("/islogin",(req,res)=>{
  console.log(req.session.uid)
  res.end()
})




app.get("/xzimg",(req,res)=>{
  var obj=[
    { id :1, img: "http://172.20.10.6:1674/img/xuez/banner1.png"},
    { id: 2, img: "http://172.20.10.6:1674/img/xuez/banner2.png"},
    { id: 3, img: "http://172.20.10.6:1674/img/xuez/banner3.png" },
    { id: 4, img: "http://172.20.10.6:1674/img/xuez/banner4.png"}
  ]
  res.send(obj)
})
/*app.get("/foodlist",(req,res)=>{
  var obj=[
    {id:1,ctime:"2018-11-20",img_url:"http://172.20.10.6:1674/img/shoplist/2A6E54A3DEF6EEE9B13B6E6C759F5E2A.jpg",title:"人型巧克力",desc:"hahahahahah"},
    {id:2,ctime:"2018-11-20",img_url:"http://172.20.10.6:1674/img/shoplist/2A6E54A3DEF6EEE9B13B6E6C759F5E2A.jpg",title:"人型巧克力",desc:"hahahahahah"},
    {id:3,ctime:"2018-11-20",img_url:"http://172.20.10.6:1674/img/shoplist/2A6E54A3DEF6EEE9B13B6E6C759F5E2A.jpg",title:"人型巧克力",desc:"hahahahahah"},
  ]
  res.send(obj)
})*/
app.post("/postProduct",(req,res)=>{
  req.on("data",(buff)=>{
    var obj=qs.parse(buff.toString());
    var pno=obj.pno;
    var price=obj.price;
    console.log(obj,pno,price)
    res.send({code:1,msg:":"+pno+":"+price});
    })
  })