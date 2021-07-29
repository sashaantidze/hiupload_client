<template>
  <div class="w-10/12 md:w-6/12 mx-auto">

    <form action="" @submit.prevent="login" class="mb-8">

      <div class="mb-6">

        <div class="mb-6">
          <label for="name" class="inline-block text-sm mb-2">Name</label>
          <input :class="{'border-red-500': errors.name}" type="text" id="name" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" v-model="form.name">
          <div class="text-sm text-red-500 mt-1" v-if="errors.name">{{errors.name[0]}}</div>
        </div>
        
        <div class="mb-6">
          <label for="email" class="inline-block text-sm mb-2">Email address</label>
          <input :class="{'border-red-500': errors.email}" type="text" id="email" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" v-model="form.email">
          <div class="text-sm text-red-500 mt-1" v-if="errors.email">{{errors.email[0]}}</div>
        </div>

        <div class="mb-6">
          <label for="password" class="inline-block text-sm mb-2">Password</label>
          <input :class="{'border-red-500': errors.password}" type="password" id="password" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" v-model="form.password">
          <div class="text-sm text-red-500 mt-1" v-if="errors.password">{{errors.password[0]}}</div>

        </div>

        <div class="mb-6">
          <label for="password_confirmation" class="inline-block text-sm mb-2">Confirm Password</label>
          <input type="password" id="password_confirmation" class="w-full border-2 border-gray-200 h-10 px-3 rounded-md" v-model="form.password_confirmation">
        </div>

      </div>

      <app-button :disabled="loading" :loading="loading" title="Create Account" type="submit" class="bg-indigo-500 text-white px-4 py-3 leading-none rounded-lg font-medium" />
      <app-loader :loading="loading" />


    </form>

      <p class="text-sm text-gray-800">Already have an account? <router-link class="text-indigo-500" :to="{name: 'login'}">Login</router-link></p>
  
  </div>
</template>

<script>
import axios from 'axios' 
import {mapActions} from 'vuex'
import AppButton from '@/components/AppButton'
import AppLoader from '@/components/AppLoader'

export default {
  data () {
    return {
      loading: false,
      errors: {},
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      }
    }
  },

  components: {
    AppButton,
    AppLoader
  },



  methods: {
    ...mapActions({
      loginAction: 'auth/login',
      snack: 'snack/snack'
    }),
    
    async login () {
      this.loading = true
      this.errors = {}

      try {
        
        await axios.post('/api/register', this.form)

        await this.loginAction({
          email: this.form.email,
          password: this.form.password
        })

        this.snack('Hi There!')

        this.loading = false

        this.$router.replace({name: 'home'})

      } catch (e) {
        this.loading = false 

        console.log(e.response)
        if(e.response.status === 422){
          this.errors = e.response.data.errors
        }
      }
         
    }
  }
}
</script>
