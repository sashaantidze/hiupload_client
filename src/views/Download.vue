<template>
  <div>
    <div class="p-12 rounded-lg bg-gray-100 text-center" v-if="file && meta">
    	 <h1 class="text-xl font-medium mb-3 text-gray-700">{{file.name}}</h1>
    	 <p class="mb-3">{{fileSizeFormatted}}</p>
    	 <app-button @click.prevent="download" title="Download file" />
    </div>

	<div v-if="error">
		<p class="text-sm text-red-500 text-center">Sorry, this file is not available. </p>
	</div>


  </div>
</template>

<script>
import AppButton from '@/components/AppButton'
import filesize from 'filesize'
import axios from 'axios'
export default {

	props: {
		uuid: {
			required:true,
			type: String
		},

		token: {
			required: true,
			type: String
		}
	},

	data () {
		return {
			error: false,
			file: null,
			meta: null
		}
	},

	components: {
		AppButton
	},

	methods: {
		download () {
			let dummy = document.createElement('a')

			dummy.href = this.meta.url
			document.body.appendChild(dummy)
			dummy.click()
			document.body.removeChild(dummy)
		},

		async getFile() {
			try {
				let response = await axios.get(`api/files/${this.uuid}/links?token=${this.token}`)

				this.file = response.data.data
				this.meta = response.data.meta
			}
			catch (e) {
				this.error = true
			}
			
		}
	},


	computed: {
		fileSizeFormatted() {
			return filesize(this.file.size)
		}
	},

	mounted() {
		this.getFile()
	}
}
</script>