export const listMenu = ['Trang Chủ', 'Sản Phẩm', 'Công Ty', 'Bảo Trì', 'Giải Pháp', 'Hướng Dẫn'];
export const classesSignPage = {
    container: {
        position: 'relative',
        width: '70%',
        height: '80%',
        background: '#fff',
        borderRadius: '15px',
        overflow: 'hidden',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.3), 4px 20px 0 rgba(0,0,0,0.3)',
        '&.sign-up-mode::before': {
            transform: 'translateX(-5%)',
        },
        '&.sign-up-mode .right-panel img,&.sign-up-mode .right-panel>div': {
            transform: 'translateX(200%)',
        },
        '&.sign-up-mode .left-panel img,&.sign-up-mode .left-panel>div': {
            transform: 'translateX(0)',
        },
        '&.sign-up-mode form:first-of-type': {
            opacity: '0',
        },
        '&.sign-up-mode form:last-of-type': {
            opacity: '1',
        },
        '&.sign-up-mode .right-panel': {
            pointerEvents: 'none',
        },
        '&.sign-up-mode .left-panel': {
            pointerEvents: 'all',
        },
        '& button:hover': {
            color: '#000 !important',
            background: '#fff !important',
            fontWeight: '600',
        },
        '&::before': {
            content: "''",
            position: 'absolute',
            top: '0',
            left: '-50%',
            transform: 'translateX(100%)',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(-45deg,#df3adf,#520852)',
            zIndex: 6,
            transition: '1s ease-in-out',
        },
    },
    formContainer: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: 5,
        '& form': {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '40%',
            minWidth: '238px',
            padding: '0 10px',
        },
        '& form:first-of-type': {
            opacity: '1',
            transition: '0.5s ease-in-out',
            transitionDelay: '1s',
            gap: '15px',
            transform: 'translateX(7.5%)',
        },
        '& form:last-of-type': {
            opacity: '0',
            transition: '0.5s ease-in-out',
            transitionDelay: '0.5s',
            gap: '10px',
            width: '50%',
        },
        '& form .account-text': {
            display: 'none',
        },
        '& h2': {
            fontSize: '35px',
            color: '#000',
            fontWeight: '600',

            marginBottom: '20px',
        },
        '& button': {
            marginTop: '15px',
            padding: '5px 30px',
        },
        '& a': {
            color: '#002dff',
        },
        '& a:hover': {
            color: '#ff0000',
        },
        '& label': {
            fontSize: '14px',
        },
        '& svg': {
            color: '#000',
        },
        '& .MuiFormControl-root': {
            margin: '0',
        },
        '& input': {
            padding: '16.5px 14px',
            borderRadius: '30px',
        },
    },
    panel: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        '& .panel': {
            zIndex: 6,
            alignItems: 'center',
            justifyContent: 'center',
            width: '35%',
            textAlign: 'center',
            gap: '30px',
        },
        '& .panel>div:first-of-type': {
            color: '#fff',
            transition: '1.1s ease-in-out',
            transitionDelay: '0.5s',
        },
        '& .panel h3': {
            fontSize: '24px',
            fontWeight: '600',
        },
        '& .panel button': {
            color: '#fff',
            background: '#000',
        },
        '& .panel p': {
            fontSize: '15px',
            padding: '10px 0',
        },
        '& img': {
            width: '100%',
            transition: '1.1s ease-in-out',
            transitionDelay: '0.4s',
        },
        '& a': {
            color: '#113cff',
        },
        '& a:hover': {
            color: '#ff0000',
        },
        '& .left-panel': {
            pointerEvents: 'none',
            transform: 'translate(-7.5%)',
        },
        '& .left-panel img,& .left-panel>div': {
            transform: 'translateX(-200%)',
        },
        '& .right-panel img,& .right-panel>div': {
            transform: 'translateX(0)',
        },
    },
    tablet: {
        height: '100vh',
        '& .container': {
            width: '100%',
            height: '100%',
        },
    },
    mobile: {
        '& .container::before': {
            display: 'none',
        },
        '& form': {
            width: '80% !important',
        },
        '& form .account-text': {
            display: 'flex',
        },
        '& form:last-of-type': {
            display: 'none',
        },
        '& form:first-of-type': {
            transform: 'translateX(0)',
        },
        '& .container.sign-up-mode2 form:last-of-type': {
            display: 'flex',
            opacity: '1',
        },
        '& .container.sign-up-mode2 form:first-of-type': {
            display: 'none',
        },
        '& .container>div:last-of-type': {
            display: 'none',
        },
    },
};
