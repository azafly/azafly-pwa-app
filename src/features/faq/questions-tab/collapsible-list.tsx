import { FaqCollapisbleCard } from './collapsible-card'

interface CollapsibleListProps {
    articles: any[],

}

export const CollapsibleList = ({ articles }: CollapsibleListProps) => {
    return (
        <>
            {articles.map(({ content, title }) => <FaqCollapisbleCard title={title} content={content} />)}
        </>
    )
}
