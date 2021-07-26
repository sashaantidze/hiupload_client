<template>
	
	<div :class="plan.is_current_plan ? 'border-gray-200 px-7 py-5' :'border-2 border-gray-200 px-6 py-4'" class="rounded-lg flex items-center justify-between">
		<div class="flex items-center">

			<h2 class="font-bold text-lg mr-4" :class="plan.is_current_plan ? 'text-white' : 'text-indigo-500'">{{ plan.name }}</h2>
			<span :class="plan.is_current_plan ? 'text-white' : 'text-gray-800'" class="text-sm">{{ storageFormtted }}</span>
		</div>

		<span class="font-medium">
			{{ priceFormatted }}
		</span>
	</div>

</template>

<script>
import filesize from 'filesize'

export default {
	props: {
		plan: {
			required: true,
			type: Object,
		}
	},


	computed: {
		storageFormtted () {
			return filesize(this.plan.storage)
		},

		priceFormatted () {
			if(!this.plan.price){
				return 'Free'
			}
			return 'GEL ' + parseInt(this.plan.price, 10) / 100 + ' / month'
		}
	}

	
}

</script>