import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Card,Paper,Grid} from "@material-ui/core/";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
 
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginBottom:"12px"
  },
  commentG:{
    margin:'12px'
  },
  commentP:{
    padding:'1px 12px',
    marginLeft:'12px',
    marginRight:'12px',
  },
}));

export default function Media() {
  const classes = useStyles();

  return (
    <>
    <Grid className={classes.commentG} container>
      <Skeleton
        animation="wave"
        variant="circle"
        width={40} height={40}
      />
      <Paper className={classes.commentP}>
        <Skeleton animation="wave" height={20} width={150} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width={90} />
        <Skeleton animation="wave" height={10} width={130} />
        <Skeleton animation="wave" height={10} width={100} style={{ marginBottom: 6 }}/>
      </Paper>
    </Grid>
    <Grid className={classes.commentG} container>
      <Skeleton
        animation="wave"
        variant="circle"
        width={40} height={40}
      />
      <Paper className={classes.commentP}>
        <Skeleton animation="wave" height={20} width={100} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width={90} />
        <Skeleton animation="wave" height={10} width={130} />
        <Skeleton animation="wave" height={10} width={130} />
        <Skeleton animation="wave" height={10} width={110} style={{ marginBottom: 6 }}/>
      </Paper>
    </Grid>
    <Grid className={classes.commentG} container>
      <Skeleton
        animation="wave"
        variant="circle"
        width={40} height={40}
      />
      <Paper className={classes.commentP}>
        <Skeleton animation="wave" height={20} width={130} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width={190} />
        <Skeleton animation='pulse' height={10} width={100} />
        <Skeleton animation="wave" height={10} width={150} style={{ marginBottom: 6 }}/>
      </Paper>
    </Grid>
    </>
  );
}

