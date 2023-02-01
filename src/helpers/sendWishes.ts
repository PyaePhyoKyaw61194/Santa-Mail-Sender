import sendMail from './sendMail';
function sendWishes(wishes) {
    if (wishes && wishes.length > 0) {
        wishes.forEach((wishObj, index) => {
            // mail sending
            console.log(wishObj)
            if (wishObj.status === 'unfinished' || wishObj.status === 'failed') {
                console.log("Enter Send mail Process")
                const { username, address, wish } = wishObj
                sendMail({ username, address, wish }, wishes, index, wishObj)

            }
        });
    }
    console.log("wish process " + new Date())
}

export default sendWishes