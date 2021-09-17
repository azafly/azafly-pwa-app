import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
import { PropsWithChildren } from 'react';
import { motion } from 'framer-motion';



interface MenuListItemProps {
    text: string
    children: any
    onClick?: () => void,
    variant?: any
}

const variants = {
    open: {
        y: 0,
        opacity: 1,
        transition: {
            y: { stiffness: 1000, velocity: -100 }
        }
    },
    closed: {
        y: 50,
        opacity: 0,
        transition: {
            y: { stiffness: 1000 }
        }
    }
};

export const MenuListItem = ({ text, children, onClick }: PropsWithChildren<MenuListItemProps>) => {

    return (
        <ListItem
            variants={variants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            component={motion.li}

            button key={text} onClick={onClick}>
            <ListItemIcon>{children}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>

    )
}
