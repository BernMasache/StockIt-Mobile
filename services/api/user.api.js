import HttpRequest from "../utilities/httpRequest"
const URL = process.env.NEXT_PUBLIC_URL 
const TOKEN = process.env.NEXT_PUBLIC_TOKEN
const httpRequest = new HttpRequest()
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${TOKEN}`
}

export default class UseUserService {
    login = async (data) => {
        const user = await httpRequest.get(URL + `?sheet=users`, { headers })
        return user
    }
}