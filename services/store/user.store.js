import UseUserService from "../api/user.api"

const useUserService = new UseUserService()

export default class UseUserStore {
    login = async (data) => {
        const response = await useUserService.login(data)
        return response
    }
}