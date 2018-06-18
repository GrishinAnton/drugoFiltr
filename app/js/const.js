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

    var createInstance = function () {
        return {
            getLeftColumn: getLeftColumn,
            getRightColumn: getRightColumn
        }
    }

    return {
        getInstance: function () {
            return instance || (instance = createInstance())
        }
    }

})();

console.log(columns.getInstance().getLeftColumn())

    
