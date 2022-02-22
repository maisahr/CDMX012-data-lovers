import { movieCards, movieCharacters, directors, producers, directorTitles, producerTitles, sortByAZMovies, sortByHR, sortByAZCharacters, sortByAZStaff, sortByHRStaff, sortByAgeNumber, sortByAgeString } from './data.js';

import data from './data/ghibli/ghibli.js';

// DESPLEGAR SECCIONES
const sectionMovies = document.getElementById("movies-content");
const sectionOneMovie = document.getElementById("individual-movies");
const sectionCharacters = document.getElementById("characters-content");
const sectionStaff = document.getElementById("staff-content");

function displaySections(hideSection, secHideSection, thirdHideSection, showSection){
    hideSection.style.display = "none";
    secHideSection.style.display = "none";
    thirdHideSection.style.display = "none";
    showSection.style.display = "block";
    showSection.scrollIntoView();
}

document.getElementById("btnMovies").addEventListener("click", ()=>{displaySections(sectionStaff, sectionOneMovie, sectionCharacters, sectionMovies)});

document.getElementById("btnCharacters").addEventListener("click", ()=>{displaySections(sectionStaff, sectionOneMovie, sectionMovies, sectionCharacters)});

document.getElementById("btnStaff").addEventListener("click", ()=>{ displaySections(sectionMovies, sectionOneMovie, sectionCharacters, sectionStaff)});

// SECCIÓN DE PELÍCULAS -----------------------------------------------------------------------
//Array bidimensional donde se van a guardar las películas con su poster, título, rating y id.
let allMovies = []; 

// Le agrega al array anterior los datos obtenidos de data.films.
for(let i = 0; i < data.films.length; i++){ 
    allMovies.push(movieCards(data.films[i]));
}

let movieList = document.getElementById("movieList");

// Crea e imprime tarjetas (artículos) en la sección movieList del HTML.
function printMovieCards(allMovies){
    movieList.innerHTML = "";
    for(let j = 0; j < allMovies.length; j++){
        let elementArticle = document.createElement("article");
        elementArticle.setAttribute("id", allMovies[j][3]);

        let imgMovie = document.createElement("img");
        imgMovie.setAttribute("src", allMovies[j][0]);
    
        let elementP = document.createElement("p");

        let stars = "";
        if(Number(allMovies[j][2]) < 21){
            stars = " ★ ";
        } if(Number(allMovies[j][2]) >= 21 && Number(allMovies[j][2]) <= 40){
            stars = " ★★ ";
        } if(Number(allMovies[j][2]) >= 41 && Number(allMovies[j][2]) <= 60){
            stars = " ★★★ ";
        }if(Number(allMovies[j][2]) >= 61 && Number(allMovies[j][2]) <= 80){
            stars = " ★★★★ ";
        }if(Number(allMovies[j][2]) >= 81){
            stars = " ★★★★★ ";
        }

        elementP.innerHTML = "<strong>" + allMovies[j][1] + "</strong>" + "<br>" + "<span style='color:#FDCD00; font-size:150%';>" + stars + "</span> <br> Rating: " + allMovies[j][2] + "%";

        elementArticle.appendChild(imgMovie);
        elementArticle.appendChild(elementP);

        movieList.appendChild(elementArticle);
    }
}

printMovieCards(allMovies); // Imprime películas
let moviesArticles = movieList.getElementsByTagName("ARTICLE"); //Obtiene los elementos article dentro de la sección movieList

//FUNCIONALIDAD DEL FILTRO DE SORT BY EN LA SECCIÓN DE MOVIES
//Llama al elemento select de la sección de Movies y lo guarda en una variable
const selectSortMovies = document.querySelector("#selectSortMovies");

//Es la función de lo que se va a hacer según el elemento que se selccione en el Select
const selectedSort = () => {
    const selectedOption = selectSortMovies.selectedIndex; 
    
    if (selectedOption === 1){ //Para la primera opción
        printMovieCards(sortByHR(allMovies));
        printMovieDetails();
    } if (selectedOption === 2){
        printMovieCards(sortByHR(allMovies).reverse());
        printMovieDetails();
    } if (selectedOption === 3){
        printMovieCards(sortByAZMovies(allMovies));
        printMovieDetails();
    } if (selectedOption === 4) {
        printMovieCards(sortByAZMovies(allMovies).reverse());
        printMovieDetails();
    }
}

