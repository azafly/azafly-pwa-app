

import { HeroContainer } from './hero';
import { CardsContainer } from './cards';
import { QuestionsTabsConatiner } from './questions-tab'



import { useMainFAQStyle } from './classes';
import { NavBar } from 'components';



export const FAQ = () => {
    const classes = useMainFAQStyle()
    return (
        <>
            <NavBar />
            <div className={classes.faq__main}>
                <HeroContainer />
                <CardsContainer />
                <QuestionsTabsConatiner />
            </div>
        </>
    )
}

