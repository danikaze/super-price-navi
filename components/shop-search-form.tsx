import { FunctionComponent, createRef } from 'react';
import Card from '@material-ui/core/Card/Card';
import { Shop } from '@model/app';
import Button from '@material-ui/core/Button/Button';
import CardContent from '@material-ui/core/CardContent/CardContent';
import { TextField } from './text-field';

export interface SearchShopCardProps {
  data?: Shop;
  onSearch: (filter: Partial<Shop>) => void;
}

function useSearchShop(props: SearchShopCardProps) {
  const refShopName = createRef<HTMLInputElement>();

  function onSearch() {
    const filter: Partial<Shop> = {
      name: refShopName.current!.value,
    };

    props.onSearch(filter);
  }

  return {
    refShopName,
    onSearch,
  };
}

export const ShopSearchForm: FunctionComponent<SearchShopCardProps> = props => {
  const { refShopName, onSearch } = useSearchShop(props);

  return (
    <Card>
      <CardContent>
        <TextField id="shop-name" inputRef={refShopName} label="Shop name" />

        <Button onClick={onSearch} variant="contained" color="primary">
          Search
        </Button>
      </CardContent>
    </Card>
  );
};
