export interface NewWorkspacePayload {
    name: string;
    description: string;
    idUserCreate?: number;
}
export interface ProjectPayload {
    workspaceId: number;
    projectName: string;
    projectDescription: string;
    listPackage: Array<any>;
}
export interface ClassPayload {
    packageId: number;
    className: string;
    classDescription: string;
}
export interface TaskPayload {
    idClass: number;
    name: string;
    description: string;
    priority: number;
    startAt: string;
    endAt: string;
    userWork: Array<any>;
    listFollower: Array<any>;
}
export interface SubTaskPayload {
    idClass: number;
    name: string;
    description: string;
    priority: number;
    startAt: string;
    endAt: string;
    userWork: Array<any>;
}
