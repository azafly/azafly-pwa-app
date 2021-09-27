import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

export function FadeInWhenVisible({ children }: any) {
    const controls = useAnimation();
    const [ref, inView] = useInView();

    useEffect(() => {
        if (inView) {
            controls.start('visible');
        }
    }, [controls, inView]);

    return (
        <motion.div
            ref={ref}
            animate={controls}
            initial='hidden'
            transition={{
                delay: 0.1,
                decelerate: 20,
                x: { type: 'spring', stiffness: 10 },
                default: { duration: 0.7 },
                when: 'beforeChildren',
                staggerDirection: -1
            }}
            variants={{
                visible: { x: 0, opacity: 1 },
                hidden: { x: 100, opacity: 0 }
            }}
        >
            {children}
        </motion.div>
    );
}
