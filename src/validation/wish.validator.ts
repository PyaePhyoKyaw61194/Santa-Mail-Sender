import { z } from "zod";

export enum Status {
    unfinished = 'unfinished',
    pending = 'pending',
    failed = 'failed',
    success = 'success'
}

const wishObject = {
    id: z.number(),
    username: z.string({
        required_error: "Name is required(zod)",
        invalid_type_error: "Name must be a string",
    }).
        min(1, { message: "Name is required(zod)" }),
    wish: z.string({
        required_error: "Wish is required(zod)",
        invalid_type_error: "Wish must be a string",

    })
        .min(1, { message: "Wish is required(zod)" })
        .max(100, { message: "Wish should be less than 100 words" }),
    address: z.string({
        required_error: "Wish is required(zod)",
        invalid_type_error: "Wish must be a string",

    })
        .min(1, { message: "Wish is required(zod)" })
        .max(100, { message: "Wish should be less than 100 words" }),
    status: z.nativeEnum(Status),

}

const wishCreateSchema = z.object({
    ...wishObject
}).omit({ id: true, status: true, address: true })
type TWishCreate = z.infer<typeof wishCreateSchema>

const wishResponseSchema = z.object({
    ...wishObject
}).pick({ username: true })
type TWishResponse = z.infer<typeof wishResponseSchema>

const wishSchema = z.object({
    ...wishObject
})
type TWish = z.infer<typeof wishSchema>

const wishArrayInfoSchema = z.object({
    wishes: z.array(wishSchema),
    currentIndex: z.number(),
    currentWish: wishSchema
})
type TWishArrayInfo = z.infer<typeof wishArrayInfoSchema>

const profileSchema = z.object({
    userUid: z.string(),
    address: z.string(),
    birthdate: z.string()
})
type TProfile = z.infer<typeof profileSchema>

const userSchema = z.object({
    username: z.string(),
    uid: z.string(),
})
type TUser = z.infer<typeof userSchema>





export { wishCreateSchema, TWishCreate, TWishResponse, TWish, TWishArrayInfo, TProfile, TUser }