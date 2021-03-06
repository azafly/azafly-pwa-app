import { NavBar } from 'components/nav-bar';
import { Svg404Component } from 'components/illustrations';

import { Button, Box } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { RootState } from 'app/store';
import { useSelector } from 'react-redux';

const Page404 = () => {
    const { isAuth } = useSelector((state: RootState) => state.auth);
    return (
        <>
            <Box marginBottom={15}>
                <NavBar />
            </Box>
            <Svg404Component
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100vw'
                }}
            />
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    width: '100vw',
                    marginBottom: 50
                }}
            >
                {isAuth ? (
                    <Link to='/dashboard' style={{ textDecoration: 'none' }}>
                        <Button
                            variant='contained'
                            color='primary'
                            size='large'
                            style={{
                                textDecoration: 'none',
                                width: '60vw'
                            }}
                        >
                            Go to Dashboard
                        </Button>
                    </Link>
                ) : (
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <Button
                            style={{
                                textDecoration: 'none',
                                width: '60vw'
                            }}
                            color='primary'
                            variant='contained'
                            size='large'
                        >
                            Go back Home
                        </Button>
                    </Link>
                )}
            </div>
        </>
    );
};

export default Page404;
