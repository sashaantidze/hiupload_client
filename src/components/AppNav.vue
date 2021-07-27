<template>
	<header class="flex flex-wrap md:flex-no-wrap items-center justify-between mb-6 -mx-3 -mt-3">
      <ul class="flex items-center">
        <li><router-link :to="{name: 'home'}" class="text-sm inline-block p-3 text-gray-800" href="">Home</router-link></li>
        <li><router-link :to="{name: 'uploads'}" class="text-sm inline-block p-3 text-gray-800" href="">Your Files</router-link></li>
      </ul>

      <div class="flex justify-center order-last w-full md:w-auto md:order-none">
        <app-usage v-if="authenticated" />
      </div>

      <ul class="flex items-center">
        <template v-if="!authenticated">
          <li><router-link :to="{name: 'login'}" class="text-sm inline-block p-3 text-gray-800" href="">Sign in</router-link></li>
          <li><a class="text-sm inline-block p-3 text-gray-800" href="">Create Account</a></li>
        </template>

        <template v-if="authenticated">
          <li><router-link class="text-sm inline-block p-3 text-gray-800" :to="{name: 'account'}">Account</router-link></li>
          <li><a class="text-sm inline-block p-3 text-gray-800" href="" @click.prevent="logout">Log out</a></li>
        </template>


        
          <li v-if="!authenticated || (!user.subscribed || user.plan.slug !== 'large')">
            <router-link class="text-sm inline-block p-3 text-indigo-500 font-bold" :to="{name: 'plans'}">Upgrade 🌟</router-link>
          </li>
          

        
      </ul>
    </header>
</template>


<script>

import {mapGetters, mapActions} from 'vuex'
import AppUsage from '@/components/AppUsage'

export default {
  components: {
    AppUsage
  },


  computed: {
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user : 'auth/user'

    }),
  },

  methods: {
    ...mapActions({
      logoutAction: 'auth/logout'
    }),

    async logout() {
      await this.logoutAction()
      this.$router.replace({name: 'home'})
    }
  },

  mounted () {
    console.log(this.user)
  }
}
</script>