//Agrega el evento a ejecutar cuando haya un cambio en el select
selectSortMovies.addEventListener("change", selectedSort);

//SECCIÓN PARA IMPRIMIR INFORMACIÓN DE CADA PELÍCULA

//Imprime los detalles de cada película
printMovieDetails();

function printMovieDetails(){
    for(let i = 0; i < moviesArticles.length; i++){
        moviesArticles[i].addEventListener("click", () => {
            let movieId = moviesArticles[i].getAttribute("id");
            document.getElementById("individual-movies").innerHTML = "";
            
            data.films.forEach( film => {
                if(movieId === film.id){
                    displaySections(sectionMovies, sectionStaff, sectionCharacters, sectionOneMovie);
     
                    let elementSection = document.createElement("section");
                    elementSection.setAttribute("class", "poster-description")
     
                    let elementH2 = document.createElement("h2");
                    elementH2.innerHTML = film.title;

                    let elementButton = document.createElement("button");
                    elementButton.innerHTML = "🡸";
                    elementButton.setAttribute("id", "back-button");

                    let elementPR  = document.createElement("aside");
     
                    let poster = document.createElement("img");
                    poster.setAttribute("src", film.poster);
     
                    let elementP = document.createElement("p");
                    elementP.setAttribute("class", "description");
                    elementP.innerHTML = "<strong>Release date: </strong>" + film.release_date + "<br><strong> Director: </strong>" + film.director + "<br><strong> Producer: </strong>" + film.producer + "<br><br><strong> Description: </strong>" + film.description;
     
                    let elementRating = document.createElement("p");
                    elementRating.setAttribute("class", "rating");
                    elementRating.innerHTML = "<strong><span style='color:#FDCD00; font-size:150%';> ★ </span>" + film.rt_score + "% </strong>";
     
                    elementPR.append(poster, elementRating);
                    elementSection.append(elementButton, elementPR, elementP);
     
                    // Seccion de los personajes (:
                    let characters = movieCharacters(film);
                    let charactersBlock = document.createElement("section");
                    charactersBlock.innerHTML = "<h3>Characters</h3>";
     
                    let charactersSection = document.createElement("section");
                    charactersSection.setAttribute("class", "characters");
     
                    characters.forEach(character => {
                        let elementCharacter = document.createElement("article");
                        elementCharacter.innerHTML = character[0];
     
                        let characterPicture = document.createElement("img");
                        characterPicture.setAttribute("src", character[1]);

     
                        elementCharacter.appendChild(characterPicture);
     
                        charactersSection.appendChild(elementCharacter);
                    });
     
                document.getElementById("individual-movies").append(elementH2, elementSection, charactersBlock, charactersSection);
                document.getElementById("individual-movies").scrollIntoView();
                }
            });
        });
    }
}

//Botón de regresar a la sección de películas para cada película individual
document.body.addEventListener("click", function (boton) {
    if(boton.target.id === "back-button"){
        displaySections(sectionOneMovie, sectionStaff, sectionCharacters, sectionMovies);
    }
});

// SECCION DE PERSONAJES ----------------------------------------------------------------------------------

//Imprime cada personaje en un artículo
function printCharacters(charactersArr){
    charactersArr.forEach(character => {
        let elementArticle = document.createElement("article");
        elementArticle.innerHTML = "<strong style='font-size: 1.1rem';>" + character[0] + "</strong>";

        let elementImg = document.createElement("img");
        elementImg.setAttribute("src", character[1]);

        let elementP = document.createElement("p");
        elementP.innerHTML = "<strong>Age:</strong> " + character[3] + "<br><strong>Gender:</strong> " + character[2] + "<br><strong>Species:</strong> " + character[4];

        elementArticle.append(elementImg, elementP);
        document.getElementById("charactersList").appendChild(elementArticle);
    });
}

//Recorre las películas, obtiene array de 5 elementos de cada personaje de cada película y los imprime
data.films.forEach(film => printCharacters(movieCharacters(film)));

