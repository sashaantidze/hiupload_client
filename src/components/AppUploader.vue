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
					this.$emit('validation', {})

					let form = new FormData()
					const cancelTokenSource = axios.CancelToken.source()

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

						axios.post(response.data.attributes.action, form, {
							onUploadProgress (e){
								progress(e.lengthComputable, e.loaded, e.total)
							},
							cancelToken: cancelTokenSource.token
						}).then(() => {
							load(`${file.additionalData.key}`)
						})

					}).catch((e) => {
						if(e.response.status === 422) {
							this.$swal({
							  icon: 'error',
							  title: 'Oops...',
							  text: e.response.data.errors.size,
							  footer: `<a :to="{name: 'plans'}">Upgrade Plan?</a>`
							})

							this.$emit('validation', e.response.data.errors)
						}

						abort()
					})

					return {
						abort: () => {
							cancelTokenSource.cancel()
							abort()
						}
					}

				}
			},

			onprocessfile: (error, file) => {
				if(error){
					return
				}

				pond.removeFile(file)
				this.$emit('onprocessfile', file)
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