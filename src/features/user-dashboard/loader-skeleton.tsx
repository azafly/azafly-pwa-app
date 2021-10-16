import ContentLoader from 'react-content-loader';

export const ThreeDots = (props: any) => (
    <ContentLoader viewBox='0 0 400 160' height={160} width={400} backgroundColor='transparent' {...props}>
        <circle cx='150' cy='86' r='8' />
        <circle cx='194' cy='86' r='8' />
        <circle cx='238' cy='86' r='8' />
    </ContentLoader>
);

export const DashboardLoaderSkeleton = () => {
    return (
        <div>
            <ThreeDots />
            <ContentLoader height='100%' width='100%' viewBox='0 0 265 230'>
                <rect x='15' y='15' rx='4' ry='4' width='200' height='25' />
                <rect x='15' y='50' rx='2' ry='2' width='40' height='15' />
                <rect x='75' y='45' rx='16' ry='16' width='55' height='22' />
                <rect x='15' y='75' rx='3' ry='3' width='215' height='15' />
                <rect x='15' y='105' rx='3' ry='3' width='50' height='15' />
                <rect x='75' y='105' rx='3' ry='3' width='50' height='15' />
                <rect x='135' y='105' rx='3' ry='3' width='50' height='15' />
                <rect x='15' y='135' rx='16' ry='16' width='55' height='22' />
                <rect x='15' y='165' rx='2' ry='2' width='150' height='50' />
                <rect x='215' y='180' rx='2' ry='2' width='40' height='20' />
            </ContentLoader>
        </div>
    );
};
