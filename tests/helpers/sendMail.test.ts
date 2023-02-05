import sendMail from "../../src/helpers/sendMail"

import nodemailer from 'nodemailer';
import { Status, TWishArrayInfo } from "../../src/validation/wish.validator";
describe("Mail Sending Test", () => {

    const mockTransporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.ETHEREAL_EMAIL,
            pass: process.env.ETHEREAL_PASS
        }
    });

    const mockWishArrayInfo: TWishArrayInfo = {
        currentIndex: 0,
        currentWish: {
            id: 1,

            username: "mock-user-1",
            content: "mock-wish-1",
            address: "mock-address-1",
            info: {
                status: Status.unfinished,
            }
        },
        wishes: [
            {
                id: 1,
                username: "mock-user-1",
                content: "mock-wish-1",
                address: "mock-address-1",
                info: {
                    status: Status.unfinished,
                }
            },
            {
                id: 2,
                username: "mock-user-2",
                content: "mock-wish-2",
                address: "mock-address-2",
                info: {
                    status: Status.unfinished,
                }
            },
        ]
    }

    test("test empty transporter", () => {
        expect(sendMail(null, mockWishArrayInfo)).toBe(false)
    })

    test("test empty address", () => {
        expect(sendMail(mockTransporter, {
            ...mockWishArrayInfo,
            currentWish: {
                ...mockWishArrayInfo.currentWish, address: "",
            }
        })).toBe(false)
    })

    test("test empty wish", () => {
        expect(sendMail(mockTransporter, {
            ...mockWishArrayInfo,
            currentWish: {
                ...mockWishArrayInfo.currentWish, content: "",
            }
        })).toBe(false)
    })

    test("test empty username", () => {
        expect(sendMail(mockTransporter, {
            ...mockWishArrayInfo,
            currentWish: {
                ...mockWishArrayInfo.currentWish, username: "",
            }
        })).toBe(false)
    })

    test("test wish with success status", () => {
        expect(sendMail(mockTransporter, {
            ...mockWishArrayInfo,
            currentWish: {
                ...mockWishArrayInfo.currentWish, info: { status: Status.success },
            }
        })).toBe(false)
    })

    test("test wish with pending status", () => {
        expect(sendMail(mockTransporter, {
            ...mockWishArrayInfo,
            currentWish: {
                ...mockWishArrayInfo.currentWish, info: { status: Status.pending },
            }
        })).toBe(false)
    })

    test("test empty wishes array", () => {
        expect(sendMail(mockTransporter,
            {
                ...mockWishArrayInfo,
                currentIndex: -1,
            })).toBe(false)
    })

    test("test wish index minus", () => {
        expect(sendMail(mockTransporter,
            {
                ...mockWishArrayInfo,
                wishes: []
            })).toBe(false)
    })
})