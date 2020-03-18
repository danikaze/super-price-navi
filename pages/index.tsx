import { GetServerSideProps, NextPage } from 'next';
import { request, RequestOptions } from 'http';

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
  return new Promise(resolve => {
    const options: RequestOptions = {
      hostname: 'localhost',
      port: SERVER_PORT,
      path: '/api/env',
      method: 'GET',
    };

    const req = request(options, res => {
      let data = '';

      res.on('data', d => {
        data += d.toString();
      });

      res.on('end', () => {
        let props = {};
        try {
          props = JSON.parse(data);
        } finally {
          resolve({ props });
        }
      });
    });

    req.on('error', () => {
      resolve({ props: {} });
    });
    req.end();
  });
};

export default Index;
