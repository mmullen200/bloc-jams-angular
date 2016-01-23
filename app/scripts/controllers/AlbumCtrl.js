(function() {
    // AlbumCtrl is an object constructor, and follows the convention of being capitalized to differentiate it from other functions.
    // Here we inject the SongPlayer service.
    function AlbumCtrl(Fixtures, SongPlayer) {
        this.albumData = Fixtures.getAlbum();
        this.songPlayer = SongPlayer;
    }
    
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', 'SongPlayer', AlbumCtrl]);
})();