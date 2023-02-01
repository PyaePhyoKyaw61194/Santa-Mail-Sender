import calculateAge from "../../helpers/calculateAge"
import dateFormatter from "../../helpers/dateFormatter"
import fetcher from "../../helpers/fetcher"
import responseHelper from "../../helpers/responseHelper"



const wishCreateModel = async (username, wish, wishes) => {
    try {

        username = username.trim()
        wish = wish.trim()
        const profiles = await fetcher("https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json")
        const users = await fetcher("https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json")


        const userArr = users.filter(user => user.username === username)
        const isRegistered = userArr && userArr.length === 1
        if (!isRegistered) {
            return responseHelper(false, null, "User is not registered")
        }

        const existingUser = userArr[0]
        const profileArr = profiles.filter(profile => profile.userUid === existingUser.uid)
        const isProfileExisted = profileArr && profileArr.length === 1
        if (!isProfileExisted) {
            return responseHelper(false, null, "Profile not found")
        }

        const existingProfile = profileArr[0]
        const { birthdate, address } = existingProfile
        const age = calculateAge(dateFormatter(birthdate))
        if (!age) {
            return responseHelper(false, null, "Wrong birthdate format")
        }

        if (age && age > 10) {
            return responseHelper(false, null, "Sorry, you are older than 10 years")
        }


        // Store wish to in-memory array
        /*     storeWishes({ username, address, wish, status: "unfinished" }) */
        wishes.push({ id: wishes.length, username, address, wish, status: "unfinished" })
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