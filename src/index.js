//Importaciones
import axios from 'axios'
import Personaje from './Personaje'
import $ from 'jquery'
//Elementos del DOM
const prevBtn = document.getElementById("Previous")
const nextBtn = document.getElementById("Next")
const character = document.getElementById("Character")

let pagina = 1
// Aquí quería agregar poder cambiar las páginas al pulsar los botones, pero no logré hacer el llamado correctamente :'( )
// prevBtn.addEventListener("click", () => {
//     pagina--
//     console.log(pagina)
// })

// nextBtn.addEventListener("click", () => {
//     pagina++
//     apiRickAndMorty
//     console.log(pagina)
// })

const apiRickAndMorty = (() => {
    return new Promise(async (resolve, reject) => {
        try {
            const urlApi = await axios.get(`https://rickandmortyapi.com/api/character/?page=${pagina}`);
            let datos = urlApi.data.results
            let personajes = []
            datos.forEach(e => {
                personajes.push(new Personaje(e.id, e.name, e.gender, e.species, e.status, e.image))
            });
            resolve(personajes)
        } catch (error) {
            reject(error)
        }
    })
})()
.then((personajes) => {
    personajes.forEach(e => {
        character.innerHTML += `
        <div class="card col-12 col-md-4 col-lg-3">
        <img
        id="${e.id}"        
        src="${e.imagen}"
        alt="foto personaje"
        class="character-img"
        />
        <ul class="character-info ${e.id}">
            <h5><b>Name:</b> ${e.nombre}</h5>
            <li><b>id:</b> ${e.id}</li>
            <li><b>Gender:</b> ${e.genero}</li>
            <li><b>Specie:</b> ${e.especie}</li>
            <li><b>Current status:</b> ${e.estado}</li>
        </ul>
        </div>`
    })
    $('.character-img').click((e) => {
        $(`.${e.target.id}`).toggle(650)
    });
})
    .catch((error) => console.error(error))
