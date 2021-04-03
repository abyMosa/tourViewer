

export interface DecodedToken extends User {
    iat: number;
}

export interface User {
    _id: string;
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    role: UserRole;
    registered: Date;
}


export enum UserRole {
    Admin = "Admin",
    Regular = "Regular",
}


export interface UserRegistrationFormData {
    title: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserLoginFormData {
    email: string;
    password: string;
}

export interface Tour {
    _id: string;
    name: string;
    image: string;
    url: string;
    user: string;
    createdAt: Date;
}

export interface AddTourForm {
    name: string;
    image: string;
    url: string;
    user: string;
}

export enum EventType {
    UploadStarted,
    PreparingFiles,
    S3signSuccessful,
    UploadingImage,
    UploadingTour,
    UpdatingRecords,
    UploadSucceeded,
    UploadFailed,
}






// 
export interface LocationState {
    from: LocationFrom;
}

// 
export interface LocationFrom {
    pathname: string;
}




