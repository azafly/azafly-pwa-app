import { Button } from '@material-ui/core';
import { ErrorIcon } from 'components/icons/error';

const ErrorPage = () => {
    return (
        <div style={{ display: 'grid', width: '100vw', height: '100vh' }}>
            <div
                style={{
                    margin: 'auto',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    height: '100%'
                }}
            >
                <ErrorIcon />
                <h1 style={{ fontSize: '60px', color: '#4990a4', margin: '0' }}>Oops!</h1>
                <p style={{ marginBottom: '30px' }}>An error just occured</p>

                <a href='#' style={{ textDecoration: 'none' }}>
                    <Button
                        variant='contained'
                        color='secondary'
                        size='large'
                        style={{
                            textDecoration: 'none',
                            width: '300px'
                        }}
                    >
                        Go to Dashboard
                    </Button>
                </a>
            </div>
        </div>
    );
};

export default ErrorPage;
