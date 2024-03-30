 const form = document.querySelector('#searchForm');

 form.addEventListener('submit', 
 
 async function(e){
    e.preventDefault();
    const searchTerm = form.elements.query.value;

    const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchTerm}`);

    movies(res.data);

})


const movies = (shows) =>{
  
    // console.log(shows);
    for(let result of shows ){
        const img = document.createElement("img");
        img.src = result.show.image.medium;
        document.body.appendChild(img);
    }
}

