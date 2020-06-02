import { NextPage } from 'next';
import { apiCall } from '@util/api-call';
import { Shop } from '@model/app';
import { ShopCardEdit } from '@components/shop-card-edit';
import Container from '@material-ui/core/Container/Container';
import { PageTitle } from '@components/page-title';

function useNewShop() {
  async function onSave(data: Shop) {
    await apiCall('shop', {
      data,
      method: 'POST',
    });
  }

  return {
    onSave,
  };
}

const NewShopPage: NextPage = () => {
  const { onSave } = useNewShop();

  return (
    <Container>
      <PageTitle>Add new Shop</PageTitle>
      <ShopCardEdit onSave={onSave} />
    </Container>
  );
};

export default NewShopPage;
