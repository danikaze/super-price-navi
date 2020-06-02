import { FunctionComponent } from 'react';
import { Shop } from '@model/app';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import Link from 'next/link';

export interface ShopCardProps {
  data: Shop;
  link?: boolean;
  key?: string;
}

export const ShopCard: FunctionComponent<ShopCardProps> = props => {
  const data = props.data;
  const link = props.link && data._id;

  const card = (
    <Card>
      <CardContent>
        <Typography>{data.name}</Typography>
        <Typography>{data.company?.name}</Typography>
        <Typography>{data.address}</Typography>
      </CardContent>
    </Card>
  );

  return link ? (
    <Link href="/shop/[id]" as={`/shop/${data._id}`}>
      {card}
    </Link>
  ) : (
    card
  );
};
