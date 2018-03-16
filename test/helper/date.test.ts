import * as moment from 'moment';

import {DateHelper} from '../../src/helper/date';

describe('Date Helper', () => {
  test('isValidTokenExpireAt', async (done) => {
    const yesterday = moment().utc().subtract(1, 'day').toDate();
    const tomorrow = moment().utc().add(1, 'day').toDate();
    expect(DateHelper.isValidTokenExpireAt(yesterday)).toBe(false);
    expect(DateHelper.isValidTokenExpireAt(tomorrow)).toBe(true);
    done();
  });

  test('getTimestamp', async (done) => {
    const expectedTimestamp = 1520914530;
    const date = moment('2018-03-13T04:15:30+00:00').toDate();
    expect(DateHelper.getTimestamp(date)).toBe(expectedTimestamp);
    done();
  });
});