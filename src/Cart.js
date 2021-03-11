import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import store from "./store/Store";
import history from "./history";

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
  const [searchTerm, setSearchTerm] = useState("");

  let clear = () => {
    store.dispatch({
        type: "CLEAR_CART",
      });
  }

  return (
    <div className="cart_main_div">
    <nav className="nav_tag">
        <div className="menu_input">
          <img
            className="logo_img"
            src="https://bacc.pk/wp-content/uploads/2020/07/57966-Converted.png"
            width="60"
            onClick={() => {
                history.push("/");
            }}
          />
          <input
            type="text"
            className="input_tag"
            placeholder="search...."
            onChange={(event) => {
              setSearchTerm(event.target.value);
            }}
          />
        </div>
        <div className="cls_mail">
          <Tooltip title="Delete">
            <DeleteIcon className="del_icon" onClick={clear} />
          </Tooltip>
        </div>
      </nav>
    <h1>CART ITEMS</h1>
      <div className="cardscss">
        {props.cartList.filter((val) => {
            if (searchTerm == "") {
              return val;
            } else if (
              val.name.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            } else if (
              val.description.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          }).map((val, key) => {
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
