<template>
  <div>
    <h2 class="font-medium pb-3 border-b-2 border-gray-100 text-gray-800">Subscription</h2>
    <div class="mt-3 text-4xl">Hi, {{user.name}}</div>
    <div class="mt-3 text-sm">
    	<p class="mb-2 text-2xl">You're currently on the <span class="text-purple-600 text-3xl font-semibold">{{ user.plan.name }}</span> plan.</p>
    	<p class="text-lg">
    		<template v-if="user.ends_at">
	    		Your subscription ends at <span class="text-purple-500 italic font-medium">{{user.ends_at}}</span>
	    	</template>
    	</p>

    	<router-link :to="{name: 'swap'}" class="text-indigo-500 pt-3" v-if="user.subscribed">Swap Plan</router-link>
    </div>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
    	user: 'auth/user'
    })
  }
}
</script>