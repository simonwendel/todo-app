/* we do some cordova specific stuff here, so this is apt: */
/* global cordova:true */

ionic.$inject = ['$ionicPlatform'];
function ionic($ionicPlatform) {
    $ionicPlatform.ready(() => {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            window.StatusBar.styleLightContent();
        }
    });
}

export { ionic };
