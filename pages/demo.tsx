import { Button } from '@mui/material';
import * as React from 'react';
import { userApi } from '../api-client';

export interface IAppProps {}

export default function Demo(props: IAppProps) {
    const h = async () => {
        const formData = new FormData();
        formData.append('ben', 'ben');
        const { data } = await userApi.demo(formData);
    };
    return (
        <div>
            <Button variant="contained" onClick={h}>
                Hello World
            </Button>
        </div>
    );
}
