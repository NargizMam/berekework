import dayjs from 'dayjs';

interface IDateFormat {
  date: IDateObject;
}

interface IDateObject {
  format: string;
}

class FormatDate {
  private datetimeRegex = /^(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2})$/;
  public date;

  constructor(public dataTime: string | Date) {
    this.date = dayjs(new Date(dataTime)).format('DD.MM.YYYY HH:mm');
  }

  getFormatDate() {
    const dataArr = this.datetimeRegex.exec(this.date) as RegExpExecArray;
    const date: IDateFormat = {
      date: {
        format: `${dataArr[1]}.${dataArr[2]}.${dataArr[3]}`,
      },
    };

    return date.date.format;
  }
}

export default FormatDate;
