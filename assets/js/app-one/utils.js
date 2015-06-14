"use strict";

var nextTick = require('next-tick');

module.exports = {
	focusHook: MutableFocusHook,
	objToArr: objectToArray
}

/**
 *  
 *
 */
function objectToArray(obj) {
    return Object.keys(obj).map(function toItem(k) {
        return obj[k];
    });
}

function MutableFocusHook() {
    if (!(this instanceof MutableFocusHook)) {
        return new MutableFocusHook();
    }
}

MutableFocusHook.prototype.hook = function hook(node, property) {
    nextTick(function onTick() {
        if (document.activeElement !== node) {
            node.focus();
        }
    });
};