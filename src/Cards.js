import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import JSONDATA from './MOCK-JSON-DATA.json';
import Badge from '@material-ui/core/Badge';
import DeleteIcon from '@material-ui/icons/Delete';


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

export default function MediaCard() {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [cartNumber, setCartNumber] = useState(0);

  const myCartFunction = (e) => {
      setCartNumber(cartNumber + 1);
  }

  const clearFunction = () => {
      setCartNumber(0);
  }

  return (
      <div className="main_div" >
      <nav className="nav_tag" >
      <div className="menu_input" >
        <MenuIcon className="menu_icon" />
        <input type="text" className="input_tag" placeholder="search...." onChange={(event) => {
            setSearchTerm(event.target.value)
        }} /> 
        </div>
        <div className="cls_mail" >
        <DeleteIcon className="del_icon" onClick={clearFunction} />
        <Badge badgeContent={cartNumber} id="cart_numbers" className="addCartNumbers" color="secondary">
                <MailIcon className="mail_icon" />
              </Badge>
              </div>
      </nav>
      <div className="cardscss" >
     { JSONDATA.filter((val) => {
        if (searchTerm == "") {
            return val
        } else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
        } else if (val.description.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val
        }
    }).map((val, key) => {
        return <Card className={classes.root}>
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
            <Typography variant="body2" color="textSecondary" component="p">
              {val.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button id="add_cart_btn" size="small" color="primary" onClick={myCartFunction}>
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    })}
    </div>
    </div>
  );
}
