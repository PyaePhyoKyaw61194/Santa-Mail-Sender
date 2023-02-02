export interface Wish {
    id: number,
    username: string,
    wish: string,
    address: string
    status: Status
}

export enum Status {
    unfinished = 'unfinished',
    pending = 'pending',
    failed = 'failed',
    success = 'success'
}

/* export interface MailData {
    username: string,
    wish: string,
    address: string
} */

export interface WishArrayInfo {
    wishes: Wish[],
    currentIndex: number,
    currentWish: Wish
}

export interface WishReqData {
    username: string,
    wish: string,
}

export interface WishResponseData {
    username: string
}

export interface Profile {
    userUid: string,
    address: string,
    birthdate: string
}

export interface User {
    username: string,
    uid: string,
}