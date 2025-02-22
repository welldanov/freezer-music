import {renderFunction} from "./shared/lib/renderFunction.js";
import {volumeControl} from "./widgets/player/player.js";

renderFunction('./shared/components/sidebar/sidebar.html', 'sidebar').then();
renderFunction('./widgets/player/player.html', 'player').then(() => {
    volumeControl()
});



