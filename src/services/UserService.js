import axios from "axios"

class UserService {
    api_url;
    constructor(url) {
        this.api_url = url;
    }
    GetUsers() {
        return new Promise((resolve, reject) => {
            try {
                resolve(axios.get(this.api_url + '/User/models'))
            }
            catch (e) {
                reject(e);
            }
        }).catch((reason => {
            console.log('made it here: ', reason);
        }));
    }
}
export default UserService;