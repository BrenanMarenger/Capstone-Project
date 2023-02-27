import Api from '@/services/Api'

export default {
    getAllFavorites() {
        return Api().get('favorites')
    },
    show(userId) {
        return Api().get(`favorites/${userId}`)
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