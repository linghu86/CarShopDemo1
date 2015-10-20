var express = require('express'); //加载express模块
var port = 3000;        //端口号
var app = express();    //

app.locals.pretty = true; //不压缩

var path = require('path');

var morgan=require('morgan');
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '../client')));  //对于明指的资源，使用静态路径

app.set('views', __dirname + '/views/pages');  //指定视图路径
app.set('view engine', 'jade');

var carlist=[{
            _id:1,
            proTitle:"英朗",
            brand:"别克",
            series:"英朗",
            color:"中国红",
            yearStyle:"2015款",
            carModelName:"15N 手动 进取型",
            ml:"1.5L",
            kw:"84kw",
            gearbox:"6挡 手自一体",
            guidePrice:"11.99",
            imageLogo:"http://img10.360buyimg.com/n7/jfs/t751/148/1231629630/30387/67209b8b/5528c39cNab2d388c.jpg",
            buyNum: 200
        },{
            _id:2,
            proTitle:"哈弗H6",
            brand:"哈弗",
            series:"哈弗",
            color:"雅致银",
            yearStyle:"2015款",
            carModelName:"升级版 1.5T 手动 两驱 都市型",
            ml:"1.5L",
            kw:"110kw",
            gearbox:"6挡 手动",
            guidePrice:"9.63",
            imageLogo:"http://img10.360buyimg.com/n7/jfs/t874/304/396255796/41995/328da75e/5528c399N3f9cc646.jpg",
            buyNum: 888
        },{
            _id:3,
            proTitle:"速腾",
            brand:"大众",
            series:"速腾",
            color:"雅士银",
            yearStyle:"2015款",
            carModelName:"1.4T 双离合 230TSI 舒适型",
            ml:"1.4L",
            kw:"96kw",
            gearbox:"7挡 双离合",
            guidePrice:"12.30",
            imageLogo:"http://img10.360buyimg.com/n7/jfs/t988/239/475904647/32355/a1d35780/55278f2cN574b21ab.jpg",
            buyNum: 100
        },{
            _id:4,
            proTitle:"捷达",
            guidePrice:"7.51",
            imageLogo:"http://img10.360buyimg.com/n7/jfs/t1108/41/489298815/33529/38655c9f/5528c276N41f39d00.jpg",
            buyNum: 300 
        },{
            _id:5,
            proTitle:"本田XR-V",
            guidePrice:"12.78",
            imageLogo:"http://img10.360buyimg.com/n7/jfs/t754/341/1237166856/40843/baf73c5c/5528c273Ncb42f04c.jpg",
            buyNum: 500
        }]


function showRoute(req, res){
  console.log('================');
  console.log('当前生效的路由规则:');
  console.log(req.route.path);
  console.log('');

  console.log('req.route.methods');
  console.log(req.route.methods);
  console.log(''); 

  console.log('req.originalUrl');
  console.log(req.originalUrl);
  console.log(''); 

  console.log('req.body');
  console.log(req.body);
  console.log('');  

  console.log('req.cookies');
  console.log(req.cookies);
  console.log('');  


  console.log('req.hostname');
  console.log(req.hostname);
  console.log('');  


  console.log('req.ip');
  console.log(req.ip);
  console.log(''); 


  console.log('req.params');
  console.log(req.params);
  console.log(''); 

  console.log('req.path');
  console.log(req.path);
  console.log(''); 

  console.log('req.protocol');
  console.log(req.protocol);
  console.log(''); 

  console.log('req.query');
  console.log(req.query);
  console.log(''); 

  res.sendStatus(200);
}

// app.get('/', showRoute);

// app.get('/test/:id/xyz/:name',showRoute);
// app.get('/test/:id/:name',showRoute);

// app.get('/test/:id::name',showRoute);
// app.get('/test/:id,:name',showRoute);
// app.get('/test/:id;:name',showRoute);

// app.get('/test/:id&:name',showRoute);
// app.get('/test/:id-:name',showRoute);
// app.get('/test/:id=:name',showRoute);

// *
//  * 这种情况是有意义的, 适用于
//  *
//  * http://localhost:4000/user/1
//  * http://localhost:4000/user/
//  * 两种情况
 
// app.get('/test/:id?',showRoute);

// /**
//  * ? * + | 在多参数时不要使用 
//  */
// app.get('/test/:id,:name?',showRoute);
// app.get('/test/:id,:name+',showRoute);
// app.get('/test/:id,:name*',showRoute);

// // app.get('/test/:id|:name',showRoute);
// app.get('/test/:id+:name',showRoute);
// app.get('/test/:id?:name',showRoute);
// app.get('/test/:id*:name',showRoute);

// app.get('/*',showRoute);

app.get('/car', function(req,res){
    res.render('index',{
        title: req.query.tt+' 首页',
        cars: carlist
    });
});

app.get('/car/:id', function(req,res){
    res.render('car_detail',{
        title: '汽车商城 详情页',
        car: carlist[req.params.id-1]
    });
});

app.get('/admin/car/list', function(req,res){
    res.render('car_list.jade',{
        title: '汽车商城 列表页',
        cars: carlist
    });
});

app.get('/admin/car/new', function(req, res) {
  res.render('car_admin', {
    title: '汽车商城 后台录入页',
    car: {
      proTitle: "",
      brand: "",
      series: "",
      color: "",
      yearStyle: "",
      carModelName: "",
      ml: "",
      kw: "",
      gearbox: "",
      guidePrice: "",
      imageLogo: "",
      buyNum: 0
    }
  });
});

app.get('/admin/car/update/:id', function(req, res) {
  res.render('car_admin', {
    title: '汽车商城 后台录入页 '+' '+req.params.id,
    car: carlist[req.params.id]
  });
});

app.listen(port);


console.log("服务已启动,监听端口号:"+port+__dirname);
