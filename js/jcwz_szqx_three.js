var app= new Vue({
	el:"#jcwz_sztj_three",
	data:{
		province_id:'',
		city_id:'',
		region_id:'',
		area_name:'',
		area_id:'',
		szqxnewreplylist:[], //根据市州区县获取最新回复
		szqxnotreplylist:[],	//根据市州区县获取未回应留言
		AlreadyReplylisty:[], //最新回复
    	notReplylisty:[], //未回应留言
	},
	created(){
		//解析页面的url
		var a=GetRequest();
		function GetRequest() {
			var url = location.search; //获取url中"?"符后的字串
			var theRequest = new Object();
				if (url.indexOf("?") != -1) {
					var str = url.substr(1);
					strs = str.split("&");
					for (var i = 0; i < strs.length; i++) {
						theRequest[strs[i].split("=")[0]] = decodeURIComponent(strs[i].split("=")[1]);
					}
				}
				return theRequest;
		}
		
			this.province_id = a['province_id'];
			this.city_id = a['city_id'];
			this.region_id = a['region_id'];
			this.area_name = a['area_name'];
			this.area_id = this.province_id+'|'+this.city_id+'|'+this.region_id;
		var self =this;
		//根据市州区县获取最新回复
		$.ajax({
			type:"get",
			url:apiUrl + "allsuglist",
			data:{
				type:"pc",
				pagesize: 5,
				list_type:1,
				deplist_type:2,
				area:this.area_id,
			},
			dataType:"json",
			success:(res)=>{
				console.log(res)
				if(res.state == true){
					self.szqxnewreplylist =res.data.common.app
				}else{
					console.log(res.message)
				}
			},
			error:(res)=>{
			console.log("请求失败")
			}
		})

		//根据市州区县获取未回应留言
		$.ajax({
			type:"get",
			url:apiUrl + "allsuglist",
			data:{
				type:"pc",
				pagesize: 5,
				list_type:3,
				deplist_type:2,
				area:this.area_id,
			},
			dataType:"json",
			success:(res)=>{
				//console.log(res)
				if(res.state == true){
					self.szqxnotreplylist =res.data.common.app
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
		});

	},
	methods:{
		
	},
});