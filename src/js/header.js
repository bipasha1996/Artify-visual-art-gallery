import { navItems } from './nav'
import { getPhotos, renderPhotos } from './unsplash'

const urlParams = new URLSearchParams(window.location.search);
const section = urlParams.get('section');

if (section) {
    const sectionDecoded = decodeURI(section).toLowerCase() // TODO
}

export const logo = document.createElement('a')
logo.setAttribute("id", "logo")
logo.setAttribute('href', '/')
logo.innerHTML = 'Artify'

export const nav = document.createElement('ul')

const handleNavListItemClick = async ({ title, isPage, link }) => {
    if (isPage) {
        window.location = link
    } else {
        let queryParams = new URLSearchParams(window.location.search);
        queryParams.set('section', title);
        history.replaceState(null, null, "?" + queryParams.toString());

        getPhotos({
            query: title
        })
            .then((photos) => {
                renderPhotos(photos)
            })

    }
}


const removeActiveClass = () => {
    for (let child of nav?.children) {
        child?.classList?.remove('active')
    }
}

navItems.forEach(item => {
    const { title, isPage, link } = item
    const newListItem = document.createElement('li')
    newListItem.innerHTML = title
    newListItem.setAttribute('id', encodeURI(title.toLowerCase()))
    nav.append(newListItem)
    newListItem.addEventListener('click', () => {
        removeActiveClass()
        handleNavListItemClick({ title, isPage, link })
        newListItem.classList.add('active')
    })
})
