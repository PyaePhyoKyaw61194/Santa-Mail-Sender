import calculateAge from "../../helpers/calculateAge"
import dateFormatter from "../../helpers/dateFormatter"
import fetcher from "../../helpers/fetcher"
import responseHelper from "../../helpers/responseHelper"
import zodErrorFormatter from "../../helpers/zodErrorFormatter"
import { profileSchema, Status, TProfile, TUser, TWish, TWishCreate, userSchema, wishCreateSchema, wishSchema } from "../../validation/wish.validator"


const wishCreateModel = async (payload: TWishCreate, wishes: TWish[]) => {
    try {

        const wishCreateValidation = await wishCreateSchema
            .safeParseAsync(payload)

        if (wishCreateValidation.success == false) {
            const errRes = zodErrorFormatter(wishCreateValidation.error)
            return responseHelper(false, null, errRes)
        }

        const { username, content } = wishCreateValidation.data

        // Fetching External Data
        const profiles = await fetcher("https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json") as TProfile[]
        const users = await fetcher("https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json") as TUser[]

        // Register Check
        const userArr = users.filter(user => user.username === username)
        const isRegistered = userArr && userArr.length === 1
        if (!isRegistered) {
            return responseHelper(false, null, "User is not registered")
        }

        // User Data Validation Check
        const existingUser = userArr[0]
        const userValidation = await userSchema.safeParseAsync(existingUser)
        if (userValidation.success === false) {
            const errRes = zodErrorFormatter(userValidation.error)
            return responseHelper(false, null, errRes)
        }

        // Profile Check
        const profileArr = profiles.filter(profile => profile.userUid === userValidation.data.uid)
        const isProfileExisted = profileArr && profileArr.length === 1
        if (!isProfileExisted) {
            return responseHelper(false, null, "Profile not found")
        }

        // Profile Data Validatiom Check
        const existingProfile = profileArr[0]
        const profileValidation = await profileSchema.safeParseAsync(existingProfile)
        if (profileValidation.success === false) {
            const errRes = zodErrorFormatter(profileValidation.error)
            return responseHelper(false, null, errRes)
        }

        // Age Check
        const { birthdate, address } = profileValidation.data
        const age = calculateAge(dateFormatter(birthdate))
        if (age === -1) {
            return responseHelper(false, null, "Wrong birthdate format")
        }
        else if (age && age > 10) {
            return responseHelper(false, null, "Sorry, you are older than 10 years")
        }

        // Wish Data Validation Check
        const wishValidation = await wishSchema.safeParseAsync({ id: wishes.length, username, address, content, status: Status.unfinished })
        if (wishValidation.success === false) {
            const errRes = zodErrorFormatter(wishValidation.error)
            return responseHelper(false, null, errRes)
        }
        // Store wishes to in-memory array
        wishes.push(wishValidation.data)

        // Success
        return responseHelper(
            true,
            {
                username
            },
            null)
    } catch (err: any) {
        return responseHelper(false, null, err.message)
    }
}

export default wishCreateModel