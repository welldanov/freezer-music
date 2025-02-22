import {renderFunction} from "./shared/lib/renderFunction.js";
import {volumeControl} from "./widgets/player/player.js";
import {genreCollectionRender} from "./widgets/genre-collections/genre-collections.js";


renderFunction('./shared/components/sidebar/sidebar.html', 'sidebar').then();
renderFunction('./shared/components/topbar/topbar.html', 'page-topbar').then();
renderFunction('./widgets/player/player.html', 'player').then(() => {
    volumeControl()
});
genreCollectionRender().then();




