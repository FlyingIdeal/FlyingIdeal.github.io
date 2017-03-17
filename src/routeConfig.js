
import Demo from './components/Demo.vue'
import Home from './components/Home.vue'
import Life from './components/Life.vue'

export default [
	{
		path : '/home',
		component : Home
	},
	{
		path : '/demo',
		component : Demo
	},
	{
		path : '/life',
		component : Life
	},
	{ 
	    path: '/', 
	    redirect: '/home' 
	},
	{
		path : '*',
		redirect : '/home'
	}
]