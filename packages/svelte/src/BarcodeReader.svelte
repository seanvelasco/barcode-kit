<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { writable } from 'svelte/store'
	import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library'
	import type { BarcodeEvent } from '.'

	export const barcode = writable<BarcodeEvent>()

	const codeReader = new BrowserMultiFormatReader()

	let videoElement: HTMLVideoElement

	const scan = async () => {
		const [defaultVideoSource] = await codeReader.listVideoInputDevices()
		await codeReader.decodeFromVideoDevice(defaultVideoSource.deviceId, videoElement, (result) => {
			if (result) {
				barcode.set({
					text: result.getText(),
					format: BarcodeFormat[result.getBarcodeFormat()],
					timestamp: result.getTimestamp()
				})
			}
		})
	}

	onMount(scan)
	onDestroy(() => codeReader.reset())
</script>

<video
	bind:this={videoElement}
	controls={false}
	autoPlay={true}
	muted={true}
	playsInline={true}
	disablePictureInPicture={true}
	class={$$props.class}
	style={$$props.style}
	width={$$props.width}
	height={$$props.height}
	on:contextmenu={(event) => event.preventDefault()}
/>

<style>
	video {
		transform: rotateY(180deg);
	}
</style>
