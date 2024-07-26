<!--Плеер из каталога товаров-->

<audio id="audio" data-track-number="0"></audio>

<div id="area-player"></div>
<script>
window.AbrosTildaPlayer = {
    // Настройки
    catalogID: '#rec548547546', // ID блока каталога
    playerID: '.uc-player', // Класс плеера
    audioID: '#audio', // ID блока проигрователя
    areaID: '#area-player', // ID блока тригера
    cards: '12', // Кол-во карточек на странице
    storepart: '204361755101', // ID Storepart
    // Стили
    // Обложка для карточек
    WrapperBackgroundColor: 'rgba(0, 0, 0, .4)', // Цвет обложки для карточек
    WrapperBorderRadius: 'var(--br-xl)', // Скругление обложки для карточек
    WrapperPlay: 'url(https://static.tildacdn.com/tild6466-3638-4435-b039-396535616330/icons8-play_button_c.svg)', // Иконка кнопки Play
    WrapperPause: 'url(https://static.tildacdn.com/tild6466-3336-4639-b836-633830616365/icons8-pause.svg)', // Иконка кнопки Pause
    // Input громкости и прогресса песни
    TrackSlideColorStart: 'rgba(255,255,255,1)', // Цвет полосок
    TrackSlideColorEnd: 'rgba(126,112,255,1)', // Цвет заполнения полосок
    TrackSlideBorderRadius: '10px', // Скругление полосок
    TrackThumbColor: '#fff', // Цвет тумблера
    TrackThumbBorderRadius: '50%', // Скругление тумблера
    // Стили плеера
    PlayerPlay: 'https://static.tildacdn.com/tild6535-3638-4431-b032-663236313135/btn-play.svg', // Иконка кнопки Play
    PlayerPause: 'https://static.tildacdn.com/tild6232-3534-4633-b165-356465643735/btn-pause.svg', // Иконка кнопки Pause
    PlayerVolumeOn: 'https://static.tildacdn.com/tild6637-6564-4462-b836-623963626335/btn-volume.svg', // Иконка кнопки Вкл.Звук
    PlayerVolumeOff: 'https://static.tildacdn.com/tild3130-3635-4865-a463-376438393336/btn-volume-off.svg', // Иконка кнопки Выкл.Звук
};
</script>
<script src = 'https://cdn.abros.dev/tilda/audioplayer.js'></script>
