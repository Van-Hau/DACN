import React, { useState, useRef, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { minHeight } from '@mui/system';
import { Stack, Button, CircularProgress } from '@mui/material';

// import JoditEditor from 'jodit-react';
interface RichTextProps {
    isSave?: boolean;
    onChange?: any;
    setIsEditDescripton?: any;
    value?: string;
    style?: any;
    description?: any;
    class?: string;
}

const JoditEditor = dynamic(() => import('jodit-react'), {
    ssr: false,
    loading: () => <div></div>,
});

import styles from './styles.module.css';

export default function RichText(props: RichTextProps) {
    const { isSave, style, value, description, onChange, setIsEditDescripton } = props;
    const [isLoading, setIsLoading] = useState(false);
    const submitDescription = () => {
        setIsEditDescripton();
    };

    let text = '';

    const config: any = {
        readonly: false,
        // autofocus: false,
        enter: 'br',
        zIndex: 0,
        activeButtonsInReadOnly: ['source', 'fullsize', 'print', 'about'],
        toolbarButtonSize: 'middle',
        theme: 'default',
        enableDragAndDropFileToEditor: true,
        saveModeInCookie: false,
        spellcheck: true,
        editorCssClass: false,
        triggerChangeEvent: true,
        height: 220,
        direction: 'ltr',
        language: 'vi',
        debugLanguage: true,
        tabIndex: -1,
        toolbar: true,
        useSplitMode: false,
        colorPickerDefaultTab: 'background',
        imageDefaultWidth: 100,
        removeButtons: [
            'source',
            'fullsize',
            'about',
            'outdent',
            'indent',
            'video',
            'print',
            'table',
            'fontsize',
            'superscript',
            'subscript',
            'Insert link',
            'file',
            'cut',
            'selectall',
        ],
        disablePlugins: ['Line height'],
        events: {},
        textIcons: false,
        uploader: {
            insertImageAsBase64URI: true,
        },
        placeholder: '',
        showXPathInStatusbar: false,
    };

    useEffect(() => {
        if (typeof window == 'undefined') {
            setIsLoading(true);
        }
        setIsLoading(false);

        return () => {};
    }, [isLoading]);

    if (isLoading) return <></>;
    return (
        <Stack
            sx={style}
            justifyContent={'center'}
            alignItems={'flex-end'}
            className={
                props.class === 'meeting'
                    ? styles.meeting
                    : props.class === 'meeting-info'
                    ? styles.meetinginfo
                    : styles.root
            }
        >
            {/* <input type="text" ref={rt} style={{ display: 'none' }} /> */}

            <JoditEditor
                config={config}
                value={description}
                // onChange={(newContent) => onChange(newContent)}
                // tabIndex={1}
                onBlur={(newContent) => onChange(newContent)}
            />
        </Stack>
    );
}
