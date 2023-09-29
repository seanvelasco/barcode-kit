<script lang="ts">
	import { onMount, onDestroy } from 'svelte'
	import { BrowserMultiFormatReader, BarcodeFormat } from '@zxing/library'
	import type { BarcodeEvent } from './../types'

	export let onScan: (event: BarcodeEvent) => void

	const codeReader = new BrowserMultiFormatReader()

	let videoElement: HTMLVideoElement

	const scan = async () => {
		const [defaultVideoSource] = await codeReader.listVideoInputDevices()
		await codeReader.decodeFromVideoDevice(defaultVideoSource.deviceId, videoElement, (result) => {
			if (result) {
				const event = {
					text: result.getText(),
					format: BarcodeFormat[result.getBarcodeFormat()],
					timestamp: result.getTimestamp()
				}
				onScan(event)
			}
		})
	}

	const cleanup = () => {
		codeReader.reset()
	}

	const preventDefaultContextMenu = (event: Event) => {
		event.preventDefault()
	}

	onMount(scan)
	onDestroy(cleanup)
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
	on:contextmenu={preventDefaultContextMenu}
/>

<style>
	video {
		transform: rotateY(180deg);
	}
</style>
