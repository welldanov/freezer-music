const tracks = {
    "21": {
        "title": "MUDD",
        "album": "MUDD",
        "release_date": "02/09/2022",
        "cover": "./shared/assets/img/covers/track-covers/$werve, Grioten, Day$okee - MUDD.jpg",
        "path": "./shared/assets/music/hip-hop/$werve, Grioten, Day$okee - MUDD.mp3",
        "artist_id": [
            44
        ]
    },
    "22": {
        "title": "Stay With Me",
        "album": "Stay With Me",
        "release_date": "11/10/2020",
        "cover": "./shared/assets/img/covers/track-covers/1nonly - Stay With Me.jpg",
        "path": "./shared/assets/music/hip-hop/1nonly - Stay With Me.mp3",
        "artist_id": [
            44
        ]
    },
    "23": {
        "title": "Drop It Like It's Hot",
        "album": "Drop It Like It's Hot",
        "release_date": "31/05/2020",
        "cover": "./shared/assets/img/covers/track-covers/HAARPER - Drop It Like It's Hot.jpg",
        "path": "./shared/assets/music/hip-hop/HAARPER - Drop It Like It's Hot.mp3",
        "artist_id": [
            44
        ]
    },
    "24": {
        "title": "THE ALCHEMIST",
        "album": "THE ALCHEMIST",
        "release_date": "30/07/2020",
        "cover": "./shared/assets/img/covers/track-covers/HAARPER - THE ALCHEMIST.jpg",
        "path": "./shared/assets/music/hip-hop/HAARPER - THE ALCHEMIST.mp3",
        "artist_id": [
            44
        ]
    },
    "25": {
        "title": "Last Laugh",
        "album": "Last Laugh",
        "release_date": "21/04/2024",
        "cover": "./shared/assets/img/covers/track-covers/iamjakehill - Last Laugh.jpg",
        "path": "./shared/assets/music/hip-hop/iamjakehill - Last Laugh.mp3",
        "artist_id": [
            44
        ]
    },
    "26": {
        "title": "9mm",
        "album": "Memphis Cult Vol. 6",
        "release_date": "23/02/2023",
        "cover": "./shared/assets/img/covers/track-covers/Memphis Cult, Groove Dealers, SPLYXER - 9mm.jpg",
        "path": "./shared/assets/music/hip-hop/Memphis Cult, Groove Dealers, SPLYXER - 9mm.mp3",
        "artist_id": [
            44
        ]
    },
    "27": {
        "title": "Death Lotto",
        "album": "Death Lotto",
        "release_date": "11/07/2022",
        "cover": "./shared/assets/img/covers/track-covers/ovg!, Grioten - Death Lotto.jpg",
        "path": "./shared/assets/music/hip-hop/ovg!, Grioten - Death Lotto.mp3",
        "artist_id": [
            44
        ]
    },
    "28": {
        "title": "Rave in the Grave",
        "album": "Bohemian Psycho",
        "release_date": "31/03/2019",
        "cover": "./shared/assets/img/covers/track-covers/REDZED - Rave in the Grave.jpg",
        "path": "./shared/assets/music/hip-hop/REDZED - Rave in the Grave.mp3",
        "artist_id": [
            44
        ]
    },
    "29": {
        "title": "lick!",
        "album": "lick!",
        "release_date": "09/08/2024",
        "cover": "./shared/assets/img/covers/track-covers/Sadfriendd, Ghostface Playa - lick!.jpg",
        "path": "./shared/assets/music/hip-hop/Sadfriendd, Ghostface Playa - lick!.mp3",
        "artist_id": [
            44
        ]
    },
    "30": {
        "title": "A HOCKEY MASK AND A REAL BAD ATTITUDE",
        "album": "A HOCKEY MASK AND A REAL BAD ATTITUDE",
        "release_date": "07/01/2022",
        "cover": "./shared/assets/img/covers/track-covers/SXMPRA, Teddy Slugz - A HOCKEY MASK AND A REAL BAD ATTITUDE.jpg",
        "path": "./shared/assets/music/hip-hop/SXMPRA, Teddy Slugz - A HOCKEY MASK AND A REAL BAD ATTITUDE.mp3",
        "artist_id": [
            44
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