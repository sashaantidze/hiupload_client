<template>
 
    <router-link :to="{name: 'checkout', query: {plan: plan.slug}}" v-for="plan in buyablePlans" :key="plan.slug">
    	<app-plan class="mb-2" :plan="plan"/>
    </router-link>
  
</template>

<script>
import axios from 'axios'
import AppPlan from '@/components/AppPlan'

export default {
	components: {
		AppPlan
	},


  data () {
  	return {
  		plans: []
  	}
  },


  async mounted() {
   	let response = await axios.get('api/plans')
   	this.plans = response.data.data
  },


  computed: {
  	buyablePlans () {
  		return this.plans.filter(p => !p.free)
  	}
  }
}
</script>