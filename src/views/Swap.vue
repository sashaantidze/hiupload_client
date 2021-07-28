<template>
  <div>
    <form @submit.prevent="swap">
    	<div class="mb-6">

    		<div class="mb-2 flex items-center" v-for="plan in plans" :key="plan.slug">
    			<input
    			type="radio"
    			name="plan"
    			:id="`plan_${plan.slug}`"
    			class="mr-3"
    			:value="plan.slug"
    			v-model="form.plan"
    			v-if="availablePlans.find(p => p.slug === plan.slug)"
    			>
    			<label :for="`plan_${plan.slug}`" class="flex-grow" :class="plan.slug === user.plan.slug ? 'bg-indigo-500 text-white' : ''">
    				<app-plan :plan="plan"/>
				</label>
    		</div>
    		
    	</div>

    	<app-button :loading="loading" :disabled="loading || !form.plan" type="submit" title="Swap" v-if="availablePlans.length" />
    	<p v-else class="text-sm text-red-400">There are no available plans for you right now, as you are using too much storage.</p>
      <app-loader :loading="loading" />
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import AppPlan from '@/components/AppPlan'
import AppButton from '@/components/AppButton'
import AppLoader from '@/components/AppLoader'
import {mapGetters, mapActions} from 'vuex'

export default {
  
  components: {
  	AppPlan,
    AppButton,
    AppLoader
  },


  data () {
  	return {
      loading: false,
  		plans: [],
  		planAvailability: [],
  		form: {
  			plan: null
  		}
  	}
  },

  computed: {
  	...mapGetters({
  		user: 'auth/user',
  	}),

  	availablePlans() {
  		return this.plans.filter(p => p.slug !== this.user.plan.slug && this.planAvailability[p.slug])
  	}
  },

  methods: {
    ...mapActions({
      me: 'auth/me',
      snack: 'snack/snack'
    }),



  	async swap () {
      this.loading = true
  		await axios.patch('api/subscriptions', this.form)
      await this.me()

      this.loading = false
      
      this.snack(`You've swapped to ${this.user.plan.name} Plan`)
      this.$router.replace({name: 'account'})
  	}
  },

  async mounted() {
    await axios.get('api/plans').then((res) => {
      res.data.data.forEach((item) => {
        item.is_current_plan = item.slug === this.user.plan.slug
        this.plans.push(item)
      })
    })


    let planAvailability = await axios.get('api/user/plan_availability')
    this.planAvailability = planAvailability.data.data
  }
}
</script>