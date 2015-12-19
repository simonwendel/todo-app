import moment from 'moment';
import 'moment/locale/sv.js';

momentFactory.$inject = ['locale'];
function momentFactory(locale) {
    if (locale) {
        moment.locale(locale.default);
    }

    return moment;
}

export { momentFactory };
