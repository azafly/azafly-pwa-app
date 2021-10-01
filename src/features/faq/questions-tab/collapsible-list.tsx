import { FaqCollapsibleCard } from './collapsible-card';

interface CollapsibleListProps {
    articles: any[];
}

export const CollapsibleList = ({ articles }: CollapsibleListProps) => {
    return (
        <>
            {articles.map(({ content, title }) => (
                <FaqCollapsibleCard title={title} content={content} />
            ))}
        </>
    );
};
