import Api from '@/services/Api'

export default {
    index(userId) {
        return Api().get('histories', {
            params: userId
        })
    },
    post(history) {
        return Api().post('histories', history)
    }
}