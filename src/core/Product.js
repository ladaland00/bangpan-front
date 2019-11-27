
import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Typography,
  Grid,
  CssBaseline,
  makeStyles,
} from '@material-ui/core';
import {
  Button,
  FormGroup,
  Label,
} from 'reactstrap';
import Layout from "./Layout";
import { read } from "./apiCore";
import ShowImage from "./ShowImage";
import moment from "moment";
import { addItem, updateItem, removeItem } from "./apiCart";
import { isAuthenticated } from "../auth";

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4, 0, 3),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '400px',
    display: 'flexDirection',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

  cen: {
    align: 'center',

  },
}));

const cards = [1];

const Product = props => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const loadingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);

      }
    });
  };
  const addToCart = () => {
    if (isAuthenticated()) {
      if (isAuthenticated().user._id===product.ownername._id){
        alert("กำลังซื้อสินค้าตัวเอง");
      }
      else{
        if (product.status == 0) {
        addItem(product);
      }
      if (product.status == 1) {
        alert("สินค้ามีการจอง");
      }
      if (product.status == 2) {
        alert("สินค้าไม่มีอยู่ในระบบ");
      }
      }
      
    }
    else {
      alert("กรุณาเข้าสู่ระบบ");
    }

    window.location.reload(false);

  };
  useEffect(() => {
    const productId = props.match.params.productId;
    loadingleProduct(productId);
  }, []);


  const classes = useStyles();

  return (
    <React.Fragment className="">
      <Layout>
        <CssBaseline />
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="ms">
              <Typography component="h3" variant="h3" align="center" color="textPrimary" gutterBottom>
                {product.name}
              </Typography>

            </Container>
          </div>
          <Container className={classes.cardGrid} align="center" maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={5} alignItems="center" justify="center">
              {cards.map(card => (
                <Grid item key={card} xs={5} sm={5} md={5}>
                  <Card className={classes.card}>
                    <ShowImage item={product} url="products"
                    />
                  </Card>
                </Grid>
              ))}
            </Grid><FormGroup  >
              <Label for="discription">
              <h6>Description</h6>
                {product.description}
              </Label>
              <p className="Category">
                <h6>Category</h6>
          {product.category && product.category.name}
              </p>
              <p className="ownername">
              <h6>ownername: </h6>{product.ownername && product.ownername.username}
              </p>
              <text for="date">
                <br />
                Added on
                 {moment(product.createdAt).fromNow()}
              </text>
              <br />
              <br />
              <Button classname={classes.cen} color="info" href="/">Return to home</Button> {'  '}
              <Button onClick={addToCart} color="success" >Add to cart</Button>

            </FormGroup>
          </Container>
        </main>
      </Layout>
    </React.Fragment>
  );
}
export default Product;