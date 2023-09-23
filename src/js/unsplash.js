import { createApi } from "unsplash-js";

const _favPhotosLocalStorageKey = 'fav-photos'

const unsplash = createApi({
    accessKey: 'It8g1evXd6vNsiMa_CQlt_I01H2SUe-jO4Rf_BCdgBo' // TODO env
});


export const getPhotos = async ({
    query,
    page,
    perPage,
    orientation
}) => {

    query = query || 'Art'
    page = page || 1
    perPage = perPage || 16
    orientation = orientation || 'portrait'

    return new Promise((resolve, reject) => {
        unsplash.search.getPhotos({
            query,
            page,
            perPage,
            orientation
        })
            .then((result) => {
                if (result.type === 'success') {
                    const photos = result.response.results;
                    resolve(photos)
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}

export const renderPhotos = (photos) => {
    main.innerHTML = ''
    const getUrls = photos.map((i) => {
        return `
        <div id='photo-card'>
            <img src="${i.urls.small}" id="${i.id}" />
            <div id='photo-card-action'>
                <button id='fav-button' data-photo-id="${i.id}">
                🤍
                </button>
            </div>
        </div>
        
        `;
    })
    main.innerHTML = getUrls.join('')

    const favPhotosFromLocalStorage = JSON.parse(localStorage.getItem(_favPhotosLocalStorageKey)) || []

    const favButtons = document.querySelectorAll('#fav-button')

    const handleFavoriteClick = (photoId) => {
        if (!photoId) return

        const oldFavPhotos = JSON.parse(localStorage.getItem(_favPhotosLocalStorageKey)) || []
        const newFavPhotos = oldFavPhotos.concat([photoId])

        localStorage.setItem(_favPhotosLocalStorageKey, JSON.stringify(newFavPhotos))
    }



    for (let favButton of favButtons) {
        const photoId = favButton.dataset['photoId']
        const hasAddedInFev = favPhotosFromLocalStorage.find(e => e === photoId)

        if (hasAddedInFev) {
            favButton.innerHTML = ''
            favButton.innerHTML = '❤️'
        }

        favButton.addEventListener('click', (e) => {
            favButton.innerHTML = '❤️'
            handleFavoriteClick(photoId
            )
        })
    }

}
