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

const sort = (array, compareFunction) => array.slice(0).sort(compareFunction);

const _filterFunction = compareFunction =>
	(currentValue, index, srt) =>
		(index === 0) ? true : compareFunction(currentValue, srt[index - 1]) !== 0;

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

// Commented Code: module.exports.cloneObject = cloneObject;
module.exports.sort = sort;
module.exports.equal = equal;
module.exports.compare = compare;
module.exports.union = union;
module.exports.sliceFind = sliceFind;
module.exports.intersection = intersection;
module.exports.exclusion = exclusion;
module.exports.mutualExclusion = mutualExclusion;
