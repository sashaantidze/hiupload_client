<template>
	
	<div class="border-2 border-gray-200 rounded-lg px-6 py-4 flex items-center justify-between">
		<div class="flex items-center">
			<h2 class="font-bold text-lg mr-4 text-indigo-500">{{ plan.name }}</h2>
			<span class="text-sm text-gray-800">{{ storageFormtted }}</span>
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
			type: Object
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