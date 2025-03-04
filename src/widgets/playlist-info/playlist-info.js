import {allTracksDurationConverter} from "../../shared/lib/trackDurationConverter.js";

export async function playlistInfoRender(playlistId) {
    let html = ``;

    let playlistSection = document.querySelector("#playlist-section");

    // Получаем данные плейлистов JSON
    let response = await fetch("./entities/playlists.json");
    let data = await response.json();
    const playlists = JSON.parse(JSON.stringify(data));

    const playlist = playlists["genres"][playlistId];

    response = await fetch("./entities/tracks.json");
    data = await response.json();
    const tracks = JSON.parse(JSON.stringify(data));

    let totalDuration = 0;
    for (let i of playlist["tracks"]) {
        totalDuration += tracks[i.toString()]["duration"];
    }

    // Сборка html
    html = `
        <div class="playlist-info playlist-info_spaced">
            <div class="playlist-info__cover">
                <img src="${playlist["cover"]}" alt="Playlist Cover">
            </div>
            <div class="playlist-info__info">
                <div class="main-body-heading main-body-heading_spaced">${playlist["name"]}</div>
                <div class="playlist-creator playlist-creator_spaced">
                    <div class="playlist-creator__avatar">
                        <img src="./shared/assets/img/avatar.jpg" alt="Playlist Creator Avatar">
                    </div>
                    <span class="playlist-creator__name">Freezer Creators</span>
                </div>
                <ul class="playlist-info-list playlist-info-list_spaced">
                    <li>${playlist["tracks"].length} tracks</li>
                    <li>${allTracksDurationConverter(totalDuration)}</li>
                    <li>${playlist["fans"]} fans</li>
                </ul>
                <ul class="playlist-info-list playlist-info-list_spaced">
                    <li>Updated: ${playlist["updated"]}</li>
                </ul>
                <p class="playlist-info__description playlist-info__description_spaced">${playlist["description"]}</p>
            </div>
        </div>
        <div class="playlist-actions playlist-actions_spaced">
            <div class="playlist-action__controls">
                <button class="playlist-action__button playlist-action__main-button playlist-action__play-button " type="button">
                    <svg viewBox="0 0 24 24" focusable="false" data-testid="PlayFilledIcon" aria-hidden="true"><path d="M18.316 7.886a128.013 128.013 0 0 0-7.125-4.113 117.187 117.187 0 0 0-5.309-2.675 1.04 1.04 0 0 0-1.478.854 117.208 117.208 0 0 0-.338 5.934 128.233 128.233 0 0 0 0 8.228c.066 2.05.18 4.035.338 5.934a1.04 1.04 0 0 0 1.478.854 118.13 118.13 0 0 0 5.31-2.675 128.263 128.263 0 0 0 7.124-4.113 116.948 116.948 0 0 0 5.021-3.296.997.997 0 0 0 0-1.636 117.073 117.073 0 0 0-5.021-3.296Z"></path></svg>
                </button>
                <button class="playlist-action__button playlist-action__main-button" type="button">
                    <svg viewBox="0 0 24 24" focusable="false" data-testid="HeartOutlinedIcon" aria-hidden="true"><path d="M22.95 7.174c-.172-1.295-.8-2.38-1.816-3.138-1.143-.875-2.493-1.205-3.919-.954-1.018.179-1.983.634-2.854 1.238A11.52 11.52 0 0 0 12 6.55a11.602 11.602 0 0 0-2.242-2.146c-.9-.646-1.908-1.135-2.973-1.322-1.426-.251-2.777.079-3.919.954-1.015.758-1.644 1.843-1.815 3.138-.355 2.677 1.21 5.754 2.797 7.738a23.24 23.24 0 0 0 2.988 3.117c1.339 1.15 2.825 2.129 4.45 2.842.22.097.477.129.714.129s.493-.032.714-.13c1.609-.705 3.08-1.67 4.409-2.806a23.202 23.202 0 0 0 3.03-3.152c1.586-1.984 3.15-5.061 2.796-7.738Zm-4.351 6.543c-.47.67-1.375 1.652-2.454 2.608-1.284 1.14-2.814 2.243-4.145 2.739-1.225-.457-2.617-1.426-3.832-2.465-1.215-1.04-2.252-2.148-2.767-2.882-1.267-1.808-2.651-4.342-2.393-6.293.105-.793.45-1.397 1.056-1.847l.013-.01c.707-.544 1.48-.735 2.36-.577.803.141 1.668.581 2.487 1.235.82.654 1.595 1.522 2.22 2.522L12 10.07l.856-1.324a10.165 10.165 0 0 1 2.152-2.467c.84-.684 1.73-1.145 2.556-1.29.879-.158 1.652.033 2.36.577l.012.01c.606.45.95 1.054 1.056 1.847.258 1.95-1.126 4.485-2.393 6.293Z"></path></svg>
                </button>
                <button class="playlist-action__button playlist-action__main-button" type="button">
                    <svg viewBox="0 0 24 24" focusable="false" data-testid="ShareIcon" aria-hidden="true"><path d="M12.1 2v4.76c-3.98.86-6.49 3.38-7.98 5.69-.82 1.27-1.36 2.51-1.69 3.42-.17.46-.28.84-.36 1.11-.04.14-.07.25-.08.32-.01.04-.02.07-.02.09l-.01.03v.01l-.63 2.96c-.07.34.2.61.49.61.12 0 .24-.04.34-.14L4.4 18.7l.03-.02c.03-.02.07-.06.12-.11.11-.1.29-.25.52-.43.46-.36 1.13-.85 1.97-1.33 1.36-.79 3.11-1.54 5.05-1.79v5.86l6.14-5.36L23 11.43 12.1 2zm4.81 12.01-2.82 2.47v-3.73l-2.26.29c-1.92.25-3.92.95-5.79 2.04-.53.3-1.04.63-1.55 1 .28-.7.71-1.61 1.31-2.54 1.15-1.78 3.25-4.07 6.72-4.82l1.58-.34V6.37l5.84 5.05-3.03 2.59z"></path></svg>
                </button>
                <button class="playlist-action__button playlist-action__main-button" type="button">
                    <svg viewBox="0 0 24 24" focusable="false" data-testid="MoreHorizontalIcon" aria-hidden="true"><path d="M3.53 10.436c.32-.29.8-.436 1.47-.436.585 0 1.048.134 1.38.402.409.33.62.862.62 1.598 0 .672-.14 1.172-.46 1.504-.321.332-.821.496-1.54.496-.658 0-1.138-.144-1.463-.436C3.168 13.234 3 12.714 3 12c0-.708.16-1.231.53-1.564ZM12 10c-.67 0-1.15.146-1.47.436-.37.333-.53.856-.53 1.564 0 .714.168 1.234.537 1.564.325.292.805.436 1.463.436.719 0 1.219-.164 1.54-.496.32-.332.46-.832.46-1.504 0-.736-.211-1.269-.62-1.598-.332-.268-.795-.402-1.38-.402Zm7 0c-.67 0-1.15.146-1.47.436-.37.333-.53.856-.53 1.564 0 .714.169 1.234.537 1.564.325.292.805.436 1.463.436.719 0 1.219-.164 1.54-.496.32-.332.46-.832.46-1.504 0-.736-.211-1.269-.62-1.598-.332-.268-.795-.402-1.38-.402Z"></path></svg>
                </button>
            </div>
            <div class="page-search">
                <div class="page-search__container">
                    <div class="page-btn">
                        <svg viewBox="0 0 24 24" focusable="false" class="" data-testid="SearchOutlinedIcon" aria-hidden="true">
                            <path d="M10.947 5.35c3.725 0 5.614 1.89 5.614 5.614 0 1.513-.326 2.745-.967 3.661l-.392.477-.398.374c-.925.731-2.223 1.102-3.857 1.102-3.725 0-5.614-1.889-5.614-5.614 0-3.725 1.889-5.613 5.614-5.613Zm0-1.332C6.486 4.018 4 6.503 4 10.964s2.486 6.947 6.947 6.947c1.955 0 3.53-.478 4.684-1.39l3.243 3.462L20 18.927l-3.315-3.537c.79-1.127 1.209-2.61 1.209-4.426 0-4.46-2.486-6.946-6.947-6.946Z"></path>
                        </svg>
                    </div>
                    <input class="page-search__input" id="topbar-search" type="search" aria-label="Search"
                           placeholder="Search within tracks" autocomplete="off" value="">
                </div>
            </div>
        </div>
    `
    playlistSection.insertAdjacentHTML('beforeend', html);
}

