function fetchPhotos(value, page) {
  const KEY = "24010057-253ecdb46e51cee64944dea92";
  const URL = `https://pixabay.com/api/?q=${value}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  return fetch(URL).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error("Oops, something went wrong"));
  });
}

const api = { fetchPhotos };

export default api;
