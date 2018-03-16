import * as moment from 'moment';
import {Moment, unitOfTime} from 'moment';

export interface DateInterval {
  start: Date;
  end: Date;
}

export class DateHelper {
  static getCurrentUtcDateTime(): Date {
    return moment().utc().toDate();
  }

  static isValidTokenExpireAt(date: Date): boolean {
    const tokenExpireAt: Moment = moment.utc(date);
    return !moment.utc().isAfter(tokenExpireAt);
  }

  static getNewTokenExpireAt(): Date {
    return moment.utc().add(6, 'months').toDate();
  }

  static getTimestamp(date?: Date): number {
    return date ? moment.utc(date).unix() : moment().unix();
  }
}