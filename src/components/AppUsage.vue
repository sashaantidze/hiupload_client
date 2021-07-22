<template>
	<span class="inline-block text-sm font-medium text-gray-800 text-center bg-gray-200 rounded-lg py-2 px-3">
		Usage: {{usageFormatted}} / {{planStorageFormatted}} ({{percetageUsed}}%) {{}}
	</span>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import filesize from 'filesize'
export default {
	computed: {
		...mapGetters({
			usage: 'usage/usage',
			user: 'auth/user'
		}),

		usageFormatted () {
			return filesize(this.usage)
		},

		planStorageFormatted () {
			return filesize(this.user.plan.storage)
		},


		percetageUsed () {
			return ((this.usage / this.user.plan.storage) * 100).toFixed(1)
		}
	},

	methods: {
		...mapActions({
			getUsage: 'usage/getUsage'
		})
	},

	mounted () {
		this.getUsage()
	}
}
</script>