import { ReactNode, useEffect, useState } from 'react';
import JoyRide, { Step } from 'react-joyride';

interface TourProps {
    steps: Array<{
        target: string;
        content: ReactNode | string;
    }>;
    run?: boolean;
}
export const Tour = ({ steps, run = true }: TourProps) => {
    const [_, setStep] = useState<TourProps['steps']>();

    const formattedSteps = steps.map(step => ({ ...step, placement: 'bottom' as Step['placement'], textAlign: 'center' }));

    const debug = process.env.NODE_ENV !== 'production';
    useEffect(() => setStep(steps), [steps]);
    return <JoyRide debug={debug} showSkipButton={true} steps={formattedSteps} continuous showProgress disableScrolling locale={{ last: 'Done' }} />;
};
