const asyncSerialForEach = Symbol('asyncSerialForEach');

Array.prototype[asyncSerialForEach] = async function (callback, thisArg) {
    if (this == null) {
        // this should be the array in which we perform the async iteration
        throw new TypeError('this array is null or undefined');
    }

    const O = Object(this);
    const len = O.length >>> 0;

    if (typeof callback !== 'function') {
        throw new TypeError(callback + ' is not a function');
    }

    let T;
    if (typeof thisArg !== 'undefined') {
        T = thisArg;
    }

    let k = 0;
    while (k < len) {
        let kValue;
        
        if (k in O) {
            kValue = O[k];
            
            await callback.call(T, kValue, k, O);
        }
        
        k++;
    }

    // forEach returns undefined
    return;
};

export { asyncSerialForEach };
