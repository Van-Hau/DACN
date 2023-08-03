export interface NewMemberPayload {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    position: string;
    district: string;
}
export interface UpdatePayload {
    fullName: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
    address: string;
    position: string;
    district: string;
}

export interface UserModel {
    id?: number;
    avatar: string;
    company: string;
    district: string;
    email: string;
    fullName: string;
    phone: string;
    positionWork: string;
    scaleWork: number;
    userOwnerId: string;
    role: string;
    address: string;
}
