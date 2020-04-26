import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Grid} from "@material-ui/core/";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles((theme) => ({
 
  small: {
    width: theme.spacing(4),
    height: theme.spacing(4),
    marginBottom:"12px"
  },
  commentG:{
    margin:'12px 0'
  },
  commentP:{
    padding:'1px 12px',
    marginLeft:'5px',
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
      <div className={classes.commentP}>
        <Skeleton animation="wave" height={20} width={130} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width={100} />
        <Skeleton animation='pulse' height={10} width={200} />
        <Skeleton animation="wave" height={10} width={150} style={{ marginBottom: 6 }}/>
      </div>
    </Grid>
    <Grid className={classes.commentG} container>
      <Skeleton
        animation="wave"
        variant="circle"
        width={40} height={40}
      />
      <div className={classes.commentP}>
        <Skeleton animation="wave" height={20} width={100} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width={80} />
        <Skeleton animation='pulse' height={10} width={100} />
        <Skeleton animation="wave" height={10} width={190} style={{ marginBottom: 6 }}/>
      </div>
    </Grid>
    <Grid className={classes.commentG} container>
      <Skeleton
        animation="wave"
        variant="circle"
        width={40} height={40}
      />
      <div className={classes.commentP}>
        <Skeleton animation="wave" height={20} width={100} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width={200} />
        <Skeleton animation='pulse' height={10} width={100} />
        <Skeleton animation="wave" height={10} width={150} style={{ marginBottom: 6 }}/>
      </div>
    </Grid>
    <Grid className={classes.commentG} container>
      <Skeleton
        animation="wave"
        variant="circle"
        width={40} height={40}
      />
      <div className={classes.commentP}>
        <Skeleton animation="wave" height={20} width={80} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width={190} />
        <Skeleton animation="wave" height={10} width={150} style={{ marginBottom: 6 }}/>
      </div>
    </Grid>
    <Grid className={classes.commentG} container>
      <Skeleton
        animation="wave"
        variant="circle"
        width={40} height={40}
      />
      <div className={classes.commentP}>
        <Skeleton animation="pulse" height={20} width={80} style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={10} width={190} />
        <Skeleton animation="wave" height={10} width={150} style={{ marginBottom: 6 }}/>
      </div>
    </Grid>
    <Grid className={classes.commentG} container>
      <Skeleton
        animation="wave"
        variant="circle"
        width={40} height={40}
      />
      <div className={classes.commentP}>
        <Skeleton animation="wave" height={10} width={100} />
        <Skeleton animation='pulse' height={10} width={90} />
        <Skeleton animation="wave" height={10} width={150} style={{ marginBottom: 6 }}/>
      </div>
    </Grid>
   
    </>
  );
}

