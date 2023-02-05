import nodemailer from 'nodemailer';
import sendWishes from "../../src/helpers/sendWishes"
import { Status, TWish } from '../../src/validation/wish.validator';
describe("Wish sending Test", () => {

    const mockTransporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
            user: process.env.ETHEREAL_EMAIL,
            pass: process.env.ETHEREAL_PASS
        }
    });
    const mockWishes: TWish[] = [
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

    test("Empty Transporter", () => {
        expect(sendWishes(mockWishes, null).attempt).toBe(0)
    })

    test("Empty Wishes", () => {
        expect(sendWishes([], mockTransporter).attempt).toBe(0)
    })

    xtest("Valid Mail Test (2 Unfinshed)", () => {
        expect(sendWishes(mockWishes, mockTransporter).attempt).toBe(2)
    })

    xtest("Valid Mail Test (1 Unfinshed)", () => {
        expect(sendWishes([
            {
                ...mockWishes[0]
            },
            {
                ...mockWishes[1], info: { status: Status.success }
            }
        ], mockTransporter).attempt).toBe(1)
    })

    xtest("Valid Mail Test (1 Unfinshed and 1 Failed)", () => {

        expect(sendWishes([
            {
                ...mockWishes[0]
            },
            {
                ...mockWishes[1], info: { status: Status.failed }
            }
        ], mockTransporter).attempt).toBe(2)
    })

    xtest("Valid Mail Test (Both already success)", () => {

        expect(sendWishes([
            {
                ...mockWishes[0], info: { status: Status.success }
            },
            {
                ...mockWishes[1], info: { status: Status.success }
            }
        ], mockTransporter).attempt).toBe(0)
    })

    xtest("Valid Mail Test (Both pending)", () => {

        expect(sendWishes([
            {
                ...mockWishes[0], info: { status: Status.pending }
            },
            {
                ...mockWishes[1], info: { status: Status.pending }
            }
        ], mockTransporter).attempt).toBe(0)
    })
})