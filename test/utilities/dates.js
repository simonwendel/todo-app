import { localeFactory } from 'js/locale.factory';
import { momentFactory } from 'js/moment.factory';
import { dateUtilityFactory } from 'js/dateUtility.factory';

const dateTestUtility = dateUtilityFactory(momentFactory(localeFactory()));

export { dateTestUtility };
