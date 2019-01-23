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
    type: "Garden Items",
    products: [
      {
        imgSrc:
          "https://images.homedepot-static.com/productImages/2c112fa6-251f-4c83-ad4f-c89f25af3417/svn/true-temper-wheelbarrows-c6orut14-64_1000.jpg",
        header: "True Temper",
        subHeader: "6 cu. ft. Wheelbarrow with Steel ",
        description: [
          `Rated highly for durability and value (see reviews)`,
          `Low maintenance flat-free tire and steel handles`,
          `Includes all hardware and parts for straightforward assembly`
        ],
        actionName: "RentNow",
        price: "$19.99 / day"
      },
      {
        imgSrc:
          "https://images.homedepot-static.com/productImages/549c9e56-1e17-4e23-9c7a-62274702346a/svn/honda-self-propelled-lawn-mowers-hrr216vka-64_1000.jpg",
        header: "Honda",
        subHeader: "Self Propelled Lawn Mower ",
        description: [
          `Switch from bagging to mulching without tools or attachments`,
          `Reliable Honda GCV160 engine delivers years of peak performance`,
          `Twin blades for superior cut quality, mulching and bagging`
        ],
        actionName: "RentNow",
        price: "$35.99 / day"
      }
    ]
  },
  {
    type: "Home Items",
    products: [
      {
        imgSrc:
          "https://images.homedepot-static.com/productImages/46731104-51b3-444c-902a-7aaa70846734/svn/apollo-homeowners-tool-sets-dt9408-64_1000.jpg",
        header: "Apolo",
        subHeader: "Household Tool Kit",
        description: [
          `Ideal kit for most household projects`,
          `Tools are heat-treated and chrome-plated for lasting durability`,
          `Includes pliers, wrenches, screwdrivers, bit driver and bits`
        ],
        actionName: "RentNow",
        price: "$9.99 / day"
      },
      {
        imgSrc:
          "https://images.homedepot-static.com/productImages/8f40448a-0ad4-4ff4-8669-9eb1099e7bbd/svn/american-builder-homeowners-tool-sets-hw4208-24-64_1000.jpg",
        header: "American Builder",
        subHeader: "Home Owner Tool Set ",
        description: [
          `1 flat head screwdrive`,
          `Philips head screwdriver`,
          `4.5 in. nose pliers`,
          `Claw hammer`,
          `Tweezers and screwdriver`,
          `Includes a measuring tape`,
          `Comes in a compact handy plastic storage case`
        ],
        actionName: "RentNow",
        price: "$14.99 / day"
      }
    ]
  }
];


function RentPage(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <NavBar isFixed="true" loggedInButtons="true" />
      <ClippedDrawer toSelect="Rent Equipments" />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        {items.map((item, index) => (
          <div key={index}>
            <CustomAppBar title={item.type} key={item.type}/>
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

RentPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(RentPage);
