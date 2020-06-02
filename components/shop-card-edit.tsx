import { FunctionComponent, createRef, useState } from 'react';
import { TextField } from './text-field';
import Button from '@material-ui/core/Button/Button';
import { Shop } from '@model/app';
import Card from '@material-ui/core/Card/Card';
import { isObjectEmpty } from '@util/is-object-empty';
import { diff } from 'deep-object-diff';

export interface ShopCardEditProps {
  data?: Shop;
  onSave?: (data: Shop) => Promise<void>;
  onCancel?: (data: Shop) => void;
  onChange?: (field: string, value: string) => void;
}

const validateNotEmpty = (text?: string): boolean => !!text && text.length > 0;

function useNewShop(props: ShopCardEditProps) {
  const currentData: Partial<Shop> = {
    ...props.data,
    company: { name: props.data?.company?.name || '' },
  };
  const originalData = props.data;
  const refShopName = createRef<HTMLInputElement>();
  const refShopCompany = createRef<HTMLInputElement>();
  const refShopAddress = createRef<HTMLInputElement>();
  const [isButtonDisabled, setButtonDisabled] = useState<boolean>(true);

  function onValueChange<K extends keyof Shop>(
    field: K,
    text: Shop[K] | string
  ) {
    if (field === 'company') {
      currentData.company!.name = text as string;
    } else {
      currentData[field] = text as Shop[K];
    }
    const dataDiff = diff(currentData, originalData!);

    setButtonDisabled(
      isObjectEmpty(dataDiff) || !validateNotEmpty(currentData.name)
    );
    if (props.onChange) {
      props.onChange(field, text as string);
    }
  }

  function onSave() {
    if (!props.onSave) return;
    props.onSave(currentData as Shop);
  }

  function onCancel() {
    if (!props.onCancel) return;
    props.onCancel(originalData as Shop);
  }

  return {
    refShopName,
    refShopCompany,
    refShopAddress,
    isButtonDisabled,
    onSave,
    onCancel,
    onNameChange: onValueChange.bind(null, 'name' as keyof Shop),
    onCompanyName: onValueChange.bind(null, 'company' as keyof Shop),
    onAddress: onValueChange.bind(null, 'address' as keyof Shop),
  };
}

export const ShopCardEdit: FunctionComponent<ShopCardEditProps> = props => {
  const {
    refShopName,
    refShopCompany,
    refShopAddress,
    isButtonDisabled,
    onSave,
    onCancel,
    onNameChange,
    onCompanyName,
    onAddress,
  } = useNewShop(props);

  const onSaveText = props.data?._id ? 'Update' : 'Add new shop';

  return (
    <Card>
      <TextField
        inputRef={refShopName}
        label="Shop name"
        validation={validateNotEmpty}
        onChange={onNameChange}
        defaultValue={props.data?.name}
      />
      <TextField
        inputRef={refShopCompany}
        label="Company"
        onChange={onCompanyName}
        defaultValue={props.data?.company?.name}
      />
      <TextField
        inputRef={refShopAddress}
        label="Address"
        onChange={onAddress}
        defaultValue={props.data?.address}
      />

      <Button onClick={onCancel} variant="contained" color="secondary">
        Cancel
      </Button>
      <Button
        onClick={onSave}
        disabled={isButtonDisabled}
        variant="contained"
        color="primary"
      >
        {onSaveText}
      </Button>
    </Card>
  );
};
