<template>
	<div class="main">
	    <div class="center wid1210 clearfix">
	        <div class="leftbar">
	            <div class="banner" id="banner" v-cloak>
	                <div class="bd clearfix">
	                    <div class="sli" v-for="(k,v) in allJsonArr.bannerJsonArr"><a :href="k.href" target="_blank"><img :src="k.imgUrl" /></a></div>
	                </div>
	                <div class="hd">
	                    <span v-for="(k,v) in allJsonArr.bannerJsonArr">{{ v+1 }}</span>
	                </div>
	                <a class="prev" href="javascript:void(0)"></a>
	                <a class="next" href="javascript:void(0)"></a>
	            </div>
	            <div class="list" v-cloak>
	                <div class="demo" v-for="(key,index) in allJsonArr.demoJsonArr">
	                    <h1>{{ key.title }}</h1>
	                    <div class="write">作者：<span>FlyIdeal</span>日期：<span>{{ key.time }}</span></div>
	                    <p>{{ key.content }}</p>
	                    <a class="more" :href="key.href" target="_blank">查看demo</a>
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
    		allJsonArr : '',
    		documentTitle : 'this is my demo'
    	}
    },
    mounted(){
        this.allJsonArr = allJsonArr,
        this.bannerSlider()
    },
    methods:{
        bannerSlider: function(){
        	$(function(){
        		var swiper = new Swiper('#banner', {
	                wrapperClass : 'bd',
	                slideClass : 'sli',
	                loop: true,
	                nextButton: '#banner .next',
	                prevButton: '#banner .prev',
	                autoHeight: true,
	                pagination: '.hd',
	                paginationElement : 'span',
	                bulletActiveClass : 'on'
	            })
        	})
        }
    }
}
</script>