import BarcodeReader from './BarcodeReader.svelte'

interface BarcodeEvent {
    text: string
    format: string
    timestamp: number
}

export { BarcodeReader, type BarcodeEvent }

