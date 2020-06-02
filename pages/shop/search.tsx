import { useState } from 'react';
import { NextPage } from 'next';
import { apiCall } from '@util/api-call';
import { Shop } from '@model/app';
import Container from '@material-ui/core/Container/Container';
import { PageTitle } from '@components/page-title';
import { ShopCard } from '@components/shop-card';
import { ShopSearchForm } from '@components/shop-search-form';

function useSearchShop() {
  async function onSearch(filter: Partial<Shop>) {
    const result = await apiCall<Shop[]>('shop/search', {
      method: 'POST',
      data: filter,
    });
    setShopList(result.data);
  }

  const [shopList, setShopList] = useState([] as Shop[]);

  return {
    shopList,
    onSearch,
  };
}

const NewShopPage: NextPage = () => {
  const { shopList, onSearch } = useSearchShop();

  return (
    <Container>
      <PageTitle>Search Shop</PageTitle>
      <ShopSearchForm onSearch={onSearch} />
      {shopList.length > 0 ? renderShopList(shopList) : renderEmptyResult()}
    </Container>
  );
};

function renderEmptyResult() {}

function renderShopList(shops: Shop[]) {
  return shops.map(shop => (
    <ShopCard data={shop} link={true} key={shop._id as string} />
  ));
}

export default NewShopPage;
