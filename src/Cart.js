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
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

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
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [itemDetail, setItemDetail] = React.useState({});

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const clickOpen = (selectedItem) => {
    setOpenDialog(true);
    setItemDetail(selectedItem);
  };

  const clickClose = () => {
    setOpenDialog(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
                  <CardActionArea onClick={() => clickOpen(val)}>
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
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      style={{ color: "rgb(106, 106, 248)" }}
                    >
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
      {props.cartList.length != 0 ? (
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Check Out
          </Button>
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
            id="dialog"
          >
            <DialogTitle id="responsive-dialog-title">
              <h2 id="summary_text">SUMMARY</h2>
            </DialogTitle>
            <DialogContent>
              <div id="summary_numbers">
                <div className="item_number">
                  <h3>Total Items:</h3>
                  <h3>{props.totalItems}</h3>
                </div>
                <div className="item_number">
                  <h3>Total Price:</h3>
                  <h3> {`$${props.totalPrice}`} </h3>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleClose}
                color="primary"
                autoFocus
                id="cancel_dialog"
              >
                Cancel
              </Button>
              <Button
                onClick={handleClose}
                color="primary"
                autoFocus
                id="pay_dialog"
              >
                Proceed To Pay
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      ) : (
        <h1></h1>
      )}
      <div className="item_detail_div">
        <Dialog
          fullScreen={fullScreen}
          open={openDialog}
          onClose={clickClose}
          aria-labelledby="responsive-dialog-title"
        >
          <h2
            id="responsive-dialog-title"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "30px",
              color: "rgb(106, 106, 248)",
              fontFamily: "'Akaya Telivigala', cursive",
            }}
          >
            {itemDetail?.name}
          </h2>
          <DialogContent>
            <div
              className="img_div"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <img
                src={itemDetail?.imagesrc}
                alt="Dog Image"
                width="450"
                height="275"
              />
            </div>
            <h2
            id="responsive-dialog-title"
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "25px",
              color: "rgb(106, 106, 248)",
              fontFamily: "'Akaya Telivigala', cursive",
            }}
          >
            {`Price $${itemDetail?.price}`}
          </h2>
            <DialogContentText
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                fontSize: "25px",
                color: "rgb(106, 106, 248)",
                fontFamily: "'Akaya Telivigala', cursive",
              }}
            >
              {itemDetail?.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              id="cancel_dialog"
              onClick={clickClose}
              color="primary"
            >
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  let totalItems = 0;
  let totalPrice = 0;

  state.cartList.map((item) => {
    totalItems += item.quantity;
    totalPrice += item.quantity * item.price;
  });
  return {
    cartList: state.cartList,
    cartValue: state.cartValue,
    totalItems: totalItems,
    totalPrice: totalPrice,
  };
};

export default connect(mapStateToProps)(Cart);
