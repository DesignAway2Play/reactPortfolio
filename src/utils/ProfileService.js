
const BASE_URL = '/api/posts';

export async function getAllPosts() {
    return fetch(BASE_URL).then(res => res.json());
  }