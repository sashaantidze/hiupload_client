<template>
  <div>
    <form action="" @submit.prevent="submit">

    	<div class="mb-6">
          <label for="name" class="inline-block text-sm mb-2">Your Name</label>
          <input type="text" id="name" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" v-model="form.name">
        </div>

    	<div class="mb-6">
    		<label for="card" class="inline-block text-sm mb-2">Card Details</label>
    		<div id="card" ref="card"></div>
    	</div>

    	<app-button title="Pay" type="submit" :loading="loading" :disabled="loading" />

    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'
import AppButton from '@/components/AppButton'


const stripe = Stripe(process.env.VUE_APP_STRIPE_KEY)
const elements = stripe.elements()
const cardElement = elements.create('card')

export default {
  async mounted() {
  	let response = await axios.get('api/subscriptions/intent')
  	this.intent.client_secret = response.data.data.client_secret

    cardElement.mount(this.$refs.card)
  },

  data () {
  	return {
      loading: false,
  		intent: {
  			client_secret: null
  		},

  		form: {
  			name: ''
  		}
  	}
  },


  props: {
  	plan: {
  		required: true,
  		type: String
  	}
  },


   components: {
    AppButton
  },


  methods: {

    ...mapActions({
      me: 'auth/me',
      snack: 'snack/snack'
    }),

  	async submit () {	
      this.loading = true
  		const {setupIntent, error} =  await stripe.confirmCardSetup(
  			this.intent.client_secret, {
  				payment_method: {
  					card: cardElement,
  					billing_details: {name: this.form.name}
  				}
  			}
		)

		if(error){
      this.loading = false
		}
		else{
			await this.createSubscription(setupIntent.payment_method)
      this.loading = false
		}
	},

  	async createSubscription (token) {
  		let response = await axios.post('api/subscriptions', {plan: this.plan, token})
      await this.me()

      this.snack('Subscription created.')

      this.$router.replace({name: 'account'})
  	}
  },

}
</script>