import { useEffect, useRef } from "react"
import type { CSSProperties } from "react"
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/library"

interface BarcodeEvent {
	text: string
	format: string
	timestamp: number
}

interface BarcodeReaderProps {
	className?: string
	style?: CSSProperties
	width?: number | string
	height?: number | string
	onScan: (event: BarcodeEvent) => void
}

const BarcodeReader: React.FC<BarcodeReaderProps> = ({ onScan, ...rest }) => {
	const videoElementRef = useRef<HTMLVideoElement>(null)

	useEffect(() => {
		const codeReader = new BrowserMultiFormatReader()
		let isCancelled = false

		const scan = async () => {
			const [defaultVideoSource] =
				await codeReader.listVideoInputDevices()

			if (isCancelled || !videoElementRef) return

			await codeReader.decodeFromVideoDevice(
				defaultVideoSource.deviceId,
				videoElementRef.current,
				(result) => {
					if (result) {
						onScan({
							text: result.getText(),
							format: BarcodeFormat[result.getBarcodeFormat()],
							timestamp: result.getTimestamp()
						})
					}
				}
			)
		}

		const cleanup = () => {
			isCancelled = true
			codeReader.reset()
		}

		scan()

		return cleanup
	}, [onScan])

	return (
		<video
			ref={videoElementRef}
			controls={false}
			autoPlay={true}
			muted={true}
			playsInline={true}
			disablePictureInPicture={true}
			onContextMenu={(event) => event.preventDefault()}
			style={{ transform: "rotateY(180deg)" }}
			{...rest}
		/>
	)
}

export default BarcodeReader
