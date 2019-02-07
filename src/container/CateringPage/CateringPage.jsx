import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "../../components/NavBar";
import { ClippedDrawer } from "../../components/Drawer";
import { ComplexGrid } from "../../components/ComplexGrid";
import CustomAppBar from "../../components/AppBar/CustomAppBar";
import { types } from "../../_helpers/const";
import { cateringActions } from "../../redux/actions";
import { connect } from "react-redux";
import { compose } from "redux";
const { CATERING } = types;

const styles = theme => ({
  root: {
    display: "flex"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  toolbar: theme.mixins.toolbar
});
const items = [
  {
    type: "Wedding Party - Buffet",
    products: [
      {
        id: 201,
        type: CATERING,
        imgSrc:
          "https://i.pinimg.com/originals/91/4f/be/914fbec58e0d909b93e3647ba027eb2e.jpg",
        header: "Indian Buffet [Special Fruits]",
        subHeader: "From appitizer to meal to dessert",
        description: [
          `Tandoori chicken`,
          `Samosas`,
          `Chicken tikka masala`,
          `Chicken tikka masala`,
          `Lamb Curry`,
          `Fruits`
        ],
        actionName: "Order Now",
        priceText: "$19.99 / person",
        price: 19.99
      },
      {
        id: 202,
        type: CATERING,
        imgSrc:
          "http://www.fuzen.co.uk/static1.squarespace.com/static/5345019de4b0cae7ecd4a16a/t/534514a3e4b0fb5fdfb8fcd6/1397036196930/IMG_4064.jpg",
        header: "In House Buffet",
        subHeader: "From East to West",
        description: [
          `Stuffed endive with Roquefort cheese, topped with chopped walnuts`,
          `Roasted new potatoes with dill cream and golden caviar`,
          `Smoked salmon canapes topped with capers and fresh dill
          `,
          `Pasta station (ravioli with roasted red-pepper sauce; bow tie pasta with Gorgonzola cream sauce)
          `
        ],
        actionName: "Order Now",
        priceText: "$35.99 / person",
        price: 35.99
      }
    ]
  },
  {
    type: "Choose From Cuisine",
    products: [
      {
        id: 203,
        type: CATERING,
        imgSrc:
          "https://c-lj.gnst.jp/public/article/detail/a/00/00/a0000769/img/basic/a0000769_main.jpg?20181226135958",
        header: "Japenese",
        subHeader: "From Top Chefs straight from Japan",
        description: [`Ramen`, `Sushi`, `Onigiri`, `Onigiri`, `Natto`],
        actionName: "Order Now",
        priceText: "$19.99 / person",
        price: 19.99
      },
      {
        id: 204,
        type: CATERING,
        imgSrc: "https://i.imgur.com/bcSgaWJ.jpg",
        header: "Chinese",
        subHeader: "Stright from Chinese Market",
        description: [
          `Kung Pao Chicken`,
          `Ma Po Tofu`,
          `Dumplings`,
          `Peking Roasted Duck`,
          `Spring Rolls          `
        ],
        actionName: "Order Now",
        priceText: "$19.99 / person",
        price: 19.99
      }
    ]
  }
];

class CateringPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.drawerHandle = this.drawerHandle.bind(this);
  }

  drawerHandle() {
    const trueFalse = this.state.open ? false : true;
    this.setState({ open: trueFalse });
  }

  handleAdd = detail => {
    const { dispatch } = this.props;
    if (detail) {
      dispatch(cateringActions.addACatering(detail));
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <NavBar
          isFixed="true"
          handleDrawerOpen={this.drawerHandle}
          loggedInButtons="true"
        />
        <ClippedDrawer toSelect="Catering Service" show={this.state.open} />

        <main className={classes.content}>
          <div className={classes.toolbar} />

          {items.map((item, index) => (
            <div key={index}>
              <CustomAppBar title={item.type} key={item.type} />
              {item.products.map((product, index) => (
                <ComplexGrid
                  number={index + 1}
                  key={index}
                  options={product}
                  handleAdd={this.handleAdd}
                />
              ))}
              <br />
              <br />
            </div>
          ))}
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  const { alert } = state;
  return {
    registering,
    alert
  };
}

CateringPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(mapStateToProps)
)(CateringPage);
