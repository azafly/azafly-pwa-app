import { GoogleAddressAutoComplete } from 'components';
import { Dispatch } from 'app/store';
import { useDispatch } from 'react-redux';

export const Address = () => {
    const dispatch = useDispatch<Dispatch>();
    const reduxSetAddressValue = dispatch.onboarding.setAddress;
    return (
        <>
            <GoogleAddressAutoComplete reduxSetAddressValue={reduxSetAddressValue} />
        </>
    );
};
