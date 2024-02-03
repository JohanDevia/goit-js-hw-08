import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

function saveTime(time) {
  localStorage.setItem('videoplayer-current-time', time);
}

const throttledSaveTime = throttle(saveTime, 1000);

player.on('timeupdate', function (data) {
  throttledSaveTime(data.seconds);
});

const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  player.setCurrentTime(savedTime);
}
