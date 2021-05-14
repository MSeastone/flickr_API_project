

// skapar min knapp
const btn = document.querySelector(".btn");

//skapar en knapplyssnar funktion som hämtar 12 bilder med högst relevans för sökordet
btn.addEventListener("click", async function () {

        const first = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=0f09db2d9dac588a43c883de78dca0ff&text=";
        const last = "&sort=relevance&per_page=12&format=json&nojsoncallback=1";
        const searchText = document.getElementById("text").value;
        const newURL = first + searchText + last;
        const grid = document.getElementById("grid");

        const response = await fetch(newURL);
        
        const data = await response.json();
  
        // kollar av datan som skickas tillbaka i json format och ser vad som finns i den
        console.log(data);
        console.log(data.photos.photo[1]);


                for (let i = 0; i < data.photos.photo.length; i++) {
                const photo = data.photos.photo[i];
                let url = "https://farm" + photo.farm + ".staticflickr.com/" +
                photo.server + "/" + photo.id + "_" + photo.secret + "_" + "q.jpg";
                picture_url = "http://www.flickr.com/photos/" + photo.owner + "/" + photo.id;

                // här visas fotot i cropped square size och url:en till fotot
                console.log(photo);
                console.log(url);
                
                let img = document.createElement("img");
                img.src = url;
                grid.appendChild(img); // visar bilderna i grid, som jag valt att visa upp foton i


              

                const lightbox = document.createElement('div');
                lightbox.id = 'lightbox';
                grid.appendChild(lightbox); // lägger bilderna i grid/lightbox


                
                let images = document.querySelectorAll('img');
                images.forEach(image => {
                        image.addEventListener('click', e => {
                                lightbox.classList.add('active');
                                let img = document.createElement('img');
                               

                                //skapar en ny URL med z.jpg på slutet
                                url  = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_b.jpg`;
                                console.log(url);

                                img.src = url;
                                
                                while (lightbox.firstChild) {
                                   lightbox.removeChild(lightbox.firstChild);                                  
                                }
                                lightbox.appendChild(img);
                                
                        })
                })



                lightbox.addEventListener('click', e => {
                        if (e.target !== e.currentTarget) return;
                        lightbox.classList.remove('active'); // event för klickad bild som visas nu
                })
                lightbox.onclick = function(event) {
                        if (event.target == lightbox) {
                                lightbox.style.display = "none"; // event för att lämna lightbox
                        }
                      }
                        
        }       
});
                



