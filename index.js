'use strict';
/* Commented Code
const _MESSAGE_OF_NULL_REFERENCES = argName => argName + ' is null (a) references.';
const _MESSAGE_OF_NULL_ARGUMENTS = argName => argName + ' is null (an) arguments';
const _MESSAGE_OF_INVALID_ARGUMENTS = (argName, needsType) => argName + ' is (an) invalid arguments.' + (needsType !== undefined) ? 'It\'s have to ' + needsType : '';
const _MESSAGE_OF_NOT_SUPPORT_ARGUMENTS	= (argName, argObject) => typeof argObject + ' type of ' + argName + ' argument is not support';
*/

/**
 * Make a new array with elements of 'lenght' elements besides the last one which could be smaller.
 *
 * @param {Array} arr Unsorted array.
 * @param {Int} length
*/
const piecesOfLength = (arr, length) =>
	arr.filter((elm, idx) => (idx % length) === 0).map((elm, idx) => arr.slice(length * idx, length * (idx + 1)));

/**
 * Call to processFunction wich each possible combination of elements in arr1 and arr2
 * and return an array with the result of each call to processFunction. ej. We have two list of coords and
 * we want all possible combinations of points. Simple as call this functions with the list and the constructor.
 *
 * @param {Array} arr1 Unsorted array.
 * @param {Array} arr2 Unsorted array.
 * @param {Array} processFunction Two arguments function which return a new element.
 * @return {Array} Array of elements according to description.
 */
const combine = (arr1, arr2, processFunction) =>
	arr1.map(e1 => arr2.map(e2 => processFunction(e1, e2))).reduce((t, c) => t.concat(c), []);

/**
 * @description Same as Array.sort with the addition that is retuning a new Array.
 * @param {Array} array
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 * @return {Array} New Array of elements according to description.
 */
const sort = (array, compareFunction) => array.slice(0).sort(compareFunction);

/**
 * @ignore
 *
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 */
const _filterFunction = compareFunction =>
	(currentValue, index, srtf) =>
		(index === 0) ? true : compareFunction(currentValue, srtf[index - 1]) !== 0;

/**
 * @description Compare contiguous elemented and remove the second if the compare function return any
 * value different than 0.
 * This method is usual used to remove repeated elements in a previously sorted Array.
 * @param {Array} srtf SortFilter Array.
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 * @return {Array} New Array of elements according to description.
 */
const removeEquals = (srtf, compareFunction) => srtf.slice(0).filter(_filterFunction(compareFunction));

/**
 * @description Sort Array and then remove equal contiguos elements in both cases using compare function.
 * @param {Array} array
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 * @return {Array} New Array of elements according to description.
 */
const sortFilter = (array, compareFunction) => removeEquals(sort(array, compareFunction), compareFunction);

/**
 * @ignore
 *
 * @param {Array} srtf SortFilter Array.
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 */
const _notEqualFunction = (srtf, equalValue) =>
	(currentValue, index) => equalValue(currentValue, srtf[index]) !== 0;

/**
 * @ignore
 *
 * @param {Array} srtf SortFilter Array.
 * @param {Funcion} compareFunction Two argument function which return a number minor, equal or bigger than 0.
 */
const _notEqualIndexFunction = (srtf, compareFunction) =>
	(currentValue, index) => compareFunction(currentValue, srtf[index]) !== 0;

/**
 * @description Compare two sorted array
 * @param {Array} srtf1 SortFilter Array.
 * @param {Array} srtf2 SortFilter Array.
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 * @return {Bool} Return true if succeed or false other way.
 */
const equal = (srtf1, srtf2, compareFunction) =>
	srtf1.length === srtf2.length && srtf1.findIndex(_notEqualFunction(srtf2, compareFunction)) === -1;

/**
 * @ignore
 *
 * @param {Array} srtf SortFilter Array.
 * @param {*} srtfBigger
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 */
const _compare = (srtf, srtfBigger, compareFunction) => {
	const index = srtf.findIndex(_notEqualIndexFunction(srtfBigger, compareFunction));
	return (index === -1) ? srtf.length - srtfBigger.length : compareFunction(srtf[index], srtfBigger[index]);
};

