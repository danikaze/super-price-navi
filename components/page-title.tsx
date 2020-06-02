import { ReactNode, FunctionComponent } from 'react';
import { Typography, Theme, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginTop: theme.spacing(2),
  },
}));

export const PageTitle: FunctionComponent<Readonly<{
  children?: ReactNode;
}>> = ({ children }) => {
  const classes = useStyles();

  return (
    <Typography variant="h5" className={classes.title}>
      {children}
    </Typography>
  );
};
