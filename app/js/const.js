export const columns = (function () {

    var leftColumn = [],
        rightColumn = [],
        instance

    var getLeftColumn = function () {
        return leftColumn
    }

    var getRightColumn = function () {
        return rightColumn
    }

    var setLeftColumn = function (arr) {
        leftColumn = arr
    }

    var setRightColumn = function (arr) {
        rightColumn = arr
    }

    var createInstance = function () {
        return {
            getLeftColumn: getLeftColumn,
            getRightColumn: getRightColumn,
            setLeftColumn: setLeftColumn,
            setRightColumn: setRightColumn
        }
    }

    return {
        getInstance: function () {
            return instance || (instance = createInstance())
        }
    }

})();    
