var app= new Vue({
	el:"#jcwz_sztj_three",
	data:{
		dept_id:'',
		dept_name:'',
		sztjnewreplylist:[], //根据部门获取最新回复
		sztjnotreplylist:[],  //根据部门获取未回复
		AlreadyReplylisty:[], //最新回复
    	notReplylisty:[], //未回应留言
	},
	created(){
		var self =this;
		//解析url
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
 
			this.dept_id = a['dept_id'];
			this.dept_name = a['dept_name'];
		//最新回复
		$.ajax({
			type:"get",
			url:apiUrl + "allsuglist",
			data:{
				type:"pc",
				pagesize: 5,
				list_type:1,
				deplist_type:1,
				deptid:this.dept_id,
			},
			dataType:"json",
			success:(res)=>{
				//console.log(res)
				if(res.state == true){
					self.sztjnewreplylist =res.data.common.app
				}else{
					console.log(res.message)
				}
			},
			error:(res)=>{
			console.log("请求失败")
			}
		})

		//根据部门获取未回复
		$.ajax({
			type:"get",
			url:apiUrl + "allsuglist",
			data:{
				type:"pc",
				pagesize: 5,
				list_type:3,
				deplist_type:1,
				deptid:this.dept_id,
			},
			dataType:"json",
			success:(res)=>{
				//console.log(res)
				if(res.state == true){
					self.sztjnotreplylist =res.data.common.app
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

		this.getanalysisUrl();  //解析上个页面传过来的url
	},
	methods:{
		//解析上个页面传过来的url
		getanalysisUrl(){
			
		},
	},
});