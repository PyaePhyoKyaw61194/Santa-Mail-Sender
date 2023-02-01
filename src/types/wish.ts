export interface Wish {
    id: number,
    username: string,
    wish: string,
    address: string
    status: Status
}

export enum Status {
    unfinished = 1,
    pending = 2,
    failed = 3,
    success = 4
}

export interface MailData {
    username: string,
    wish: string,
    address: string
}

export interface WishArrayInfo {
    wishes: Wish[],
    currentIndex: number,
    currentWish: Wish
}

export interface ResponseData {
    username: string
}