import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";


import { PriceCard } from './card';


const priceList = [
    {
        price: 100,
        heading: "International Payments",
        paragraph: "",
        offers: [

        ]
    },
    {
        price: 200,
        heading: "Immigration consultation",
        paragraph: "",
        actionText: "Consult for Free",
    },
    {
        price: 2200,
        heading: "Explore the world",
        paragraph: "",
    },
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            overflowX: "hidden",
            [theme.breakpoints.only("xs")]: {
                padding: "4px 0px 40px 0px",
            },
        },
        titleWrapper: {
            color: theme.colors.textPrimary,
            "& p": {
                fontWeight: 175,
            },
        },
        title: {
            textAlign: "center",
            fontWeight: 800,
            color: theme.colors.textPrimary,
            fontFamily: "Nunito",
            fontSize: 40,
            [theme.breakpoints.only("xs")]: {
                fontSize: 30,
            },
        },
        subText: {
            textAlign: "center",
            color: theme.palette.text.primary,
            fontWeight: 500,
            padding: 10,
        },
        bgIllustration: {
            position: "absolute",
            left: 0,
            top: -100,
            height: "100%",
            pointerEvents: "none",
            opacity: 0.8,
            [theme.breakpoints.only("xs")]: {
                left: -50,
                top: -100,
                height: 500,
            },
        },
        bgIllustration2: {
            position: "absolute",
            right: -80,
            top: -150,
            height: "100%",
            opacity: 0.3,
            pointerEvents: "none",
            [theme.breakpoints.only("xs")]: {
                display: "none",
            },
        },
        priceCardContainer: {
            width: "86vw",
            margin: "auto",
            marginTop: 50,
        },
        priceCard: {
            height: 300,
            margin: "auto",
            fontFamily: "Nunito",
        },
    })
);

export function PriceCardList() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className={classes.titleWrapper}>

            </div>
            <div className={classes.priceCardContainer}>
                <Grid
                    container
                    justify={"space-around"}
                    spacing={3}
                    className={classes.priceCardContainer}
                >
                    {priceList.map(
                        ({
                            price,
                            heading,
                            paragraph,
                        }) => {
                            return (
                                <Grid item xs={12} sm={4} key={price}>
                                    <PriceCard
                                        price={price}
                                        heading={heading}
                                        paragraph={paragraph}
                                    />
                                </Grid>
                            );
                        }
                    )}
                </Grid>
            </div>
        </div>
    );
}
