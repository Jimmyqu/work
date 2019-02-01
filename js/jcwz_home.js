

//刷新token url
const reTokenUrl = 'http://api.politics.com/api/retoken'

var app= new Vue({
	el:"#jcwz_home",
	data:{
    list1103:[],//----------------问政新闻
    list1105:[],//----------------问政报告
    list1110:[],//----------------每日回复
    arealist:[],//----------------市州区县
    bureaulist:[],//--------------省直厅局
    allsuglist3:[],//-------------未回应留言
    replytoplist:[],//------------回复率排行
    praisetoplist:[],//-----------满意度排行
    tsNewlist:[], //--------------投诉最新 已回复
    pageNum:1, //----------------投诉翻页
    list_type:1,
    maxpage:1, //总页数

  },
  created(){
    //问政新闻：1103
    $.ajax({
      type:"get",
      url:apiUrl + "ponews",
      data:{
        type:"pc",
        news_typeid:1103,
        pagesize:5
      },
      dataType:"json",
      success:(res)=>{
        //console.log(res);
        if(res.state == true){
          this.list1103 = res.data.common.app
        }else{
          alert(res.message)
        }
      },
      error:(res)=>{
        console.log("服务器异常,请求失败！")
      }
    })

    //问政报告：1105
    $.ajax({
      type:"get",
      url:apiUrl + "ponews",
      data:{
        type:"pc",
        news_typeid:1105,
        pagesize:3,
      },
      dataType:"json",
      success:(res)=>{
        //console.log(res);
        if(res.state == true){
          this.list1105 = res.data.common.app
          //更换轮播图跳转地址与图片地址
          $(".pic_box .bd ul li:nth-child(1) a").attr("href",this.list1105[2].url)
          $(".pic_box .bd ul li:nth-child(1) img").attr("src",this.list1105[2].thumb[0].url)
          $(".pic_box .bd ul li:nth-child(2) a").attr("href",this.list1105[0].url)
          $(".pic_box .bd ul li:nth-child(2) img").attr("src",this.list1105[0].thumb[0].url)
          $(".pic_box .bd ul li:nth-child(3) a").attr("href",this.list1105[1].url)
          $(".pic_box .bd ul li:nth-child(3) img").attr("src",this.list1105[1].thumb[0].url)
          $(".pic_box .bd ul li:nth-child(4) a").attr("href",this.list1105[2].url)
          $(".pic_box .bd ul li:nth-child(4) img").attr("src",this.list1105[2].thumb[0].url)
          $(".pic_box .bd ul li:nth-child(5) a").attr("href",this.list1105[0].url)
          $(".pic_box .bd ul li:nth-child(5) img").attr("src",this.list1105[0].thumb[0].url)
          //console.log(this.list1105);
        }else{
          alert(res.message)
        }
      },
      error:(res)=>{
        console.log("服务器异常,请求失败！")
      }
    })

    //每日回复：1110
    $.ajax({
      type:"get",
      url:apiUrl + "ponews",
      data:{
        type:"pc",
        news_typeid:1110,
        pagesize:5
      },
      dataType:"json",
      success:(res)=>{
        //console.log(res);
        if(res.state == true){
          this.list1110 = res.data.common.app
          //console.log(this.list1110);
        }else{
          alert(res.message)
        }
      },
      error:(res)=>{
        console.log("服务器异常,请求失败！")
      }
    })

    //市州区县列表
    $.ajax({
      type:"get",
      url:apiUrl + "getAllAreaList",
      data:{
        type:"pc"
      },
      dataType:"json",
      success:(res)=>{
        //console.log(res);
        if(res.state == true){
          this.arealist = res.data.common.app
          //console.log(this.arealist);
        }else{
          alert(res.message)
        }
      },
      error:(res)=>{
        console.log("服务器异常,请求失败！")
      }
    })

    //省直厅局列表
    $.ajax({
      type:"get",
      url:apiUrl + "bureaulist",
      data:{
        type:"pc"
      },
      dataType:"json",
      success:(res)=>{
        if(res.state == true){
          this.bureaulist = res.data.common.app
          //console.log(this.bureaulist);
        }else{
          alert(res.message)
        }
      },
      error:(res)=>{
        console.log("服务器异常,请求失败！")
      }
    })

    //未回应留言列表
    $.ajax({
      type:"get",
      url:apiUrl + "allsuglist",
      data:{
        type:"pc",
        list_type:3,
        pagesize:12
      },
      dataType:"json",
      success:(res)=>{
        if(res.state == true){
          this.allsuglist3 = res.data.common.app
          //console.log(this.allsuglist3);
        }else{
          alert(res.message)
        }
      },
      error:(res)=>{
        console.log("服务器异常,请求失败！")
      }
    })

    //回复率排行列表
    $.ajax({
      type:"get",
      url:apiUrl + "replytoplist",
      data:{
        type:"pc"
      },
      dataType:"json",
      success:(res)=>{
        if(res.state == true){
          for(let i=0;i<10;i++){
            this.replytoplist.push(res.data.common.app[i])
          }
          //console.log(this.replytoplist);
        }else{
          alert(res.message)
        }
      },
      error:(res)=>{
        console.log("服务器异常,请求失败！")
      }
    })

    //满意度排行列表
    $.ajax({
      type:"get",
      url:apiUrl + "praisetoplist",
      data:{
        type:"pc"
      },
      dataType:"json",
      success:(res)=>{
        if(res.state == true){
          for(let i=0;i<10;i++){
            this.praisetoplist.push(res.data.common.app[i])
          }
          //console.log(this.praisetoplist);
        }else{
          alert(res.message)
        }
      },
      error:(res)=>{
        console.log("服务器异常,请求失败！")
      }
    });

    
    this.getnewlist(); //投诉最新件 已回复
  },
  methods: {
     //投诉最新件 已回复
    getnewlist(){
      $.ajax({
        type:"get",
        url:apiUrl + "allsuglist",
        data:{
          type:"pc",
          page:this.pageNum,
          list_type:this.list_type,
          pagesize:9
        },
        dataType:"json",
        success:(res)=>{
          //console.log(res)
          if(res.state == true){
            this.tsNewlist = res.data.common.app;
            this.maxpage=res.data.common.total
          }else{
            alert(res.message)
          }
        },
        error:(res)=>{
          console.log("服务器异常,请求失败！")
        }
      })
    },

    //tab切换
    changelist(index){
      if(index == 1){
        this.list_type =1;
        this.pageNum =1;
        this.getnewlist()
      }
      else{
        this.list_type =3;
        this.pageNum =1;
        this.getnewlist()
      }
    },

    //点击页面数切换
    chilkpage(index){
      console.log(index);
      this.pageNum =index;
      this.getnewlist();
    },

      //跳转登录页
      handleToLogin(){
          //判断cookie 是否登录跳转
        let token = cookie.get('token')

          $.ajax({
              type:"get",
              url:reTokenUrl,
              data:{
                  type:"pc",
                  skey:token
              },
              dataType:"json",
              success:(res)=>{
                if(res.state){

                }
                 console.log(res.state)
              },
              error:(e)=>{
                  console.log(e)
              }
          });

      }
  }
});