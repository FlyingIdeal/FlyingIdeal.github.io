<template>
	<div class="main" id="vueApp">
	    <div class="center wid1210 clearfix">
	        <div class="leftbar">
	            <div class="list">
	                 <div class="demo" v-for="(k,v) in demoData">
	                    <h1>{{ v + 1 }}、{{ k.title }}</h1>
	                    <div class="write">作者：<span>FlyIdeal</span>日期：<span>{{ k.time }}</span></div>
	                    <p>{{ k.content }}</p>
	                    <a class="more" :href="k.href" target="_blank">查看demo</a>
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
		data(){
			return {
				demoData : ''
			}
		},
		components : {
			'SliderBar' : SliderBar
		},
		mounted(){
			this.demoData = allJsonArr.demoPageArr
		}
	}
</script>