// PARA LLENAR LAS OPCIONES DENTRO DE FILTER BY MOVIE
allMovies.forEach(movie => {
    let option = document.createElement("option");
    option.innerHTML = movie[1];
    document.getElementById("filterMovies").appendChild(option);
})

// FILTRA LOS PERSONAJES POR PELICULAS
const selectFilterMovie = document.querySelector("#filterMovies");

function filterByMovie(){
    let title = selectFilterMovie[selectFilterMovie.selectedIndex].value;
    data.films.forEach(movie =>{
        if(title === movie.title){
            document.getElementById("charactersList").innerHTML = " ";
            printCharacters(movieCharacters(movie));
        } else if (title === "All movies"){
            document.getElementById("charactersList").innerHTML = " ";
            data.films.forEach(film => printCharacters(movieCharacters(film)));
        }
    })
}

selectFilterMovie.addEventListener("change", filterByMovie);

// ORDENA PERSONAJES
let allCharacters = []; //Array de 3 Dimensiones: Película, personaje, y 5 elementos por personaje

data.films.forEach(film => {
    allCharacters.push(movieCharacters(film));
});

console.log(allCharacters);

//Crea un array de 2 dimensiones: personajes y 5 elementos de cada uno
//let allCharactersFlat = allCharacters.flat(1);


const selectSortCharacters = document.querySelector("#selectSortCharacters");

function sortCharacters() {
    const selectedOption = selectSortCharacters.selectedIndex; 
    
    let title = selectFilterMovie[selectFilterMovie.selectedIndex].value;

    data.films.forEach(movie =>{
        if(title === movie.title){
            if (selectedOption === 1){ //Ordena A-Z
                document.getElementById("charactersList").innerHTML = "";
                printCharacters(sortByAZCharacters(movieCharacters(movie)));
            } 

            if (selectedOption === 2){ //Ordena Z-A
                document.getElementById("charactersList").innerHTML = "";
                printCharacters(sortByAZCharacters(movieCharacters(movie)).reverse());
            }

            if (selectedOption === 3){ //Ordena por edad con número y sin número de menor a mayor
                document.getElementById("charactersList").innerHTML = "";
        
                let charactersWithAgeNumber = document.createElement("h3")
                charactersWithAgeNumber.innerHTML = "Characters with specific age: ";
                document.getElementById("charactersList").appendChild(charactersWithAgeNumber);
                printCharacters(sortByAgeNumber(movieCharacters(movie)));
        
                let charactersWithAgeString = document.createElement("h3")
                charactersWithAgeString.innerHTML = "Characters without specific age: ";
                document.getElementById("charactersList").appendChild(charactersWithAgeString);
                printCharacters(sortByAgeString(movieCharacters(movie)));
            }

            if (selectedOption === 4) { //Ordena por edad con número y sin número de mayor a menor
                document.getElementById("charactersList").innerHTML = "";
        
                let charactersWithAgeNumber = document.createElement("h3")
                charactersWithAgeNumber.innerHTML = "Characters with specific age: ";
                document.getElementById("charactersList").appendChild(charactersWithAgeNumber);
                printCharacters(sortByAgeNumber(movieCharacters(movie)).reverse());
        
                let charactersWithAgeString = document.createElement("h3")
                charactersWithAgeString.innerHTML = "Characters without specific age: ";
                document.getElementById("charactersList").appendChild(charactersWithAgeString);
                printCharacters(sortByAgeString(movieCharacters(movie)).reverse());
            }

        } /* else {
            if (selectedOption === 1){ //Ordena A-Z
                document.getElementById("charactersList").innerHTML = "";
                printCharacters(sortByAZCharacters(allCharactersFlat));
            } 
    
            if (selectedOption === 2){ //Ordena Z-A
                document.getElementById("charactersList").innerHTML = "";
                printCharacters(sortByAZCharacters(allCharactersFlat).reverse());
            } 
            
            if (selectedOption === 3){ //Ordena por edad con número y sin número de menor a mayor
                document.getElementById("charactersList").innerHTML = "";

                let charactersWithAgeNumber = document.createElement("h3")
                charactersWithAgeNumber.innerHTML = "Characters with specific age: ";
                document.getElementById("charactersList").appendChild(charactersWithAgeNumber);
                printCharacters(sortByAgeNumber(allCharactersFlat));

                let charactersWithAgeString = document.createElement("h3")
                charactersWithAgeString.innerHTML = "Characters without specific age: ";
                document.getElementById("charactersList").appendChild(charactersWithAgeString);
                printCharacters(sortByAgeString(allCharactersFlat));
            } 
            
            if (selectedOption === 4) { //Ordena por edad con número y sin número de mayor a menor
                document.getElementById("charactersList").innerHTML = "";

                let charactersWithAgeNumber = document.createElement("h3")
                charactersWithAgeNumber.innerHTML = "Characters with specific age: ";
                document.getElementById("charactersList").appendChild(charactersWithAgeNumber);
                printCharacters(sortByAgeNumber(allCharactersFlat).reverse());

                let charactersWithAgeString = document.createElement("h3")
                charactersWithAgeString.innerHTML = "Characters without specific age: ";
                document.getElementById("charactersList").appendChild(charactersWithAgeString);
                printCharacters(sortByAgeString(allCharactersFlat).reverse());
            }
        } */
    });
}

