import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import Tooltip from "@material-ui/core/Tooltip";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import store from "./store/Store";
import history from "./history";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";

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
  };

  let delItem = (value) => {
    store.dispatch({
      type: "DEL_ITEM",
      value: value,
    });
  };

  let handleQuantity = (type, value) => {
    if (type === "+") {
      store.dispatch({
        type: "ADD_QUANTITY",
        value: value,
      });
    } else if (type === "-") {
      store.dispatch({
        type: "SUBTRACT_QUANTITY",
        value: value,
      });
    }
  };

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
          <Tooltip title="Delete All">
            <DeleteIcon className="del_icon" onClick={clear} />
          </Tooltip>
        </div>
      </nav>
      {props.cartList.length ? <h1>CART ITEMS</h1> : null}
      <div className="cardscss">
        {props.cartList.length ? (
          props.cartList
            .filter((val) => {
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
            })
            .map((val, key) => {
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
                      <Typography gutterBottom variant="h5" component="h2">
                        {`Price $${val.price}`}
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
                  <CardActions>
                    <Button
                      id="plus_cart_btn"
                      size="small"
                      color="primary"
                      onClick={() => handleQuantity("+", val)}
                    >
                      <AddCircleOutlineIcon />
                    </Button>
                    <Typography gutterBottom variant="h5" component="h2">
                      {val.quantity}
                    </Typography>
                    <Button
                      id="minus_cart_btn"
                      size="small"
                      color="primary"
                      onClick={() => handleQuantity("-", val)}
                    >
                      <RemoveCircleOutlineIcon />
                    </Button>
                    <Button
                      id="del_cart_btn"
                      size="small"
                      color="primary"
                      onClick={() => delItem(val)}
                    >
                      <DeleteIcon /> Delete Item
                    </Button>
                  </CardActions>
                </Card>
              );
            })
        ) : (
          <h1>No Item</h1>
        )}
      </div>
      <div className="main_summary_div">
        <div className="item_Price">
          <h2>Summary</h2>
          <div className="item_number">
            <h3>Total Items:</h3>
            <h3>10</h3>
          </div>
          <div className="item_number">
            <h3>Total Price:</h3>
            <h3> { `$${props.cartList.price}` } </h3>
          </div>
          <div className="checkout_btn">
            <button>CHECK OUT</button>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartList: state.cartList,
    cartValue: state.cartValue,
  };
};

export default connect(mapStateToProps)(Cart);
