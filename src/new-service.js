import axios from "axios";

export default class NewsApiService {
  
  constructor() {
    this.url = 'https://pixabay.com/api/';
    // this.params = {
    //   params: {
    //     key: '32602095-27dbade4d0732e174c3b141f5',
    //     q: this.searchQuery,
    //     image_type: 'photo',
    //     orientation: 'horizontal',
    //     safesearch: true,
    //     per_page: 40,
    //     page: this.page,
    //   },
    // };
    this.searchQuery = '';
    this.page = 1;
  }

  fetchArticles() {
    // console.log(this);
    // const url = `https://pixabay.com/api/?key=32602095-27dbade4d0732e174c3b141f5&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    // return fetch(url)
    //   .then(r => r.json())
    //   .then(data => {
    //     // console.log(data);
    //     this.incrementPage();
    //     return data; 
    //   });

    const params = {
      key: '32602095-27dbade4d0732e174c3b141f5',
      q: this.searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 40,
      page: this.page,
    };
    return axios.get(this.url, { params }).then(respons => {
      this.incrementPage();
      return respons.data;
    });
    

    // const url = 'https://pixabay.com/api/';

    // const params = {
    //   key: '32602095-27dbade4d0732e174c3b141f5',
    //   q: this.searchQuery,
    //   image_type: 'photo',
    //   orientation: 'horizontal',
    //   safesearch: true,
    //   per_page: 40,
    //   page: this.page,
    // };
    // return axios.get(this.url, {params}).then(respons => {
    //   console.log(respons.data);
    //   this.incrementPage();
    //   return respons.data.hits;
    // });
  }
  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
  get query() {
    this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
