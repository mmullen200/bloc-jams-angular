(function() {
    // AlbumControl is an object constructor, and follows the convention of being capitalized to differentiate it from other functions.
    function AlbumCtrl(Fixtures) {
   
        this.albumData = Fixtures.getAlbum();
    }
    
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', ['Fixtures', AlbumCtrl]);
})();