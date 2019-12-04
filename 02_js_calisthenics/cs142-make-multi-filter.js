"use-strict";

var cs142MakeMultiFilter = function (originalArray) {
    var currentArray = originalArray;
    var arrayFilterer = function (filterCriteria, callback) {
        if (typeof filterCriteria !== "function") {
			return currentArray;
        }
        var filteredArray = [];
        for (var i=0; i < currentArray.length; i++) {
            var value = currentArray[i];
            if (filterCriteria(value)) {
				filteredArray.push(value);
			}
        }
        currentArray = filteredArray;
        if (typeof callback === "function") {
            callback.call(originalArray,currentArray);
        }
        return arrayFilterer;
    };
    return arrayFilterer;
};