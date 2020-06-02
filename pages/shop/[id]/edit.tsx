import { diff } from 'deep-object-diff';
import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import Container from '@material-ui/core/Container/Container';
import { Shop } from '@model/app';
import { PageTitle } from '@components/page-title';
import { apiCall } from '@util/api-call';
import { ShopCardEdit } from '@components/shop-card-edit';

function useEditShop(shop: Shop) {
  let originalData = shop;
  const router = useRouter();

  async function onSave(data: Shop) {
    const diffData = diff(originalData, data);
    await apiCall('shop', {
      data: {
        ...diffData,
        _id: shop._id,
      },
      method: 'PUT',
    });
    originalData = data;
  }

  function onCancel() {
    router.push(`/shop/${shop._id}`);
  }

  return {
    onSave,
    onCancel,
  };
}

const EditShopPage: NextPage<Shop> = shop => {
  const { onSave, onCancel } = useEditShop(shop);

  return (
    <>
      <Container>
        <PageTitle>Edit shop details</PageTitle>
        <ShopCardEdit data={shop} onSave={onSave} onCancel={onCancel} />
      </Container>
    </>
  );
};

export default EditShopPage;

EditShopPage.getInitialProps = async ({ query }) => {
  const shop = await apiCall<Shop>('shop', {
    params: {
      id: query.id as string,
    },
  });

  return {
    ...shop.data,
    _id: query.id as string,
  };
};
