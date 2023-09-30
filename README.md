# barcode-kit

Read and generate barcodes and QR codes in React and Svelte.

## Features

- Read barcodes and QR codes from a webcam or camera
- Generate barcodes and QR codes
- React and Svelte components
- Works on mobile
- JavaScript-native with TypeScript support


## Installation

### React
```bash
npm install react-barcode-kit
```

### Svelte
```
npm install svelte-barcode-kit
```

## Usage

### React

#### Barcode Reader

```tsx
import { useState } from "react"
import { BarcodeReader } from "react-barcode-kit"

function App() {
  const [barcode, setBarcode] = useState(null)

  return (
    <div>
      <BarcodeReader onScan={setBarcode}/>
      <p>{barcode}</p>
    </div>
  )
}

export default App
```

#### Barcode Generator

```tsx
import { Barcode } from "react-barcode-kit"

function App() {

  return (
    <div>
      <Barcode>Your data goes here</Barcode>
    </div>
  )
}

export default App
```

### Svelte

#### Barcode Reader

```html
<script>
    import { BarcodeReader } from "svelte-barcode-kit"
    
    let barcode = null
    const handleBarcode = (data) => {
        barcode = data
    }
</script>

<BarcodeReader onScan={barcode}/>
<p>{barcode}</p>
```

#### Barcode Generator

```html
<script>
    import { Barcode } from "svelte-barcode-kit"
</script>

<Barcode>Your data goes here</Barcode>
```



## Acknowledgements

- [zxing](https://github.com/zxing-js/library)
- [JsBarcode](https://github.com/lindell/JsBarcode)

## FAQ




## License