import { capitalizeFirstLetter } from "./string";

export const slugToString = (slug: string) => {
    return slug
        .split('-')
        .map(capitalizeFirstLetter)
        .join(' ');
}

export const documentTitleFromPath = (siteTitle: (string), path: string) => {
    let pathAr = path.split('/').reduce((acc: string[], c: string) => {
        if (c !== '') acc.push(c);
        return acc;
    }, []);

    switch (pathAr.length) {
        case 0: return siteTitle;
        default: return `${slugToString(pathAr[pathAr.length - 1])} | ${capitalizeFirstLetter(siteTitle)}`;
    }
}

export const getUrlSearchParams = (href: string) => {
    return new URL(href).search.split('&')
        .map((f, i) => (i === 0) ? f.replace('?', '') : f)
        .map(f => {
            let parts = f.split("=");
            return { [parts[0]]: parts[1] }
        })
        .reduce((acc, v) => {
            let keys = Object.keys(v);
            acc[keys[0]] = v[keys[0]];
            return acc;
        }, {});
};