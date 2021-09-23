import { PropsWithChildren, ReactElement } from 'react'
import { motion, AnimatePresence } from "framer-motion";
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useMediaQuery } from '@material-ui/core'

import { ArrowDownSvgComponent, ArrowUpSvgComponent } from 'components/icons'


interface AccordionProps {
    index: any
    expanded: any
    setExpanded: (arg: any) => void
    openedColor?: string
    closedColor?: string,
    headerIcon?: ReactElement,
    title: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        header: {
            display: 'flex',
            padding: 5,
            justifyContent: 'space-between',
            opacity: 0.9,
            flexGrow: 1,
            borderRadius: 10,
            color: 'white',
            cursor: 'pointer',
            height: 50,
            boxShadow: '0 10px 18px rgba(0,0,0,0.2)',
            width: '80%',
            maxWidth: 500,
            [theme.breakpoints.only('xs')]: {
                width: '100%',
                margin: '5px auto'
            }
        },
        icon: {
            alignSelf: 'flex-start',
            '& svg': {
                padding: 5,
                height: 40,
                width: 40,
            },

        },
        typography: {
            color: theme.colors.textPrimary,
            paddingTop: 5,
            fontWeight: 600,
            margin: 'auto',
            display: 'flex',
            textAlign: 'left',
            width: '65%',
            paddingLeft: 50,
            fontSize: '0.95em',
            [theme.breakpoints.only('xs')]: {
                paddingLeft: 30,
            }
        },
        arrow: {
            opacity: 0.4,
            paddingTop: 5,
        },
        section: {
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center'
        },

    })
);


const computeAnimations = ({ isOpen, isMobileScreen }: any) => ({
    margin: isOpen ? '10px auto' : '20px auto',
    padding: isOpen ? 10 : 5,

})

export const Accordion = ({ index, expanded, setExpanded, headerIcon, title, children }: PropsWithChildren<AccordionProps>) => {
    const isOpen = index === expanded;
    const classes = useStyles()

    const isMobileScreen = useMediaQuery('(max-width:500px)');
    const animations = computeAnimations({ isOpen, isMobileScreen })

    return (
        <>
            <motion.header
                initial={false}
                animate={animations}
                onClick={() => setExpanded(isOpen ? false : index)}
                className={classes.header}
            >
                <div className={classes.icon}>{headerIcon} </div> <span className={classes.typography} color='primary'>{title}</span> {isOpen ? <ArrowUpSvgComponent className={classes.arrow} /> : <ArrowDownSvgComponent className={classes.arrow} />}
            </motion.header>
            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.section
                        key="content"
                        initial="collapsed"
                        animate="open"
                        exit="collapsed"
                        variants={{
                            open: { opacity: 1, height: "auto" },
                            collapsed: { opacity: 0, height: 0 }
                        }}
                        transition={{ duration: 0.4, ease: [0.04, 0.12, 0.23, 0.18] }}
                        className={classes.section}
                    >
                        {children}
                    </motion.section>
                )}
            </AnimatePresence>
        </>
    )
}


