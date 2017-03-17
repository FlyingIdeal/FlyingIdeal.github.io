<template>
	<div class="main">
	    <div class="center wid1210 clearfix">
	        <div class="leftbar">
	            <div class="list">
	                <div class="demo" v-for="(key,value) in allJsonArr.lifePageArr">
	                    <h1>{{key.title}}</h1>
	                    <div class="write">作者：<span>FlyIdeal</span>日期：<span>{{key.time}}</span></div>
	                    <p>{{key.content}}</p>
	                    <a class="more" target="_blank" :href="key.href">查看demo</a>
	                </div>
	            </div>
	        </div>
	        <SliderBar></SliderBar>
	    </div>
	</div>
</template>
<script>
	import SliderBar from './SliderBar.vue'
	
	export default {
		components : {
			'SliderBar' : SliderBar
		},
		data(){
			return {
				allJsonArr : ''
			}
		},
		mounted:function(){
			this.allJsonArr = allJsonArr
		}
	}
</script>