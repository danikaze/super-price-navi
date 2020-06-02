import { NextPage } from 'next';
import Link from 'next/link';
import Container from '@material-ui/core/Container/Container';
import { Shop } from '@model/app';
import { PageTitle } from '@components/page-title';
import { apiCall } from '@util/api-call';
import { ShopCard } from '@components/shop-card';

const NewShopPage: NextPage<Shop> = shop => {
  const editLink = (
    <Link href="/shop/[id]/edit" as={`/shop/${shop._id}/edit`}>
      <a>[edit]</a>
    </Link>
  );

  return (
    <>
      <Container>
        <PageTitle>Shop details {editLink}</PageTitle>
        <ShopCard data={shop} />
      </Container>
    </>
  );
};

export default NewShopPage;

NewShopPage.getInitialProps = async ({ query }) => {
  const shop = await apiCall<Shop>('shop', {
    params: {
      id: query.id as string,
    },
  });

  return {
    ...shop.data,
    id: query.id as string,
  };
};
