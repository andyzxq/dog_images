<template>
  <div class="dogImages_container">
  	<div class="Introduction">
  	Introduction
  	</div>
  	<div class="imageResult">
  		<!-- 放置两个水平块分别用于展示所选图片和显示结果 -->
  		<div class="showImage">
  			<!-- 用户上传图片并查看-->
  			<el-upload
          		class="avatar-uploader"
          		action=""
         		:show-file-list="false"
         		:on-success="handleAvatarSuccess"
         		:on-change="onchange"
        		:before-upload="beforeAvatarUpload">
 				<img id="dogImage" v-if="imageUrl" :src="imageUrl" class="avatar">
  				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
  		</div>
  		<div class="showResult">
  			<div class="resultText">
  				<p>Predictions: {{predictions}}</p>
  			</div>
  		</div>
  	</div>
  	<div class="otherImages">
  		<ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto" infinite-scroll-disabled="disabled">
    		<li v-for="i in count" class="infinite-list-item">
    			<img v-lazy="otherImageUrl[i]" class="avatar">
    		</li>
  		</ul>
  	</div>
  </div>
</template>

<script>
export default {
	data() {
      return {
        imageUrl: '',
        predictions: '',
        isPredictionsChange: false,
        getotherImageUrl: '',
        count: 0,
        otherImageUrl: [],
        loading: false
      };
    },
    computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      load () {
      	if(this.isPredictionsChange){
      		var _this = this;
      		this.loading = true;
    		//访问url获取照片
    		const  axios = require('axios');
    		axios.get(this.getotherImageUrl).then(function(reponse){
    			_this.otherImageUrl[_this.count] = reponse.data.message;
    			console.log(_this.count + _this.otherImageUrl[_this.count]);
    			//注意请求的时候异步加载
    			_this.count += 1;
    			_this.loading = false;
			}).catch(function(error){
	 			console.log(error);//异常处理
			}).finally(function(){
			});
		}
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      //当上传图片后，调用onchange方法，获取图片本地路径
   	  onchange(file,fileList){
     	var _this = this;
        var event = event || window.event;
        var file = event.target.files[0];
        var reader = new FileReader(); 
        //转base64
        reader.onload = function(e) {
        	_this.imageUrl = e.target.result;
      	}
      	reader.readAsDataURL(file);
      },
    },
    watch : {
    	imageUrl:async function(){
    		this.predictions = "Puggle";
    		/*
    		var _this = this;
    		const img = document.getElementById('dogImage');
      		const mobilenet = require('@tensorflow-models/mobilenet');
      		mobilenet.load().then(model => {
    			model.classify(img).then(predictions => {
      				_this.predictions = predictions;//获取预测种类信息
    			});
  			});
  			*/
    	},
    	predictions:function(){
    		this.count = 1;
    		console.log("change prediction");
    		//根据输入照片结果狗的种类拼接url地址

    		//访问url获取照片
    		this.getotherImageUrl= "https://dog.ceo/api/breeds/image/random";
			this.isPredictionsChange = true;
    	}
    }
}
</script>

<style >
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
 }
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
