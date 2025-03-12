import {renderHomePage} from "../../../index.js";
import {renderExplorePage} from "../../../index.js";
import {renderFavoritesPage} from "../../../index.js";


export function addListenersSidebar() {
    let home = document.getElementById("home-page");
    let explore = document.getElementById("explore-page");
    let favorites = document.getElementById("favorites-page");

    home.addEventListener("click", () => renderHomePage());
    explore.addEventListener("click", () => renderExplorePage());
    favorites.addEventListener("click", () => renderFavoritesPage());
}