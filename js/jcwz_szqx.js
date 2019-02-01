var app= new Vue({
	el:"#jcwz_szqx",
	data:{
		arealist:[],	//地市区信息
		AlreadyReplylisty:[], //最新回复
    	notReplylisty:[], //未回应留言
	},
	created(){
		var self =this;
		//地市区信息
		$.ajax({
			type:"get",
			url:apiUrl + "arealist",
			data:{
				type:"pc",
			},
			dataType:"json",
			success:(res)=>{
				console.log(res.data.common.app)
				if(res.state == true){
					self.arealist =res.data.common.app
				}else{
					console.log(res.message)
				}
			},
			error:(res)=>{
				console.log("请求失败")
			}
		})


		//最新回复
		$.ajax({
			type:"get",
			url:apiUrl + "allsuglist",
			data:{
				type:"pc",
				pagesize: 8,
				list_type:1,
			},
			dataType:"json",
			success:(res)=>{
				if(res.state == true){
					self.AlreadyReplylisty =res.data.common.app
				}else{
					console.log(res.message)
				}
			},
			error:(res)=>{
				console.log("请求失败")
			}
		})

		//未回应留言
		$.ajax({
			type:"get",
			url:apiUrl + "allsuglist",
			data:{
				type:"pc",
				pagesize: 8,
				list_type:3,
			},
			dataType:"json",
			success:(res)=>{
				if(res.state == true){
					self.notReplylisty =res.data.common.app
				}else{
					console.log(res.message)
				}
			},
			error:(res)=>{
				console.log("请求失败")
			}
		})
	},
});