import Api from '@/services/Api'

export default {
    index(params) {
        return Api().get('favorites', {
            params: params
        })
    },
    post(favorite) {
        return Api().post('favorites', favorite)
    },
    delete(params) {
        const favoriteId = params.VideoId
        const userId = params.UserId
        return Api().delete(`favorites/${favoriteId}/${userId}`)
    },
}