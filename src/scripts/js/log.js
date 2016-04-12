/**
 * 日志统一处理
 * Copyright 2015-2016 1VERGE Inc, log.js
 * MIT Licensed
 * @since 2015/9/2.
 * @modify 2016/4/7.
 * @author zhengzk
 **/
var noop = function () {
};

var console = window['console'] || {
        'log': noop,
        'warn': noop,
        'error': noop
    };

var _log = function (type, args) {

    var argsArray = [].slice.call(args);
    if (type) {
        // add the type to the front of the message
        argsArray.unshift(type.toUpperCase() + ':');
    } else {
        // default to log with no prefix
        type = 'log';
    }

    // add to history
    log.history.push(argsArray);

    // add console prefix after adding to history
    argsArray.unshift('@NAME:');

    // call appropriate log function
    if (console[type].apply) {
        console[type].apply(console, argsArray);
    } else {
        // ie8 doesn't allow error.apply, but it will just join() the array anyway
        console[type](argsArray.join(' '));
    }
};
var log = function () {
    _log('log', arguments);
};

log.error = function () {
    _log('error', arguments);
};

log.warn = function () {
    _log('warn', arguments);
};

log.history = [];

module.exports = log;