/**
 * @description Compared each two elements in two sorted arrays until one return non sero value.
 * @param {Array} srtf1 SortFilter Array.
 * @param {Array} srtf2 SortFilter Array.
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 * @return {Number} A number minor, equal or bigger than 0 according to description.
 */
const compare = (srtf1, srtf2, compareFunction) =>
	srtf1.length > srtf2.length ?
		-1 * _compare(srtf2, srtf1, compareFunction) : _compare(srtf1, srtf2, compareFunction);

/**
 * @description SortFilter Array of values in both sorted arrays without repeating values.
 * @param {Array} srtf1 SortFilter Array.
 * @param {Array} srtf2 SortFilter Array.
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 * @return {Array} New Array of elements according to description.
 */
const union = (srtf1, srtf2, compareFunction) =>
	srtf1.concat(srtf2).sort(compareFunction).filter(_filterFunction(compareFunction));

/**
 * @description New Array starting from first index where compare function return 0 or positive number.
 * @param {Array} srtf , SortFilter Array.
 * @param {*} value
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 * @return {Array} New Array of elements according to description.
 */
const sliceFind = (srtf, value, compareFunction) => {
	const index = srtf.findIndex(currentValue => compareFunction(currentValue, value) >= 0);
	return (index >= 0) ? srtf.slice(index) : [];
};

/**
 * @ignore
 * @description New one argument Function which compare this argument with first value of sliceFind srtf. Srt arrar
 * is also replaced by sliceFind new Array.
 * @param {Array} srtf , SortFilter Array.
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 */
const _filterAheadFunction = (srtf, compareFunction) =>
	currentValue => {
		srtf = sliceFind(srtf, currentValue, compareFunction);
		return srtf.length > 0 && compareFunction(currentValue, srtf[0]) === 0;
	};

/**
 * @description New SortFilter Array with elements duplicated in both Arrays, by duplicate means compare function return 0.
 * @param {Array} srtf1 , SortFilter Array.
 * @param {Array} srtf2 , SortFilter Array.
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 * @return {Array} New Array of elements according to description.
 */
const intersection = (srtf1, srtf2, compareFunction) =>
	srtf1.filter(_filterAheadFunction(srtf2, compareFunction));

/**
 * @ignore
 * @description Create new one argument function that cut-off values on srtf till find.
 * @param {Array} srtf , SortFilter Array.
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 */
const _filterNotAheadFunction = (srtf, compareFunction) =>
	currentValue => {
		srtf = sliceFind(srtf, currentValue, compareFunction);
		return (srtf.length === 0) ? true : compareFunction(currentValue, srtf[0]) !== 0;
	};

/**
 * @description New SortFilter Array with elements of srtf1 which are not duplicated in srtf2.
 * @param {Array} srtf1 , SortFilter Array.
 * @param {Array} srtf2 , SortFilter Array.
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 */
const exclusion = (srtf1, srtf2, compareFunction) =>
	srtf1.filter(_filterNotAheadFunction(srtf2, compareFunction));

/**
 * @description New SortFilter Array with elements of srtf1 which are not duplicated in srtf2
 * and elements of srtf2 which are not duplicated in srtf1.
 * @param {Array} srtf1 , SortFilter Array.
 * @param {Array} srtf2 , SortFilter Array.
 * @param {Funcion} compareFunction Two argument function that return a number minor, equal or bigger than 0.
 */
const mutualExclusion = (srtf1, srtf2, compareFunction) =>
	exclusion(srtf1, srtf2, compareFunction).concat(exclusion(srtf2, srtf1, compareFunction)).sort(compareFunction);

module.exports = {
	piecesOfLength,
	equal,
	combine,
	sort,
	removeEquals,
	sortFilter,
	compare,
	union,
	sliceFind,
	intersection,
	exclusion,
	mutualExclusion
};
