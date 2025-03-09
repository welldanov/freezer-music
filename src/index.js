import {renderFunction} from "./shared/lib/renderFunction.js";
import {volumeControl} from "./widgets/player/player.js";
import {genreCollectionRender} from "./widgets/genre-playlists/genre-playlists.js";
import {renderData} from "./shared/lib/localStorageController.js";

import {playlistPageRender} from "./pages/playlist-page/playlist-page.js";


renderFunction('./shared/components/sidebar/sidebar.html', 'sidebar').then();
renderFunction('./shared/components/topbar/topbar.html', 'page-topbar').then();
renderFunction('./widgets/player/player.html', 'player').then(() => {
    volumeControl()
    renderData(true)
});
renderFunction('./pages/explore-page/explore-page.html', 'main-body-container').then(() => {
    genreCollectionRender().then();
});
// playlistPageRender().then();



