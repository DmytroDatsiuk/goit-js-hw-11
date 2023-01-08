import axios from 'axios';

export default class NewsApiService {
  constructor() {
    this.url = 'https://pixabay.com/api/';
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchArticles() {
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

    const response = await axios.get(this.url, { params }).then(response => {
      this.incrementPage();
      return response.data;
    });

    return response;

    // const response = await axios.get(url, {params})
    // const incrementPage = await response.this.incrementPage();
    // const respons = await response.data
    // return respons

    //* const fetchUsers = async () => {
    //*   const response = await fetch("https://jsonplaceholder.typicode.com/users");
    //*   const users = await response.json();
    //*   return users;
    //* };

    //* fetchUsers().then(users => console.log(users));

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
