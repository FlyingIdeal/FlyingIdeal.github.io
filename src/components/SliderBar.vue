<template>
	 <div class="sidebar">
        <div class="hot">
            <h2 class="clearfix">过往项目地址</h2>
            <ul>
                <li v-for="(key,index) in allJsonArr.hotJsonArr" :class="[!!key.topFlag ? 'top' : '']"><i>{{index + 1}}</i><a :href="key.href" target="_blank">{{key.title}}</a></li>
            </ul>
        </div>
    </div> 
</template>
<script>
export default {
	data(){
		return {
			allJsonArr : ''
		}
	},
	mounted(){
		this.allJsonArr = allJsonArr
	}
}
</script>