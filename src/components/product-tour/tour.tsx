import { ReactNode, useEffect, useState } from 'react';
import JoyRide from 'react-joyride';

interface TourProps {
    steps: Array<{
        target: string;
        content: ReactNode | string;
    }>;
    run?: boolean;
}
export const Tour = ({ steps, run = true }: TourProps) => {
    const [_, setStep] = useState<TourProps['steps']>();

    useEffect(() => setStep(steps), [steps]);
    return <JoyRide debug steps={steps} continuous showProgress locale={{ last: 'Done' }} scrollOffset={-20} />;
};