/* function sortCharacters() {
    const selectedOption = selectSortCharacters.selectedIndex; 
    
    if (selectedOption === 1){ //Ordena A-Z
        document.getElementById("charactersList").innerHTML = "";
        printCharacters(sortByAZCharacters(allCharactersFlat));
    } 
    
    if (selectedOption === 2){ //Ordena Z-A
        document.getElementById("charactersList").innerHTML = "";
        printCharacters(sortByAZCharacters(allCharactersFlat).reverse());
    } 
    
    if (selectedOption === 3){ //Ordena por edad con número y sin número de menor a mayor
        document.getElementById("charactersList").innerHTML = "";

        let charactersWithAgeNumber = document.createElement("h3")
        charactersWithAgeNumber.innerHTML = "Characters with specific age: ";
        document.getElementById("charactersList").appendChild(charactersWithAgeNumber);
        printCharacters(sortByAgeNumber(allCharactersFlat));

        let charactersWithAgeString = document.createElement("h3")
        charactersWithAgeString.innerHTML = "Characters without specific age: ";
        document.getElementById("charactersList").appendChild(charactersWithAgeString);
        printCharacters(sortByAgeString(allCharactersFlat));
    } 
    
    if (selectedOption === 4) { //Ordena por edad con número y sin número de mayor a menor
        document.getElementById("charactersList").innerHTML = "";

        let charactersWithAgeNumber = document.createElement("h3")
        charactersWithAgeNumber.innerHTML = "Characters with specific age: ";
        document.getElementById("charactersList").appendChild(charactersWithAgeNumber);
        printCharacters(sortByAgeNumber(allCharactersFlat).reverse());

        let charactersWithAgeString = document.createElement("h3")
        charactersWithAgeString.innerHTML = "Characters without specific age: ";
        document.getElementById("charactersList").appendChild(charactersWithAgeString);
        printCharacters(sortByAgeString(allCharactersFlat).reverse());
    }
} */

selectSortCharacters.addEventListener("change", sortCharacters);


// SECCIÓN DE DIRECTORES Y PRODUCTORES -------------------------------------------------------------
//Obtener una lista con los nombres de todos los directores y productores
let people = [];

for(let i = 0; i < data.films.length; i++){ 
    people.push(directors(data.films[i]));
    people.push(producers(data.films[i]));
}

//Filtrar la lista para quitar los repetidos, da una lista de 9 nombres
let nameList = people.filter((item,index) => {
    return people.indexOf(item) === index;
});

// Saca un array con los titulos de las peliculas donde participó cada director
const directorTitlesArray = [];
const directorTitlesArrayModif = [];

for(let i = 0; i < nameList.length; i++){
    directorTitlesArray.push(directorTitles(data.films, nameList[i]));
    directorTitlesArrayModif.push(directorTitles(data.films, nameList[i]));
}

//Saca un array con los titulos de las peliculas donde participó cada productor
const producerTitlesArray = [];
const producerTitlesArrayModif = [];

for(let i = 0; i < nameList.length; i++){
    producerTitlesArray.push(producerTitles(data.films, nameList[i]));
    producerTitlesArrayModif.push(producerTitles(data.films, nameList[i]));
}

