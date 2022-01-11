import { ReactNode, useEffect, useState } from 'react';
import JoyRide, { Step } from 'react-joyride';

interface TourProps {
    steps: Array<{
        target: string;
        content: ReactNode | string;
    }>;
    runTour?: boolean;
}
export const Tour = ({ steps, runTour = true }: TourProps) => {
    const [_, setStep] = useState<TourProps['steps']>();

    const formattedSteps = steps.map(step => ({ ...step, placement: 'bottom' as Step['placement'], textAlign: 'center' }));

    const debug = process.env.REACT_APP_NODE_ENVIRONMENT !== 'production';
    useEffect(() => setStep(steps), [steps]);
    return (
        <JoyRide
            debug={debug}
            showSkipButton={true}
            run={runTour}
            steps={formattedSteps}
            continuous
            showProgress
            disableScrolling
            locale={{ last: 'Done' }}
        />
    );
};
