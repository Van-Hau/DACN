const initState: any = {
    userLogin: {},
    packageObject: {},
};
const homeReducer = (state = initState, action: any) => {
    switch (action.type) {
        case 'user/set':
            return {
                ...state,
                userLogin: action.payload,
            };
        case 'package/set':
            return {
                ...state,
                packageObject: action.payload,
            };
        case 'user/get':
            return state;
        case 'package/get':
            return state.package;
        default:
            return state;
    }
};
export default homeReducer;
