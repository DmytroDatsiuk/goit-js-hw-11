import NewsApiService from './new-service';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import LoadMoreBtn from './load-more-btn';

const refs = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const newsApiService = new NewsApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);



function onSearch(e) {
  e.preventDefault();
  clearGalleryMarkup();

  newsApiService.query = e.currentTarget.elements.searchQuery.value;

  newsApiService.resetPage();

  loadMoreBtn.disable();
  newsApiService
    .fetchArticles()
    .then(data => {
      if (data.totalHits === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your search query. Please try again.`
        );
        return;
      }
      loadMoreBtn.show();
      loadMoreBtn.enable();
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
      appendPhotoHitsMurkup(data.hits);
    })
    .catch(error => {
      console.log(error);
    });
}

function onLoadMore(e) {
  loadMoreBtn.disable();

  newsApiService
    .fetchArticles()
    .then(data => {
      loadMoreBtn.enable();
      appendPhotoHitsMurkup(data.hits);

      const { height: cardHeight } =
        refs.gallery.firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    })
    .catch(error => {
      // loadMoreBtn.disable()
      loadMoreBtn.hide()
      console.log(error);

    });
}

function appendPhotoHitsMurkup(hits) {
  refs.gallery.insertAdjacentHTML('beforeend', createPhotoMarkup(hits));
  let gallery = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
    
  });
  gallery.refresh()
}

function createPhotoMarkup(searchQuery) {
  return searchQuery.map(
    ({
      webformatURL,
      largeImageURL,
      tags,
      likes,
      views,
      comments,
      downloads,
    }) => `<div class="photo-card">
    <a class='gallery__link' href='${largeImageURL}'>
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width='400px' />
  </a>
  <div class="info">
    <div>
      <p class="info-item">
        <b>Likes</b>
      <p class="info-item">${likes}</p>
      </p>
    </div>
    <div>
      <p class="info-item">
        <b>Views</b>

      </p>
      <p class="info-item">${views}</p>
    </div>
    <div>
      <p class="info-item">
        <b>Comments</b>
        <p class="info-item">${comments}</p>
      </p>
    </div>
    <div>
      <p class="info-item">
        <b>Downloads</b>
        <p class="info-item">${downloads}</p>
      </p>
    </div>
  </div>
</div>`
  );
}

function clearGalleryMarkup() {
  refs.gallery.innerHTML = '';
}
