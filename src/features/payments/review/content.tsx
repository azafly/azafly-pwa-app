import { Button } from '@mui/material';
import { CSSProperties } from '@material-ui/styles';
import { memo } from 'react';
import { styled } from '@mui/system';
import { ThreeDots } from 'components/css-loaders/three-dots';
import { Zoom, Box, Avatar } from '@material-ui/core';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const FlexContainer = styled('div')`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 4px;
    padding: 8px 0;
    border-bottom: 1px solid black;
    width: 100%;
`;

const style = {
    width: 400,
    bgcolor: 'white',
    borderRadius: 2,
    margin: '10px',
    p: 2,
    px: 4,
    pb: 3
};

const boldText = {
    fontWeight: 'bold'
};

interface ReviewComponentsProps {
    open: boolean;
    apiFetchState: any;
    timeOut: number;
    paymentIntentPayload: any;
    getPaymentLink: () => Promise<void>;
    totalPriceToPay?: string;
    handleCloseDispatcher: any;
    styles?: CSSProperties;
}
export const ReviewContent = memo(function ReviewContent({
    apiFetchState,
    open,
    paymentIntentPayload,
    totalPriceToPay,
    getPaymentLink,
    timeOut,
    handleCloseDispatcher,
    styles
}: ReviewComponentsProps) {
    const updatedStyles = styles ? { ...style, ...styles } : style;
    return (
        <Zoom in={open} mountOnEnter unmountOnExit appear timeout={timeOut}>
            <Box sx={updatedStyles} className='hh'>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '6px' }}>
                    <div>
                        <Avatar
                            style={{
                                width: '50px',
                                height: '50px',
                                borderRadius: '50%',
                                marginRight: '1ch',
                                background: 'white',
                                border: '5px solid #4990A4'
                            }}
                        >
                            <ReceiptLongIcon sx={{ color: '#4990A4' }} />
                        </Avatar>
                    </div>
                    <div>
                        <h2 id='review-modal' style={{ margin: '0' }}>
                            Confirm Payment Details
                        </h2>
                        <p id='payment-review' style={{ margin: '0' }}>
                            Please confirm details of your transaction
                        </p>
                    </div>
                </div>

                <div style={{ margin: '20px 0' }}>
                    <FlexContainer>
                        <Box sx={boldText}>Name</Box>
                        <div style={{ textTransform: 'capitalize', textAlign: 'right' }}>{paymentIntentPayload?.name}</div>
                    </FlexContainer>
                    <FlexContainer>
                        <Box sx={boldText}>Purpose</Box>
                        <div style={{ textTransform: 'capitalize', textAlign: 'right' }}>{paymentIntentPayload?.purpose}</div>
                    </FlexContainer>
                    <FlexContainer>
                        <Box sx={boldText}>Reference</Box>
                        <div style={{ textTransform: 'capitalize', textAlign: 'right' }}>{paymentIntentPayload?.references}</div>
                    </FlexContainer>
                    {paymentIntentPayload?.fileUrl && (
                        <FlexContainer>
                            <Box sx={boldText}>Uploaded Document</Box>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <img style={{ objectFit: 'cover', maxWidth: '150px', maxHeight: '150px' }} src={paymentIntentPayload?.fileUrl} />
                            </div>
                        </FlexContainer>
                    )}
                </div>

                <div style={{ textAlign: 'center', fontSize: '150%', marginTop: '10px', fontWeight: 'bold' }}>Total: {totalPriceToPay}</div>

                {apiFetchState?.loading ? (
                    <ThreeDots variantColor={'base'} loadingText={'creating offer'} />
                ) : (
                    <Button
                        style={{ width: '100%', backgroundColor: '#4990a4', color: '#fff', marginTop: '10px' }}
                        onClick={getPaymentLink}
                        color={'success'}
                    >
                        Confirm
                    </Button>
                )}

                <div style={{ display: 'flex', justifyContent: 'center', textAlign: 'center' }}>
                    <Button onClick={handleCloseDispatcher} color={'error'}>
                        Cancel, and go back
                    </Button>
                </div>
            </Box>
        </Zoom>
    );
});
