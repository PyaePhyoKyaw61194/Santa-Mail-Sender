import wishCreateModel from "../../../src/models/wish.models/create.model";
describe("Wish Create Model Test", () => {
    const mockWishModelInfo = {
        username: "mock-user-1",
        wish: "mock-wish-1",
        wishes: []
    }

    test("Test empty user name", async () => {
        const res = await wishCreateModel("", mockWishModelInfo.wish, mockWishModelInfo.wishes)
        expect(res.success).toBe(false)
        expect(res.error.message).toBe("Username should be filled")
    })

    test("Test empty wish", async () => {
        const res = await wishCreateModel(mockWishModelInfo.username, "", mockWishModelInfo.wishes)
        expect(res.success).toBe(false)
        expect(res.error.message).toBe("Wish should be filled")
    })

    test("Test a wish with more than 100 words", async () => {
        const longString = "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32."
        const res = await wishCreateModel(mockWishModelInfo.username, longString, mockWishModelInfo.wishes)
        expect(res.success).toBe(false)
        expect(res.error.message).toBe("Wish should be less than 100 words")
    })

    test("Test Not register user", async () => {
        const res = await wishCreateModel(mockWishModelInfo.username, mockWishModelInfo.wish, mockWishModelInfo.wishes)
        expect(res.success).toBe(false)
        expect(res.error.message).toBe("User is not registered")
    })

    test("Valid User", async () => {
        const res = await wishCreateModel("charlie.brown", mockWishModelInfo.wish, mockWishModelInfo.wishes)
        expect(res.success).toBe(true)
        expect(res.error.message).toBeNull()
    })

    test("Valid User with over 10 years old", async () => {
        const res = await wishCreateModel("james.bond", mockWishModelInfo.wish, mockWishModelInfo.wishes)
        expect(res.success).toBe(false)
        expect(res.error.message).toBe("Sorry, you are older than 10 years")
    })
})