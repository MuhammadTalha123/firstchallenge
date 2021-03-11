import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import LocalGroceryStoreIcon from "@material-ui/icons/LocalGroceryStore";
import JSONDATA from "./MOCK-JSON-DATA.json";
import Badge from "@material-ui/core/Badge";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import history from "./history";
import store from "./store/Store";
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

function MediaCard(props) {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");

  let Addme = (value) => {
    store.dispatch({
      type: "ADD_ITEM",
      value: value,
    });
  };

  return (
    <div className="main_div">
      <nav className="nav_tag">
        <div className="menu_input">
          <img
            className="logo_img"
            src="https://bacc.pk/wp-content/uploads/2020/07/57966-Converted.png"
            width="60"
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
          <Badge
            badgeContent={props.cartValue}
            id="cart_numbers"
            className="addCartNumbers"
            color="secondary"
          >
            <Tooltip title="Check Cart">
              <LocalGroceryStoreIcon
                className="mail_icon"
                onClick={() => {
                  history.push("./cart");
                }}
              />
            </Tooltip>
          </Badge>
        </div>
      </nav>
      <div className="cardscss">
        {JSONDATA.filter((val) => {
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
              <CardActions>
                <Button
                  id="add_cart_btn"
                  size="small"
                  color="primary"
                  onClick={() => Addme(val)}
                >
                  Add To Cart
                </Button>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartValue: state.cartValue,
  };
};

export default connect(mapStateToProps)(MediaCard);
