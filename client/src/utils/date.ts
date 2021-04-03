
var moment = require("moment");

export const format_DDD_MMM_Do_YYYY = (dateISO: number) => {
    let dateFormated = moment.unix(dateISO).format("ddd MMM Do YYYY");
    return dateFormated;
};

export const format_DDDD_MMM_Do_YYYY = (dateISO: number) => {
    let dateFormated = moment.unix(dateISO).format("dddd, MMM Do YYYY");
    return dateFormated;
};

export const format_DD_MM_YYYY = (dateISO: number) => {
    let dateFormated = moment.unix(dateISO).format("D/MM/YYYY");
    return dateFormated;
};

export const format_range_DDDD_MMM_Do_YYYY = (rangeISO: { start: number, end: number }) => {
    let { start, end } = rangeISO;
    let dateFormated = moment.unix(start).format("dddd, MMM Do YYYY") + " — " + moment.unix(end).format("dddd, MMM Do YYYY");
    return dateFormated;
};

export const format_range_DDD_MMM_Do_YYYY = (rangeISO: { start: number, end: number }) => {
    let { start, end } = rangeISO;
    let dateFormated = moment.unix(start).format("ddd, MMM Do YYYY") + " — " + moment.unix(end).format("ddd, MMM Do YYYY");
    return dateFormated;
};

export const isExpired = (expiryTime: number) => {
    let now = Math.floor(Date.now() / 1000);
    return expiryTime < now;
}

// export const difference = (startTime: number, endTime: number) => {
//     // let now = Math.floor(Date.now() / 1000);
//     console.log(startTime);
//     console.log(endTime);
//     return startTime - endTime;
//     // return expiryTime < now;
// }

export const difference = {

    inHours: (d1: Date, d2: Date) => {
        const t2 = d2.getTime();
        const t1 = d1.getTime();

        return (t2 - t1) / (3600 * 1000);
    },
    inDays: (d1: Date, d2: Date) => {
        const t2 = d2.getTime();
        const t1 = d1.getTime();

        return (t2 - t1) / (24 * 3600 * 1000);
    },

    inWeeks: (d1: Date, d2: Date) => {
        const t2 = d2.getTime();
        const t1 = d1.getTime();

        return (t2 - t1) / (24 * 3600 * 1000 * 7);
    },

    inMonths: (d1: Date, d2: Date) => {
        const d1Y = d1.getFullYear();
        const d2Y = d2.getFullYear();
        const d1M = d1.getMonth();
        const d2M = d2.getMonth();

        return (d2M + 12 * d2Y) - (d1M + 12 * d1Y);
    },

    inYears: (d1: Date, d2: Date) => {
        return d2.getFullYear() - d1.getFullYear();
    }
}