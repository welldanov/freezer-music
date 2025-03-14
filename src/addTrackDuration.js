const tracks = {
    "56": {
        "title": "Treehouse",
        "album": "Treehouse",
        "release_date": "01/01/2016",
        "cover": "./shared/assets/img/covers/track-covers/Alex G - Treehouse.jpg",
        "path": "./shared/assets/music/indie/Alex G - Treehouse.mp3",
        "artist_id": [
            86
        ]
    },
    "57": {
        "title": "Genesis",
        "album": "Genesis",
        "release_date": "15/09/2020",
        "cover": "./shared/assets/img/covers/track-covers/Grimes - Genesis.jpg",
        "path": "./shared/assets/music/indie/Grimes - Genesis.mp3",
        "artist_id": [
            86
        ]
    },
    "58": {
        "title": "Vision - Slowed",
        "album": "Vision",
        "release_date": "17/12/2019",
        "cover": "./shared/assets/img/covers/track-covers/Hucci - Vision [Slowed Version].jpg",
        "path": "./shared/assets/music/indie/Hucci - Vision [Slowed Version].mp3",
        "artist_id": [
            86
        ]
    },
    "59": {
        "title": "NOOKS OF PILTOVER",
        "album": "NOOKS OF PILTOVER",
        "release_date": "05/10/2024",
        "cover": "./shared/assets/img/covers/track-covers/SØMATIC - NOOKS OF PILTOVER.jpg",
        "path": "./shared/assets/music/indie/SØMATIC - NOOKS OF PILTOVER.wav",
        "artist_id": [
            86
        ]
    },
    "60": {
        "title": "Harpy Hare",
        "album": "Harpy Hare",
        "release_date": "23/06/2021",
        "cover": "./shared/assets/img/covers/track-covers/Yaelokre - Harpy Hare.jpg",
        "path": "./shared/assets/music/indie/Yaelokre - Harpy Hare.mp3",
        "artist_id": [
            86
        ]
    }
}

// Функция для получения длительности аудио
function getAudioDuration(path) {
    return new Promise((resolve) => {
        const audio = new Audio(path);
        audio.addEventListener('loadedmetadata', () => {
            resolve(audio.duration);
        });
        audio.load(); // Начинаем загрузку аудио
    });
}

// Функция для добавления длительности в JSON
async function addDurationsToTracks(tracks) {
    for (const trackId in tracks) {
        const track = tracks[trackId];

        // Если свойство duration отсутствует, добавляем его
        if (!track.duration) {
            try {
                const duration = await getAudioDuration(track.path);
                track.duration = duration; // Добавляем длительность
                console.log(`Длительность для трека "${track.title}" добавлена: ${duration} секунд`);
            } catch (error) {
                console.error(`Ошибка при получении длительности для трека "${track.title}":`, error);
            }
        } else {
            console.log(`Длительность для трека "${track.title}" уже существует: ${track.duration} секунд`);
        }
    }
}

// Запуск функции
addDurationsToTracks(tracks)
    .then(() => {
        console.log("Обновлённый JSON с длительностями:", JSON.stringify(tracks, null, 2));
    })
    .catch((error) => {
        console.error("Ошибка при добавлении длительностей:", error);
    });