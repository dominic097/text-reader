import { FileViewerProps } from "../components";

export const getSubStringIndex = (searchStr: string, data: string, caseSensitive: boolean): Array<number> => {
    const searchStrLen: number = searchStr.length;

    if (searchStrLen == 0) {
        return [];
    }

    let startIndex = 0;
    let index
    let indices = [];

    // convert to lowercase for case in-sensitive search 
    if (!caseSensitive) {
        data = data.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }

    while ((index = data.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }

    return indices;
}

export interface MatchDataMeta {
    data: string;
    isSearchMatch: boolean;
}

export const splitTextByIndex = (index: Array<number>, length: number, data: string): Array<MatchDataMeta> => {
    let strArray: Array<MatchDataMeta> = [];

    if (index.length <= 0 || length <= 0) {
        return [{ data, isSearchMatch: false }];
    }

    if (index[0] >= 0) {
        strArray.push({ data: data.slice(0, index[0]), isSearchMatch: false });
        // data = data.slice(index[0] + length, data.length)
    }

    if (index.length === 1) {
        const i = index[0];
        strArray.push({ data: data.slice(i, i + length), isSearchMatch: true });
        strArray.push({ data: data.slice(i + length, data.length), isSearchMatch: false })
        return strArray;
    }

    index.forEach((j, k) => {
        strArray.push({ data: data.slice(j, j + length), isSearchMatch: true });
        if (k < index.length) {
            strArray.push({ data: data.slice(j + length, index[k + 1]), isSearchMatch: false })
        }
        // data = data.slice(i + length + 1, data.length);
    });

    // strArray.push(data);

    return strArray;
}


export const fileReader = (file: any,
    onloadCb: (data: string) => void,
    onerrorCb?: (e: any) => {},): void => {
    let reader = new FileReader();
    reader.readAsText(file.originFileObj);
    reader.onload = function () {
        onloadCb(reader.result ? reader.result.toString() : "");
    };

    reader.onerror = function () {
        console.log(reader.error);
        console.error(new DOMException("Problem parsing input file."));
        if (onerrorCb) {
            onerrorCb(reader.error);
        }
    };
}
