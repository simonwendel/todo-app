import moment from 'moment';
import 'moment/locale/sv.js';

momentFactory.$inject = ['locale'];
function momentFactory(localeFactory) {
    moment.locale(localeFactory.default);
    return moment;
}

export { momentFactory };
