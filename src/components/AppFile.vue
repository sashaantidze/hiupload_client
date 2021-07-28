<template>
	<div class="flex items-center justify-between border-b-2 border-gray-100">
		
		<div class="text-sm truncate overflow-ellipsis w-6/12">
			{{file.name}} <span class="font-semibold italic text-indigo-300">({{getFIleSize}})</span>
		</div>

		<div class="-mr-3 flex items-center">
			<app-file-link :file="file" />
			<a href="" class="inline-block text-sm p-3 text-pink-500 font-medium" @click.prevent="deleteFile">Delete</a>
		</div>

	</div>

</template>

<script>
	
import {mapActions, mapMutations} from 'vuex'
import AppFileLink from '@/components/AppFileLink'
import filesize from 'filesize'

export default {
	props: {
		file: {
			required: true,
			type: Object
		}
	},

	components: {
		AppFileLink
	},

	computed: {
		getFIleSize () {
			return filesize(this.file.size)
		}
	},

	methods: {
		...mapActions({
			deleteFileAction: 'files/deleteFile',
			snack: 'snack/snack'
		}),

		...mapMutations({
			decrementUsage: 'usage/DECREMENT_USAGE'
		}),

		async deleteFile () {

			await this.$swal({
			  title: 'Are you sure?',
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
				if (result.isConfirmed) {
				 	this.deleteFileAction(this.file.uuid)
					this.decrementUsage(this.file.size)
					this.snack('File Deleted.')
				}

			})



		}
	}
}

</script>