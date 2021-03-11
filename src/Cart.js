import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    margin: "20px",
    textAlign: "center",
    justifyContent: "center",
  },
  media: {
    height: 220,
  },
});

function Cart(props) {
  const classes = useStyles();

  return (
    <div className="cart_main_div">
    <h1>CART ITEMS</h1>
      <div className="cardscss">
        {props.cartList.map((val, key) => {
          return (
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={val.imagesrc}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    {val.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {val.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartList: state.cartList,
  };
};

export default connect(mapStateToProps)(Cart);
