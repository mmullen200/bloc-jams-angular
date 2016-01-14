(function() {
    // AlbumControl is an object constructor, and follows the convention of being capitalized to differentiate it from other functions.
    function AlbumCtrl() {
        // I don't know what they mean when they say that albumData "holds a copy of" albumPicasso.
        this.albumData = albumPicasso;
    }
    
    
    angular
        .module('blocJams')
        .controller('AlbumCtrl', AlbumCtrl);
})();