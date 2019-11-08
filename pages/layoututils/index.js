export const findMaxNumberOfColumn = function (screenwidth, minbeverageitemwidth) {
    const minbeverageitemwidthwrapper = minbeverageitemwidth + 10;
    var availablewidthforrow = screenwidth - 40;
    var maxnumberofcol = Math.floor(availablewidthforrow / minbeverageitemwidthwrapper);
    return maxnumberofcol;
}

export const findMaxNumberOfRow = function (screenheight, minbeverageitemheight) {
    const mincolheight = minbeverageitemheight + 10;
    var availableheightforrow = screenheight - 20;
    var maxnumberofrow = Math.floor(availableheightforrow / mincolheight);
    return maxnumberofrow;
}

export const findNumberOfPages = function (numberofcolumn, numberofslot, maxnumberofrow) {
    var numberofpages = Math.ceil(numberofslot / (maxnumberofrow * numberofcolumn));
    return numberofpages;
}

export const createFakeArray = function (numberofpages) {
    var tempArray = [];
    for (var i = 1; i <= numberofpages; i++) {
        tempArray.push({ id: `${i}` });
    };
    return tempArray;
}

export const findNextPage = function (currentpagenumber, forwarddirection, numberofpages) {
    var nextpage = Number(currentpagenumber);
    if ((forwarddirection && nextpage >= numberofpages) || (!forwarddirection && nextpage <= 1)) {
        nextpage = nextpage;
    }
    if (forwarddirection && nextpage < numberofpages) {
        nextpage = nextpage + 1;
    }
    else if (!forwarddirection && nextpage > 0) {
        nextpage = nextpage - 1;
    }
    return nextpage;
}

export const processFullData = function (noofcol, noofslot, data, pagenumber, noofpages) {
    var noofrow = Math.ceil(noofslot / (noofpages * noofcol));
    var count = 1;
    if (pagenumber > 1) {
        count = count + noofrow * noofcol * (pagenumber - 1);
    }
    var processedData = [];
    for (var i = 1; i <= noofrow; i++) {
        processedData.push({
            rowid: `${i}`,
            rowdata: [],
        });
        for (var c = 1; c <= noofcol; c++) {
            if (count > data.length) {
                processedData[i - 1].rowdata.push(
                    {
                        slotsetting: count,
                        validslots: "6",
                        name: "Not found",
                        price: "10000",
                        imagesource: "https://i.ibb.co/svNhV97/bohuc.png"
                    }
                );
            }
            else {
                processedData[i - 1].rowdata.push(data[count - 1]);
            }
            count = count + 1;
        }
        if (i == noofrow) {
            return processedData;
        }
    }
}

export const isNotZero = function(number){
    if(number!=0) 
    {
        return true;
    }

    else {
        return false;
    }
}