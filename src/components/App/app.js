import React, { useCallback } from 'react';
import { array, func, shape, string } from 'prop-types';

import { useToasts } from '@magento/peregrine';
import { useApp } from '@magento/peregrine/lib/talons/App/useApp';

import globalCSS from '@magento/venia-ui/lib/index.css';
import { HeadProvider, Title } from '@magento/venia-ui/lib/components/Head';
import Main from '../Main';
import Mask from '@magento/venia-ui/lib/components/Mask';
import Navigation from '@magento/venia-ui/lib/components/Navigation';
import Routes from '@magento/venia-ui/lib/components/Routes';
import ToastContainer from '@magento/venia-ui/lib/components/ToastContainer';
import Icon from '@magento/venia-ui/lib/components/Icon';

import {
    AlertCircle as AlertCircleIcon,
    CloudOff as CloudOffIcon,
    Wifi as WifiIcon
} from 'react-feather';

const OnlineIcon = <Icon src={WifiIcon} attrs={{ width: 18 }} />;
const OfflineIcon = <Icon src={CloudOffIcon} attrs={{ width: 18 }} />;
const ErrorIcon = <Icon src={AlertCircleIcon} attrs={{ width: 18 }} />;

const ERROR_MESSAGE = 'Sorry! An unexpected error occurred.';

const App = props => {
    const { markErrorHandled, renderError, unhandledErrors } = props;

    const [, { addToast }] = useToasts();

    const handleIsOffline = useCallback(() => {
        addToast({
            type: 'error',
            icon: OfflineIcon,
            message: 'You are offline. Some features may be unavailable.',
            timeout: 3000
        });
    }, [addToast]);

    const handleIsOnline = useCallback(() => {
        addToast({
            type: 'info',
            icon: OnlineIcon,
            message: 'You are online.',
            timeout: 3000
        });
    }, [addToast]);

    const handleError = useCallback(
        (error, id, loc, handleDismissError) => {
            const errorToastProps = {
                icon: ErrorIcon,
                message: `${ERROR_MESSAGE}\nDebug: ${id} ${loc}`,
                onDismiss: remove => {
                    handleDismissError();
                    remove();
                },
                timeout: 15000,
                type: 'error'
            };

            addToast(errorToastProps);
        },
        [addToast]
    );

    const talonProps = useApp({
        handleError,
        handleIsOffline,
        handleIsOnline,
        markErrorHandled,
        renderError,
        unhandledErrors
    });

    const { hasOverlay, handleCloseDrawer } = talonProps;

    if (renderError) {
        return (
            <HeadProvider>
                <Title>{`Home Page - ${STORE_NAME}`}</Title>
                <Main isMasked={true} />
                <Mask isActive={true} />
                <ToastContainer />
            </HeadProvider>
        );
    }

    return (
        <HeadProvider>
            <Title>{`Home Page - ${STORE_NAME}`}</Title>
            <Main isMasked={hasOverlay}>
                <Routes />
            </Main>
            <Mask isActive={hasOverlay} dismiss={handleCloseDrawer} />
            <Navigation />
            <ToastContainer />
        </HeadProvider>
    );
};

App.propTypes = {
    markErrorHandled: func.isRequired,
    renderError: shape({
        stack: string
    }),
    unhandledErrors: array
};

App.globalCSS = globalCSS;

export default App;
