const oneSecond = 1000;
const oneMinute = oneSecond * 60;
const oneHour = oneMinute * 60;
const oneDay = oneHour * 24;

export class PrettyDateFormat {
    rtf: Intl.RelativeTimeFormat;

    constructor(locale: string = undefined) {
        if ('RelativeTimeFormat' in Intl)
            this.rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    }

    format(date: Date): string {
        if (this.rtf) {
            const now = new Date().valueOf();
            const timePassed = now - date.valueOf();
            let dateString: string;

            if (timePassed < oneHour) {
                let mins = (timePassed - timePassed % oneMinute) / oneMinute;
                dateString = this.rtf.format(-mins, 'minute');
            }
            else if (timePassed < oneDay) {
                let hours = (timePassed - timePassed % oneHour) / oneHour;
                dateString = this.rtf.format(-hours, 'hours');
            }
            else {
                dateString = date.toLocaleDateString();
            }

            return dateString;
        }
        return this.detailedFormat(date);
    }

    detailedFormat(date: Date): string {
        return date.toLocaleString();
    }
}
