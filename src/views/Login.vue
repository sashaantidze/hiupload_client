<template>
  <div class="w-10/12 md:w-6/12 mx-auto">
    <form action="" @submit.prevent="login" class="mb-8">

      <div class="mb-6">
        
        <div class="mb-6">
          <label for="email" class="inline-block text-sm mb-2">Email address</label>
          <input type="text" id="email" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" v-model="form.email">
        </div>

        <div class="mb-6">
          <label for="password" class="inline-block text-sm mb-2">Password</label>
          <input type="password" id="password" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" v-model="form.password">
        </div>

      </div>

      <app-button :disabled="loading" :loading="loading" title="Login" type="submit" class="bg-indigo-500 text-white px-4 py-3 leading-none rounded-lg font-medium" />
      <app-loader :loading="loading" />


    </form>

      <p class="text-sm text-gray-800">Not joined yet? <a class="text-indigo-500" href="">Create an account</a></p>
  
  </div>
</template>

<script>

import {mapActions} from 'vuex'
import AppButton from '@/components/AppButton'
import AppLoader from '@/components/AppLoader'

export default {
  data () {
    return {
      loading: false,
      form: {
        email: 'bdare@example.com',
        password: '',
      }
    }
  },

  components: {
    AppButton,
    AppLoader
  },



  methods: {
    ...mapActions({
      loginAction: 'auth/login'
    }),
    
    async login () {
      this.loading = true

      try {

        await this.loginAction(this.form)
        this.$router.replace({name: 'home'})

      } catch (e) {

        console.log(e.response)
        this.loading = false  
      }
         
    }
  }
}
</script>
