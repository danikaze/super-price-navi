import { NextPage } from 'next';
import Container from '@material-ui/core/Container/Container';
import { PageTitle } from '@components/page-title';

const NewItemPage: NextPage = () => {
  return (
    <>
      <Container>
        <PageTitle>Add new Item</PageTitle>
      </Container>
    </>
  );
};

export default NewItemPage;
