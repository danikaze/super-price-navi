import { GetServerSideProps, NextPage } from 'next';
import Link from 'next/link';
import { apiCall } from '@util/api-call';

const Index: NextPage = props => {
  const envList = Object.entries(props).map(([key, value]) => (
    <li key={key}>
      <pre>
        <b>{key}</b>: {String(value)}
      </pre>
    </li>
  ));

  return (
    <div>
      <ul>
        <li>
          <Link href="/shop/new">
            <a>Add new shop</a>
          </Link>
        </li>
        <li>
          <Link href="/shop/search">
            <a>List of shops</a>
          </Link>
        </li>
        <li>
          <Link href="/item/new">
            <a>Add new item</a>
          </Link>
        </li>
      </ul>
      <b>Defined Constants:</b>
      <ul>{envList}</ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  return apiCall('env').then(res => {
    return {
      props: res.data,
    };
  });
};

export default Index;
