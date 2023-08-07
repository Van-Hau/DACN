export const setUser = (user: any) => {
    return {
        type: 'user/set',
        payload: user,
    };
};
export const getUser = () => {
    return {
        type: 'user/get',
    };
};
export const setPackage = (packageObject: any) => {
    return {
        type: 'package/set',
        payload: packageObject,
    };
};
export const getPackage = () => {
    return {
        type: 'package/get',
    };
};
