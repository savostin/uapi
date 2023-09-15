
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum UserStatus {
    CREATED = "CREATED",
    ACTIVE = "ACTIVE",
    DISABLED = "DISABLED"
}

export enum GetUsersOrder {
    lastNameAsc = "lastNameAsc",
    updatedAtAsc = "updatedAtAsc",
    updatedAtDesc = "updatedAtDesc"
}

export class CreateUserInput {
    firstName: string;
    lastName: string;
    email: string;
}

export class UpdateUserInput {
    id: string;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
}

export class GetUsersInput {
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    status?: Nullable<UserStatus>;
    orderBy?: Nullable<GetUsersOrder>;
    skip?: Nullable<number>;
    return?: Nullable<number>;
}

export class User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    status: UserStatus;
}

export abstract class IQuery {
    listUsers?: Nullable<Nullable<User>[]>;
    getUser?: Nullable<User>;
}

export abstract class IMutation {
    createUser?: User;
    updateUser?: User;
}

type Nullable<T> = T | null;
