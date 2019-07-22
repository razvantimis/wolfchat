import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
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
export const ChatRoom = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Grid container spacing={6}>
        <Grid item xs={4}>
          <Avatar className={classes.avatar}>H</Avatar>
        </Grid>
        <Grid item xs={8} container
          direction="row"
          justify="center"
          alignItems="center">

          <Typography variant="h6" gutterBottom>
            Your name
          </Typography>
        </Grid>
      </Grid>
    </Card>
  )
}