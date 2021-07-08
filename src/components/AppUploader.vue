<template>
	<input type="file" name="file" id="file" ref="file" multiple>
</template>


<script>
import * as Filepond from 'filepond'
import axios from 'axios'

export default {
	mounted () {
		const pond = Filepond.create(this.$refs.file, {
			allowRevert: false,
			server: {
				process: (field, file, metadata, load, error, progress, abort) => {
					let form = new FormData()

					
					axios.post('api/files/signed', {
						name: metadata.fileInfo.name,
						extension: metadata.fileInfo.extension,
						size: metadata.fileInfo.size,
					}).then((response) => {
						file.additionalData = response.data.additionalData

						for (var field in file.additionalData){
							form.append(field, file.additionalData[field])
						}

						form.append('file', file)

						axios.post(response.data.attributes.action, form)
					})

				}
			},
			
			onaddfile: (error, file) => {
				if(error) {
					return
				}

				file.setMetadata('fileInfo', {
					name: file.filenameWithoutExtension,
					extension: file.fileExtension,
					size: file.fileSize
				})

				
			}
		})
	}
}

</script>