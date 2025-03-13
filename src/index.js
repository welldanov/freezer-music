import {renderFunction} from "./shared/lib/renderFunction.js";
import {setRepeat ,volumeControl} from "./widgets/player/player.js";
import {genreCollectionRender} from "./widgets/genre-playlists/genre-playlists.js";
import {renderData} from "./shared/lib/localStorageController.js";
import {addListenersSidebar} from "./shared/components/sidebar/sidebar.js";


function renderFirstLaunch() {
    renderFunction('./shared/components/sidebar/sidebar.html', 'sidebar').then(() => {
        addListenersSidebar();
    });
    renderFunction('./shared/components/topbar/topbar.html', 'page-topbar').then();
    renderFunction('./widgets/player/player.html', 'player').then(() => {
        volumeControl();
        renderData(true);
        setRepeat();
        // setShuffle();
    });
    renderFunction('./pages/explore-page/explore-page.html', 'main-body-container').then(() => {
        genreCollectionRender().then();
    });
}

export function renderHomePage() {
    document.getElementById("explore-page").className = "page-link-item";
    document.getElementById("favorites-page").className = "page-link-item";

    document.getElementById("home-page").classList.add("page-link-item_chosen");
    document.getElementById("main-body-container").innerHTML = "";
}

export function renderExplorePage() {
    document.getElementById("home-page").className = "page-link-item";
    document.getElementById("favorites-page").className = "page-link-item";

    document.getElementById("explore-page").classList.add("page-link-item_chosen");
    document.getElementById("main-body-container").innerHTML = "";
    renderFunction('./pages/explore-page/explore-page.html', 'main-body-container').then(() => {
        genreCollectionRender().then();
    });
}

export function renderFavoritesPage() {
    document.getElementById("home-page").className = "page-link-item";
    document.getElementById("explore-page").className = "page-link-item";

    document.getElementById("favorites-page").classList.add("page-link-item_chosen");
    document.getElementById("main-body-container").innerHTML = "";
}

renderFirstLaunch();