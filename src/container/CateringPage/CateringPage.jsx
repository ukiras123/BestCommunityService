import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import NavBar from "../../components/NavBar";
import { ClippedDrawer } from "../../components/Drawer";
import { ComplexGrid } from "../../components/ComplexGrid";
import CustomAppBar from "../../components/AppBar/CustomAppBar";

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
        price: "$19.99 / plate"
      },
      {
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
        price: "$35.99 / day"
      }
    ]
  },
  {
    type: "Choose From Cuisine",
    products: [
      {
        imgSrc:
          "https://c-lj.gnst.jp/public/article/detail/a/00/00/a0000769/img/basic/a0000769_main.jpg?20181226135958",
        header: "Japenese",
        subHeader: "From Top Chefs straight from Japan",
        description: [`Ramen`, `Sushi`, `Onigiri`, `Onigiri`, `Natto`],
        actionName: "Order Now",
        price: "$19.99 / plate"
      },
      {
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
        price: "$19.99 / plate"
      }
    ]
  }
];

function CateringPage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar isFixed="true" loggedInButtons="true" />
      <ClippedDrawer toSelect="Catering Service" />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        {items.map((item, index) => (
          <div key={index}>
            <CustomAppBar title={item.type} key={item.type} />
            {item.products.map((product, index) => (
              <ComplexGrid key={index} options={product} />
            ))}
            <br />
            <br />
          </div>
        ))}
      </main>
    </div>
  );
}

CateringPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CateringPage);
