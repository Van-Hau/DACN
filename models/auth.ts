export interface LoginPayload {
    email: string;
    password: string;
}

export interface RegisterPayload {
    company: string;
    district: string;
    email: string;
    password: string;
    positionWord: string;
    scale: number;
    username: string;
    phone: string;
    frontendUrl: string;
}
export interface VerifyPayload {
    id: number;
    verifyCode: string;
}
export interface ChangePassByAdmin {
    UserId: string;
    NewPassword: string;
}
