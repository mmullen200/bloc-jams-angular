(function(){
    function SongPlayer() {
        // We create a variable and set an empty object. The service returns this object, making its properties and methods public to the rest of the application.
        var SongPlayer = {};
        
        var currentSong = null;
        
        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;
        
        
        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as                currentBuzzObject
        * @param {Object} song
        */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                currentSong.playing = null;
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            currentSong = song;
        };
        
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                
            setSong(song);
            
            currentBuzzObject.play();
            song.playing = true;
                
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    currentBuzzObject.play();
                }
            }
        };
        
        SongPlayer.pause = function(song) {
          currentBuzzObject.pause();
            song.playing = false;
        };
        
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();