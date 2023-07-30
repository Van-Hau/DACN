export interface InitToast {
    open: boolean;
    message: string;
    severity: 'success' | 'error' | 'warning' | 'info';
}
