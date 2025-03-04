import {playlistPageRender} from "../../pages/playlist-page/playlist-page.js";


export async function genreCollectionRender() {
    let html = `<div class="channel-section__collections"></div>`
    document.querySelector(".channel-section").insertAdjacentHTML('beforeend', html);

    let collectionsContainer = document.querySelector(".channel-section__collections");

    const response = await fetch("./entities/playlists.json");
    const data = await response.json();
    const collections = JSON.parse(JSON.stringify(data));
    let count = 1;

    // Сборка html
    for (let i of Object.keys(collections["genres"])) {
        html = `
        <a id="channel-section__item${count}" class="channel-section__item" href="#">
            <div class="channel-section__title-cover">
                <h2 class="channel-section-collection-title channel-section-collection-title_spaced">${collections["genres"][i]["name"]}</h2>
                <div class="channel-section-collection-cover">
                    <img src="${collections["genres"][i]["cover"]}" alt="Collection Cover">
                </div>
            </div>
        </a>
        `
        collectionsContainer.insertAdjacentHTML('beforeend', html);
        let collectionItem = document.getElementById(`channel-section__item${count}`);
        collectionItem.addEventListener('click', () => playlistPageRender(i, collections["genres"][i]["tracks"]));
        count++;
    }
}

