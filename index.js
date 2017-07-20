'use strict';
/* Commented Code
const _MESSAGE_OF_NULL_REFERENCES = argName => argName + ' is null (a) references.';
const _MESSAGE_OF_NULL_ARGUMENTS = argName => argName + ' is null (an) arguments';
const _MESSAGE_OF_INVALID_ARGUMENTS = (argName, needsType) => argName + ' is (an) invalid arguments.' + (needsType !== undefined) ? 'It\'s have to ' + needsType : '';
const _MESSAGE_OF_NOT_SUPPORT_ARGUMENTS	= (argName, argObject) => typeof argObject + ' type of ' + argName + ' argument is not support';
*/
/* Commented Code
const _isFunction = fn => typeof fn === 'function';

const _isArray = obj => typeof obj === 'object' && Array.isArray(obj);

const _isObject = obj => typeof obj === 'object' && !_isArray(obj);

const _isNumber = obj => typeof obj === 'number' || obj instanceof Number;

const _isString = obj => typeof obj === 'string' || obj instanceof String;

const _isBoolean = obj => typeof obj === 'boolean';

function cloneObject(obj) {
	if (_isString(obj) || _isNumber(obj) || _isBoolean(obj)) {
		return obj.constructor(obj);
	}
	if (_isArray(obj)) {
		return obj.slice(0);
	}
	const keys = Object.getOwnPropertyNames(obj);
	if (keys && keys.length === 0) {
		return {};
	}
	const newObj = {};
	keys.forEach(key => {
		const item = obj[key];
		if (_isObject(item)) {
			cloneObject(item);
		}
		newObj[key] = item;
	});
	return newObj;
}
*/

/**
 * combine call to processFunction wich each possible combination of elements in arr1 and arr2
 * and return a array with the result of each call to processFunction.
 *
 * @param {*} arr1, array of elements.
 * @param {*} arr2, array of elements.
 * @param {*} processFunction, this function will get each combination of arr1 and arr2 element and return new element.
 */
const combine = (arr1, arr2, processFunction) =>
	arr1.map(e1 => arr2.map(e2 => processFunction(e1, e2))).reduce((t, c) => t.concat(c), []);

const sort = (array, compareFunction) => array.slice(0).sort(compareFunction);

const testFunction = (value2, compareFunction) => value1 => compareFunction(value1, value2);

const _filterFunction = compareFunction =>
	(currentValue, index, srt) =>
		(index === 0) ? true : compareFunction(currentValue, srt[index - 1]) !== 0;

const filter = (srt, compareFunction) => srt.filter(_filterFunction(compareFunction));

const sortFilter = (array, compareFunction) => filter(sort(array, compareFunction), compareFunction);

const _notEqualFunction = (srt, equalValue) =>
	(currentValue, index) => equalValue(currentValue, srt[index]) === false;

const equal = (srt1, srt2, equalValue) =>
	srt1.length === srt2.length && srt1.findIndex(_notEqualFunction(srt2, equalValue)) === -1;

const _notEqualIndexFunction = (srt, compareFunction) =>
	(currentValue, index) => compareFunction(currentValue, srt[index]) !== 0;

const _compare = (srt, srtBigger, compareFunction) => {
	const index = srt.findIndex(_notEqualIndexFunction(srtBigger, compareFunction));
	return (index === -1) ? srt.length - srtBigger.length : compareFunction(srt[index], srtBigger[index]);
};

const compare = (srt1, srt2, compareFunction) =>
	srt1.length > srt2.length ?
		-1 * _compare(srt2, srt1, compareFunction) : _compare(srt1, srt2, compareFunction);

const union = (srt1, srt2, compareFunction) =>
	srt1.concat(srt2).sort(compareFunction).filter(_filterFunction(compareFunction));

const sliceFind = (srt, value, compareFunction) => {
	const index = srt.findIndex(currentValue => compareFunction(currentValue, value) >= 0);
	return (index >= 0) ? srt.slice(index) : [];
};

const _filterAheadFunction = (srt, compareFunction) =>
	currentValue => {
		srt = sliceFind(srt, currentValue, compareFunction);
		return srt.length > 0 && compareFunction(currentValue, srt[0]) === 0;
	};

const intersection = (srt1, srt2, compareFunction) =>
	srt1.filter(_filterAheadFunction(srt2, compareFunction));

const _filterNotAheadFunction = (srt, compareFunction) =>
	currentValue => {
		srt = sliceFind(srt, currentValue, compareFunction);
		return (srt.length === 0) ? true : compareFunction(currentValue, srt[0]) !== 0;
	};

const exclusion = (srt1, srt2, compareFunction) =>
	srt1.filter(_filterNotAheadFunction(srt2, compareFunction));

const mutualExclusion = (srt1, srt2, compareFunction) =>
	srt1.concat(srt2).sort(compareFunction).filter(_filterFunction(compareFunction));

const _findIndexBinary = (srt, testFunction) => {
	let start = 0;
	let stop = srt.length - 1;
	let middle = Math.floor((stop + start) / 2);
	while (testFunction(srt[middle]) !== 0 && start < stop) {
		if (testFunction(srt[middle]) > 0) {
			stop = middle - 1;
		} else {
			start = middle + 1;
		}
		middle = Math.floor((stop + start) / 2);
	}
	return (testFunction(srt[middle]) === 0) ? middle : -1;
};

const findIndexBinary = (srt, value, compareFunction) =>
	_findIndexBinary(srt, testFunction(value, compareFunction));

// Commented Code: module.exports.cloneObject = cloneObject;
module.exports.combine = combine;
module.exports.sort = sort;
module.exports.filter = filter;
module.exports.sortFilter = sortFilter;
module.exports.equal = equal;
module.exports.compare = compare;
module.exports.union = union;
module.exports.sliceFind = sliceFind;
module.exports.intersection = intersection;
module.exports.exclusion = exclusion;
module.exports.mutualExclusion = mutualExclusion;
module.exports.findIndexBinary = findIndexBinary;
