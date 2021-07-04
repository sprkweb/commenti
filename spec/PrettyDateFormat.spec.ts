import { expect } from 'chai'
import { PrettyDateFormat } from '../src/helpers/PrettyDateFormat';

describe('PrettyDateFormat', () => {
    it("can be used without a locale", () => {
        const f = new PrettyDateFormat();
        expect(f.format(new Date(2007, 0, 1))).to.not.be.empty;
    });

    it("can be initialized with a locale passed", () => {
        const f = new PrettyDateFormat('ru');
        expect(f.format(new Date(2007, 0, 1))).to.not.be.empty;
    });

    it("formats it as a date if it was long time ago", () => {
        const f = new PrettyDateFormat('en');
        expect(f.format(new Date(2007, 0, 1))).to.be.equal('1/1/2007');
    });

    it("formats it as a number of hours if it was today", () => {
        const f = new PrettyDateFormat('en');
        const TwentyThreeHoursAgo = new Date(new Date().getTime() - 1000 * 60 * 60 * 22);
        expect(f.format(TwentyThreeHoursAgo)).to.be.equal('22 hours ago');
    });

    it("formats it as a number of minutes if it was less than an hour ago", () => {
        const f = new PrettyDateFormat('en');
        const FiftyNineMinsAgo = new Date(new Date().getTime() - 1000 * 60 * 55);
        expect(f.format(FiftyNineMinsAgo)).to.be.equal('55 minutes ago');
    });

    it("doesn't show time if it was less than a minute ago", () => {
        const f = new PrettyDateFormat('en');
        const FiftyNineMinsAgo = new Date(new Date().getTime() - 1000 * 30);
        expect(f.format(FiftyNineMinsAgo)).to.be.equal('this minute');
    });

    it("can format it in other locales", () => {
        const f = new PrettyDateFormat('ru');
        const FiftyNineMinsAgo = new Date(new Date().getTime() - 1000 * 60 * 2);
        expect(f.format(FiftyNineMinsAgo)).to.be.equal('2 минуты назад');
    });
})
