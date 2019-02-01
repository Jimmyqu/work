var app= new Vue({
	el:"#jcwz_detail",
	data:{
    scope:3,
    searchStatus:"",
    searchName:"",
    searchUrl:"",
    detailObj:{
      sug:{}
    },
    allsuglist1:[],//-------------最新回复
		allsuglist3:[],//-------------未回应留言
  },
  created(){
    const searchObj = this.getSearch(location.search)
    if(searchObj.dept_id && searchObj.dept_name){
      this.searchStatus = "sztj"
      this.searchName = decodeURIComponent(searchObj.dept_name)
      this.searchUrl = "?dept_id=" + searchObj.dept_id + "&dept_name=" + searchObj.dept_name
    }else if(searchObj.region_id && searchObj.area_name && searchObj.province_id && searchObj.city_id){
      this.searchStatus = "szqx"
      this.searchName = decodeURIComponent(searchObj.area_name)
      this.searchUrl = "?region_id=" + searchObj.region_id + "&area_name=" + searchObj.area_name + "&province_id=" + searchObj.province_id + "&city_id=" + searchObj.city_id
    }
    //获取详情
    $.ajax({
      type:"get",
      url:apiUrl + "sugdetail",
      data:{
        suid:searchObj.id,
        type:"pc"
      },
      dataType:"json",
      success:(res)=>{
        if(res.state == true){
          //console.log(res);
          this.detailObj = res.data.common.app
          console.log(this.detailObj);
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
  },
  methods:{
     getSearch(str) {
      if(str == undefined) return
      str = str.substr(1)
      var arr = str.split("&"),
          obj = {},
          newArr = []
      arr.map(function(value,index,arr){
       newArr = value.split("=")
       if(newArr[0] != undefined) {
        obj[newArr[0]] = newArr[1]
      }
    })
    return obj
   }
  }
});