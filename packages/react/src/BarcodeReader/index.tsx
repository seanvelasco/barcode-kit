import { useEffect, useRef, type CSSProperties } from "react"
import { BrowserMultiFormatReader, BarcodeFormat } from "@zxing/library"

export interface BarcodeEvent {
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
		const reader = new BrowserMultiFormatReader()
		let isCancelled = false

		async () => {
			const [defaultVideoSource] =
				await reader.listVideoInputDevices()

			if (isCancelled || !videoElementRef) return

			await reader.decodeFromVideoDevice(
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

		return () => {
			isCancelled = true
			reader.reset()
		}
	}, [onScan])

	return (
		<video
			ref={videoElementRef}
			controls={false}
			autoPlay={true}
			muted={true}
			playsInline={true}
			disablePictureInPicture={true}
			className={rest.className}
			style={{ transform: "rotateY(180deg)", ...rest.style }}
			width={rest.width}
			height={rest.height}
			onContextMenu={(event) => event.preventDefault()}
		/>
	)
}

export default BarcodeReader
