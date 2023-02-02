import calculateAge from "../../helpers/calculateAge"
import dateFormatter from "../../helpers/dateFormatter"
import fetcher from "../../helpers/fetcher"
import responseHelper from "../../helpers/responseHelper"
import { Profile, Status, User, Wish } from "../../types/wish"

const wishCreateModel = async (username: string, wish: string, wishes: Wish[]) => {
    try {

        // Sanitizing Data
        username = username.trim()
        wish = wish.trim()

        if (username.length === 0) {
            return responseHelper(false, null, "Username should be filled")
        }
        else if (wish.length === 0) {
            return responseHelper(false, null, "Wish should be filled")
        }
        else if (wish.length >= 100) {
            return responseHelper(false, null, "Wish should be less than 100 words")
        }
        // Fetching External Data
        const profiles = await fetcher("https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json") as Profile[]
        const users = await fetcher("https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json") as User[]

        // Register Check
        const userArr = users.filter(user => user.username === username)
        const isRegistered = userArr && userArr.length === 1
        if (!isRegistered) {
            return responseHelper(false, null, "User is not registered")
        }

        // Profile Check
        const existingUser = userArr[0]
        const profileArr = profiles.filter(profile => profile.userUid === existingUser.uid)
        const isProfileExisted = profileArr && profileArr.length === 1
        if (!isProfileExisted) {
            return responseHelper(false, null, "Profile not found")
        }

        // Age Check
        const existingProfile = profileArr[0]
        const { birthdate, address } = existingProfile
        const age = calculateAge(dateFormatter(birthdate))
        if (age === -1) {
            return responseHelper(false, null, "Wrong birthdate format")
        }
        else if (age && age > 10) {
            return responseHelper(false, null, "Sorry, you are older than 10 years")
        }


        // Store wishes to in-memory array
        wishes.push({ id: wishes.length, username, address, wish, status: Status.unfinished })

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