import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux'

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: "column",
    padding: theme.spacing(2),
    display: 'flex',
    width: "100%"
  },
  avatar: {
    margin: 10,
    width: 80,
    height: 80
  },

}));
export const UserAvatarAndName = () => {
  const classes = useStyles();
  const username = useSelector(state => state.user.username);
  return (
    <Grid container spacing={6}>
      <Grid item xs={4}>
        <Avatar className={classes.avatar}>{username.substring(0,1).toUpperCase()}</Avatar>
      </Grid>
      <Grid item xs={6} container
        direction="row"
        justify="center"
        alignItems="center">

        <Typography variant="h6" gutterBottom>
          {username}
          </Typography>
      </Grid>
    </Grid>
  )
}