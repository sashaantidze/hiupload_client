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

    	<button type="submit" class="bg-indigo-500 text-white px-4 py-3 leading-none rounded-lg font-medium">Pay</button>

    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions } from 'vuex'

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


  methods: {

    ...mapActions({
      me: 'auth/me'
    }),

  	async submit () {	
  		const {setupIntent, error} =  await stripe.confirmCardSetup(
  			this.intent.client_secret, {
  				payment_method: {
  					card: cardElement,
  					billing_details: {name: this.form.name}
  				}
  			}
		)

		if(error){

		}
		else{
			await this.createSubscription(setupIntent.payment_method)
		}
  	},

  	async createSubscription (token) {
  		let response = await axios.post('api/subscriptions', {plan: this.plan, token})
      await this.me()

      this.$router.replace({name: 'account'})
  	}
  },

}
</script>