const staff = directorTitlesArray.concat(producerTitlesArray);
const staffModif = directorTitlesArray.concat(producerTitlesArray);

function printStaff(staff){
    document.getElementById("staffList").innerHTML = "";
    for(let j = 0; j < staff.length; j++){
        if (staff[j].length > 3){ // Para que no impra arrays sin películas
            let elementArticle = document.createElement("article");
            elementArticle.innerHTML = "<h3>" + staff[j][0] + "</h3> <span style='font-size:90%;'>" + staff[j][1] + "</span>";

            let elementOl = document.createElement("ol");

            for(let i = 2; i < staff[j].length; i++){ 
                if(staff[j][i].length > 0){ // Para que no se impra el rating como parte de la lista
                    let elementLi = document.createElement("li");
                    elementLi.innerHTML =  staff[j][i];
                    elementOl.appendChild(elementLi);
                } 
            elementArticle.appendChild(elementOl);
            }

            let elementP = document.createElement("p"); // Para pegarlo después de la lista
            elementP.innerHTML = "<strong><span style='color:#FDCD00; font-size:150%';> ★ </span>Average Rating: " + staff[j][(staff[j].length)-1] + "%</strong>";
            elementArticle.appendChild(elementP);
            
            document.getElementById("staffList").appendChild(elementArticle);
        }
    }
}

printStaff(staff);

const btnAll = document.querySelector("#allRadio");
btnAll.addEventListener("click", filter);

const btnDirectors = document.querySelector("#directorRadio");
btnDirectors.addEventListener("click", filter);

const btnProducers = document.querySelector("#producerRadio");
btnProducers.addEventListener("click", filter);

const selectSortStaff = document.querySelector("#selectSortStaff");

let c = 1;
function filter() {
    if(btnAll.checked){
        c = 1;
        selectSortStaff.selectedIndex = 0;
        printStaff(staff);
    }
    if(btnDirectors.checked){
        c = 2;
        selectSortStaff.selectedIndex = 0;
        printStaff(directorTitlesArray);
    }
    if(btnProducers.checked){
        c = 3;
        selectSortStaff.selectedIndex = 0;
        printStaff(producerTitlesArray);
    }
}

function sort(){
    const selectedOption = selectSortStaff.selectedIndex;
    if (c === 1){
        if (selectedOption === 1){
            let staffHR = sortByHRStaff(staffModif);
            printStaff(staffHR);
        } if (selectedOption === 2){
            let staffLR = sortByHRStaff(staffModif).reverse();
            printStaff(staffLR);
        } if (selectedOption === 3){
            let staffAZ = sortByAZStaff(staffModif);
            printStaff(staffAZ);
        } if (selectedOption === 4){
            let staffZA = sortByAZStaff(staffModif).reverse();
            printStaff(staffZA);
        }
    }
    if (c === 2){
        if (selectedOption === 1){
            let staffHR = sortByHRStaff(directorTitlesArrayModif);
            printStaff(staffHR);
        } if (selectedOption === 2){
            let staffLR = sortByHRStaff(directorTitlesArrayModif).reverse();
            printStaff(staffLR);
        } if (selectedOption === 3){
            let staffAZ = sortByAZStaff(directorTitlesArrayModif);
            printStaff(staffAZ);
        } if (selectedOption === 4){
            let staffZA = sortByAZStaff(directorTitlesArrayModif).reverse();
            printStaff(staffZA);
        }
    }
    if (c === 3){
        if (selectedOption === 1){
            let staffHR = sortByHRStaff(producerTitlesArrayModif);
            printStaff(staffHR);
        } if (selectedOption === 2){
            let staffLR = sortByHRStaff(producerTitlesArrayModif).reverse();
            printStaff(staffLR);
        } if (selectedOption === 3){
            let staffAZ = sortByAZStaff(producerTitlesArrayModif);
            printStaff(staffAZ);
        } if (selectedOption === 4){
            let staffZA = sortByAZStaff(producerTitlesArrayModif).reverse();
            printStaff(staffZA);
        }
    }
}

selectSortStaff.addEventListener("change", sort);

//Botón para subir hasta el principio de la página 
document.getElementById("button-up").addEventListener("click", () => {
    window.scroll({
        top:0,
        left:0,
        behavior:"smooth"
    });
});