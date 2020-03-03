import Quagga, { QuaggaJSConfigObject } from '@ericblade/quagga2';
import { createRef, ChangeEvent } from 'react';

type InputRef = React.RefObject<HTMLInputElement>;

function useBarcodeReader() {
  async function onInputChange(
    ev: ChangeEvent<HTMLInputElement>
  ): Promise<string | void> {
    const files = ev.target.files;
    if (!files || files.length === 0) {
      if (outputRef.current) {
        outputRef.current.value = '';
      }
      return;
    }

    const url = URL.createObjectURL(files[0]);
    let result;

    try {
      result = await decode(url);
    } catch (e) {
      if (outputRef.current) {
        outputRef.current.value = e;
      }
      return;
    }
    if (outputRef.current) {
      outputRef.current.value = result;
    }

    return result;
  }

  const outputRef = createRef() as InputRef;

  return {
    onInputChange,
    outputRef,
    inputRef: createRef() as InputRef,
  };
}

async function decode(src: string) {
  const config: QuaggaJSConfigObject = {
    src,
    inputStream: {
      // size: 800,
      singleChannel: false,
    },
    locator: {
      patchSize: 'medium',
      halfSample: true,
    },
    decoder: {
      readers: [
        'code_128_reader',
        'ean_reader',
        'ean_8_reader',
        'code_39_reader',
        'code_39_vin_reader',
        'codabar_reader',
        // 'upc_reader',
        // 'upc_e_reader',
        'i2of5_reader',
        '2of5_reader',
        'code_93_reader',
      ],
    },
    locate: true,
  };

  return Quagga.decodeSingle(config).then(result => {
    if (!result) throw new Error('Error while decoding image');
    console.log('decodeSingle', result);
    if (result.codeResult?.code) {
      return result.codeResult.code;
    }
    throw new Error('Could not decode the provided image');
  });
}

export const BarcodeReaderFile = (): JSX.Element => {
  const { inputRef, outputRef, onInputChange } = useBarcodeReader();

  return (
    <div>
      <input ref={outputRef} />
      <button onClick={() => inputRef.current!.click()}>Select image</button>
      <input
        type="file"
        capture
        ref={inputRef}
        onChange={onInputChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};
