const validations = {
    isPositiveInt: function(vlaues, value) {
        return !value || /^[1-9]\d*$/.test(value);
    },
    isNegativeInt: function(vlaues, value) {
        return !value || /^-[1-9]\d*$/.test(value);
    },
    isNonNegativeInt: function(vlaues, value) {
        return !value || /^0|[1-9]\d*$/.test(value);
    }
};

module.exports = validations;