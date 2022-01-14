export const karaoke = () => {
    const audio = document.getElementById('karaoke');
    const karaoke = document.getElementById('lyrics');
    let lineIndex = 0;
    let curentLyric, karaText, karaTextHighlight, audInterval;

    const lyrics = [
        ['Karaoké', 0.0 , 8.22],
        ['Un jour je serai le meilleur dresseur', 8.24, 11.05], // 0
        ['Je me battrai sans répit', 11.23, 14.05], // 1
        ['Je ferai tout pour être vainqueur', 15.16, 18.05], // 2
        ['Et gagner les défis', 18.12, 20.21], // 3
        ['Je parcourrai la terre entière', 22.07, 24.19], // 4
    ];

    audio.addEventListener('play', function () {
        audInterval = setInterval(function () {
            if (!curentLyric) {
                return;
            }

            let startTime = curentLyric[1];
            let endTime = curentLyric[2];

            if ((audio.currentTime - startTime) >= 0) {
                let duration = endTime - startTime;
                if (endTime - audio.currentTime > 0) {
                    let ratio = ((100 / duration) * (endTime - audio.currentTime)) - 100;
                    karaTextHighlight.style.width = ratio * -1 + '%';
                } else {
                    lineIndex++;
                    nextLine(lineIndex);
                }
            }
        }, 1000 / 60);
    });

    audio.addEventListener('pause', function () {
        clearInterval(audInterval);
    });

    audio.addEventListener('seeked', function () {
        lineIndex = findLyricIndex();
        nextLine(lineIndex);
    });

    const nextLine = function (index) {
        if (!lyrics[lineIndex]) {
            return;
        }

        const lyric = lyrics[index];

        karaText.textContent = lyric[0];
        karaTextHighlight.textContent = lyric[0];
        karaTextHighlight.style.width = '0%';

        curentLyric = lyric;
    }

    const findLyricIndex = function () {
        if (audio.currentTime === 0) {
            return 0;
        }
        for (let i = 0; i < lyrics.length; i++) {
            if (audio.currentTime >= lyrics[i][1] && audio.currentTime <= lyrics[i][2]) {
                return i;
            } else if (lyrics[i][1] >= audio.currentTime) {
                return i;
            }
        }
        return lyrics.length;
    }

    const init = function () {
        let lyric = lyrics[lineIndex];

        karaText = document.createTextNode(lyric[0]);

        let karaTextLine = document.createElement('div');
        karaTextLine.classList.add('kara-text');

        karaTextHighlight = document.createElement('div');
        karaTextHighlight.classList.add('kara-text-highlight');
        karaTextHighlight.textContent = lyric[0];
        karaTextHighlight.style.width = '0%';

        karaTextLine.appendChild(karaText);
        karaTextLine.appendChild(karaTextHighlight);

        karaoke.appendChild(karaTextLine);

        curentLyric = lyric;
    }

    init();
}

