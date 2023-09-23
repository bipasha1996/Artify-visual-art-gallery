
import { logo, nav } from './header'
import { getPhotos, renderPhotos } from './unsplash'

const main = document.querySelector('#main')
const header = document.querySelector('#header')

header.append(logo)
header.append(nav)

const urlParams = new URLSearchParams(window.location.search);
const section = urlParams.get('section');

getPhotos({
  query: section || 'Art'
})
  .then((photos) => {
    renderPhotos(photos)
  })

