//app.js
//1:加载模块
const express = require("express");
const pool  = require("./pool");
//2:创建express对象
var app = express();
//服务器node.js 允许跨域访问配置项
//2.1:引入跨域模块   
const cors = require("cors");
//2.2:配置允许哪个程序跨域访问 脚手架   11:16
app.use(cors({
  origin:[
    "http://127.0.0.1:3001","http://localhost:3001"],
  credentials:true
}))

//3:指定静态目录
//服务器指定目录 绝对路径 出错
app.use(express.static(__dirname+"/public"));

//4:绑定监听端口
app.listen(3000);
//功能一:学子商城首页图片轮播
//GET /imagelist   json
app.get("/imagelist",(req,res)=>{
  var obj = [
 {id:1,img_url:"http://127.0.0.1:3000/img/banner1.png"},
 {id:2,img_url:"http://127.0.0.1:3000/img/banner2.png"},
 {id:3,img_url:"http://127.0.0.1:3000/img/banner3.png"},
 {id:4,img_url:"http://127.0.0.1:3000/img/banner4.png"},
];
  res.send(obj)
});


//功能二:分页显示:新闻分页
app.get("/newslist",(req,res)=>{
  //1:参数  当前页码  页大小(一页显示几行数据)
  var pno = req.query.pno;            //2
  var pageSize = req.query.pageSize;  //5
  //2:sql
  //2.1:查找总记录数->转换总页数  15->3
  var sql = "SELECT count(id) as c FROM xz_news";
  var obj = {};      //保存发送客户端数据
  var progress = 0;  //进度
  pool.query(sql,(err,result)=>{
      if(err)throw err;
      var c = Math.ceil(result[0].c/pageSize);
      obj.pageCount = c;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
  });
  //2.2:查找当前页内容           中间5行
  var sql = " SELECT id,title,img_url,ctime,point";
     sql += " FROM xz_news";
     sql += " LIMIT ?,?";
  var offset = parseInt((pno-1)*pageSize);   
  //计算分页偏移量
  pageSize = parseInt(pageSize)
  pool.query(sql,[offset,pageSize],(err,result)=>{
      if(err)throw err;
      //console.log(result);
      obj.data = result;
      progress+=50;
      if(progress==100){
        res.send(obj);
      }
  })
  //3:结果格式
});
//功能三:发送脚手架新闻详细
app.get("/newsinfo",(req,res)=>{
   var obj = {
     title:"AJ1经典款直降",
     content:"16万 快快买啊!!!!!!"
    };
   res.send(obj);
});

//功能四:用户发表评论
const qs = require("querystring");
app.post("/postcomment",(req,res)=>{
   //为req对象绑定事件data   10:45
   req.on("data",(buf)=>{
     var str = buf.toString();  //1:将参数转字符串
     var obj = JSON.parse(str); //2:将参数转对象
     var msg = obj.msg;         
     var nid = parseInt(obj.nid);
     var sql = "INSERT INTO xz_comment(content,user_name,ctime,nid) VALUES(?,'匿名',now(),?)";
     pool.query(sql,[msg,nid],(err,result)=>{
       if(err)throw err;
       res.send({code:1,msg:"添加成功"});
     })
   })
})



//功能五:用户获取指定新闻编号所有评论
app.get("/getComment",(req,res)=>{
  //获取指定新闻编号  
  var nid = parseInt(req.query.id);
  var pno = req.query.pno;            
  var pageSize = req.query.pageSize;  
  var sql = " SELECT count(id) as c FROM xz_comment";
  sql +=" WHERE nid = ?";
  var obj = {};      //保存发送客户端数据
  var progress = 0;  //进度
  pool.query(sql,[nid],(err,result)=>{
      if(err)throw err;
      var c = Math.ceil(result[0].c/pageSize);
      obj.pageCount = c;
      progress+=50;
      if(progress==100){
        res.send(obj);
       }
    });
    //2.2:查找当前页内容
  var sql = " SELECT id,content,ctime,user_name";
     sql += " FROM xz_comment";
     sql += " WHERE nid = ?"
     sql += " ORDER BY id DESC";//降序排列
     sql += " LIMIT ?,?";
  var offset = parseInt((pno-1)*pageSize);   
  pageSize = parseInt(pageSize)
  pool.query(sql,[nid,offset,pageSize],(err,result)=>{
     if(err)throw err;
      obj.data = result;
      progress+=50;
      if(progress==100){
      res.send(obj);
      }
  })
});
app.get("/goodlist",(req,res)=>{
  var obj = [
  {id:1,image_url:"http://127.0.0.1:3000/img/james.png",title:"詹姆斯17",Nprice:3999.99,Oprice:6999.99,many:3,pid:"james",color:"紫金配色"},
  {id:2,image_url:"http://127.0.0.1:3000/img/curry.jpg",title:"库里5",Nprice:4999.99,Oprice:7999.99,many:5,pid:"curry",color:"全白色"},
  {id:3,image_url:"http://127.0.0.1:3000/img/harden.jpg",title:"哈登6",Nprice:1999.99,Oprice:3999.99,many:4,pid:"harden",color:"火箭配色"},
  {id:4,image_url:"http://127.0.0.1:3000/img/durant.jpg",title:"杜兰特11",Nprice:2999.99,Oprice:5999.99,many:4,pid:"durant",color:"篮网配色"}
  ];
  res.send(obj);
});

//将商品信息加入到购物车
//INSERT INTO xz_cart VALUE(...)
app.get("/addCart",(req,res)=>{
  //1.参数
  //1.1获取参数
  var pid = req.query.pid;
  var count = req.query.count;
  //1.2创建正则表达式，验证
  var reg = /^[0-9]{1,}$/;
  if(!reg.test(pid)){
    res.send({code:-1,msg:"商品编号验证错误"});
    return;
  }
  if(!reg.test(count)){
    res.send({code:-2,msg:"商品数量验证错误"});
    return;
  }
  //1.3如果验证失败返回
  //2.连接数据库
  //3.返回成功值
  res.send({code:1,msg:"添加成功"});
});

app.get("/login",(req,res)=>{
  var uname=req.query.uname;
  var upwd = req.query.upwd;
  var sql =" SELECT count(id) as c FROM xz_user2";
  sql+=" WHERE uname=? AND upwd=md5(?)";
  pool.query(sql,[uname,upwd],(err,result)=>{
    if(err)throw err;
    if(result[0].c==0){
      res.send({code:-1,msg:"用户名或密码错误"});
    }else{
      res.send({code:1,msg:"登录成功"});
    }
  })
})


