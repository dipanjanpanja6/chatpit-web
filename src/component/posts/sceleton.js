import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardHeader from "@material-ui/core/CardHeader"
import CardContent from "@material-ui/core/CardContent"
import Skeleton from "@material-ui/lab/Skeleton"

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
  },
  media: {
    height: 190,
  },
}))

export default function Media() {
  const classes = useStyles()

  return (
    <>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Skeleton animation="wave" variant="circle" width={40} height={40} />}
          title={<Skeleton animation="wave" height={20} width="30%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton animation="wave" height={10} width="40%" />}
        />
        {<Skeleton animation="wave" variant="rect" className={classes.media} />}

        <CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={20} width="50%" />
            <Skeleton animation="wave" height={18} width="80%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={15} width="40%" />
          </React.Fragment>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Skeleton animation="wave" variant="circle" width={40} height={40} />}
          title={<Skeleton animation="wave" height={20} width="30%" style={{ marginBottom: 6 }} />}
          subheader={
            <>
              <Skeleton animation="wave" height={10} width="40%" />
              <Skeleton animation="wave" height={12} width="30%" />
            </>
          }
        />
        {/* {<Skeleton animation="wave" variant="rect" className={classes.media} />} */}

        <CardContent>
          <React.Fragment>
            <Skeleton animation="wave" height={20} width="50%" style={{ marginBottom: 6 }} />
            <Skeleton animation="pulse" height={10} width="80%" />
            <Skeleton animation="wave" height={15} width="60%" style={{ marginBottom: 6 }} />
            <Skeleton animation="pulse" height={18} width="40%" style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={12} width="80%" />
            <Skeleton animation="wave" height={19} width="40%" />
          </React.Fragment>
        </CardContent>
      </Card>
      <Card className={classes.card}>
        <CardHeader
          avatar={<Skeleton animation="wave" variant="circle" width={40} height={40} />}
          title={<Skeleton animation="wave" height={20} width="30%" style={{ marginBottom: 6 }} />}
          subheader={<Skeleton animation="wave" height={11} width="40%" />}
        />
        {<Skeleton animation="wave" variant="rect" className={classes.media} />}
      </Card>
    </>
  )
}
