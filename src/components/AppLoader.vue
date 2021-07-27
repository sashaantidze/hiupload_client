<template>

  <div v-if="loading" class="flex justify-center items-center">
    <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
  </div>

</template>

<script>
export default {
  props: {
    loading: {
    	required: false,
    	type: Boolean
    }
  }
}
</script>