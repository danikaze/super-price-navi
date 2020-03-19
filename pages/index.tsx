import { GetServerSideProps, NextPage } from 'next';
import { apiCall } from 'util/api-call';

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
