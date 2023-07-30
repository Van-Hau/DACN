import { Alert, Snackbar, Stack } from '@mui/material';
import React from 'react';
import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { StylesProvider, createGenerateClassName } from '@mui/styles';
import { classesSignPage } from 'mocks';
import LoginComponent from '@/components/login/login';
import WindowSignUpComponent from '@/components/sign-up/window-sign-up';
import SignUpComponent from '@/components/sign-up/sign-up';
import { InitToast } from '@/models/toast';
import ToastComponent from '@/components/common/toast';
const generateClassName = createGenerateClassName({
    productionPrefix: 'c',
});

export interface ILoginPageProps {}

export default function LoginPage(props: ILoginPageProps) {
    const [singUp, setSingUp] = useState<'sign-up-mode' | ''>('');
    const [singUp2, setSignUp2] = useState<'sign-up-mode2' | ''>('');
    const [toast, setToast] = useState<InitToast>({
        open: false,
        message: '',
        severity: 'success',
    });

    const isTablet = useMediaQuery({
        query: '(max-width: 1224px)',
    });

    const isMobile = useMediaQuery({
        query: '(max-width: 786px)',
    });
    return (
        <StylesProvider generateClassName={generateClassName} injectFirst>
            <Stack
                sx={[
                    {
                        width: '100vw',
                        height: '100vh',
                        justifyContent: 'center',
                        alignItems: 'center',
                    },
                    isMobile
                        ? classesSignPage.mobile
                        : isTablet
                        ? classesSignPage.tablet
                        : classesSignPage.tablet,
                ]}
            >
                <Stack className={`container ${singUp} ${singUp2}`} sx={classesSignPage.container}>
                    <Stack sx={classesSignPage.formContainer}>
                        <LoginComponent setSignUp2={setSignUp2} setToast={setToast} />
                        <SignUpComponent
                            setSignUp2={setSignUp2}
                            setToast={setToast}
                            setSingUp={setSingUp}
                        />
                    </Stack>

                    <WindowSignUpComponent setSingUp={setSingUp} />
                </Stack>
            </Stack>
            <ToastComponent setToast={setToast} toast={toast} />
        </StylesProvider>
    );
}
