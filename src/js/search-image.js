// Opisany w dokumentacji
import SimpleLightbox from "simplelightbox";
import iziToast from "izitoast"; 
// Opcjonalny import stylów
import "simplelightbox/dist/simple-lightbox.min.css";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector("#search-image-form")

class URL {
    #q
    constructor(q) {
      this.#q = q;
    }
    param = {
        key: "44950793-df63a62bcd1fce85415b89ba5",
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        url: "https://pixabay.com/api/"
    }
    get addres() {
        return this.param.url+"?key="+this.param.key+"&q="+this.#q+"&image_type="
                +this.param.image_type+"&orientation="+this.param.orientation+"&safesearch="+this.param.safesearch;
      }
}
// webformatURL — link do małego obrazka, aby wyświetlić listę kart w galerii.
// largeImageURL — link do dużego obrazu dla okna modalnego.
// tags — tekst opisujący obraz. Nadaje się do atrybutu alt.
// likes — liczba polubień.
// views — liczba wyświetleń.
// comments — liczba komentarzy.
// downloads — liczba pobrań.
const createImage = ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads, ...otherProps })=>{
    const li= document.createElement("li")
    li.classList.add("gallery-item")
    li.innerHTML=
        `<a class="gallery-link" href="${largeImageURL}">
            <img 
                class="gallery-image" 
                src="${webformatURL}" 
                alt="${tags}"
                titel="oooo" 
            />
            <div class="box">
                <div class="box-item">
                    <h3>Likes</h3>
                    <p id="likes">${likes}</p>
                </div>
                <div class="box-item">
                    <h3>Views</h3>
                    <p id="views">${views}</p>
                </div>
                <div class="box-item">
                    <h3>Comments</h3>
                    <p id="comments">${comments}</p>
                </div>
                <div class="box-item">
                    <h3>Downloads</h3>
                    <p id="downloads">${downloads}</p>
                </div>
            </div>
        </a>`
    return li
}
const initImages = (images) => {
    const imgs = images.map(createImage);
    const fragment = document.createDocumentFragment();
    fragment.append(...imgs)
    return fragment
}

const main = (root, images) =>{
    document.querySelector(root).appendChild(initImages(images))
}




form.addEventListener("submit", event => {
    event.preventDefault();
    const imgTitle = form.querySelector("#img").value.trim()
    const mesage = document.querySelector("#mesage")

    if ((imgTitle === "") & (mesage === null)) {
        form.insertAdjacentHTML("afterend", `<p id="mesage" class="message">Form field must be filled in!</p>`);
    }

    if (imgTitle !== "")  {
        if (mesage !== null) mesage.remove();

        const url = new URL(imgTitle)

        if (document.querySelector("#gallery").hasChildNodes()) {
            const childs = document.querySelectorAll("#gallery > li")
            childs.forEach(child => {
                child.remove();
            });
          }
        const loader = document.querySelector("#loader")
        console.log(loader)
        loader.classList.add("loader")    
        
        fetch(url.addres)
        .then(response => {
          if (!response.ok) {
            loader.classList.remove("loader")
            throw new Error(response.status);
          }
          loader.classList.remove("loader")
          return response.json();
        })
        .then(data => {
          // Data handling
            if (data.total===0) return iziToast.error({
                                                        close: false,
                                                        position:'topCenter',
                                                        progressBar: false,
                                                        backgroundColor: 'red',
                                                        messageColor: 'white',
                                                        timeout: 5000,
                                                        message:"Sorry, there are no images matching your search query. Please try again!",
                                                        transitionOut:'fadeOutUp',
                                                        })

            main("ul.gallery",data.hits)
            const lightbox = new SimpleLightbox('ul.gallery>li>a', { 
                captions: true,
                captionType: "attr",
                captionsData:"alt",
                captionPosition: 'bottom',
                captionDelay: 250,
                overlay: true,
             });
        })
        .catch(error => {
          // Error handling
            console.log(error);
        });   
    }
    
    form.reset();
})




