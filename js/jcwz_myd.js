var app= new Vue({
	el:"#jcwz_myd",
	data:{
		praisetoplist:[],//-----------满意度排行
		allsuglist1:[],//-------------最新回复
		allsuglist3:[],//-------------未回应留言
	},
	created(){
		
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
            this.praisetoplist = res.data.common.app
          //console.log(this.praisetoplist);
        }else{
          alert(res.message)
        }
      },
      error:(res)=>{
        console.log("服务器异常,请求失败！")
      }
    })

		//最新回复列表
    $.ajax({
      type:"get",
      url:apiUrl + "allsuglist",
      data:{
        type:"pc",
        list_type:1,
        pagesize:8
      },
      dataType:"json",
      success:(res)=>{
        if(res.state == true){
          this.allsuglist1 = res.data.common.app
          //console.log(this.allsuglist3);
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
        pagesize:8
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
	}
});