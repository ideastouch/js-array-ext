'use strict';
import test from 'ava';
import {equal, compare} from './';

const srt = [0, 1, 2, 3, 4, 5];
const srtCopy = srt.slice(0);
const srtBig = srt.slice(0).concat([srt.length]);
const compareNumber = (num1, num2) => num1 - num2;

test('equal', t => {
	let value = equal(srt, srtCopy, compareNumber);
	t.true(value, 'Two equal arrays equals');
	value = equal(srt, srtBig, compareNumber);
	t.false(value, 'One array not equal to a bigger one');
	value = equal(srtBig, srt, compareNumber);
	t.false(value, 'Onearray not equal to an smaller one');
});

test('compare', t => {
	let value = compare(srt, srtCopy, compareNumber);
	t.true(value === 0, 'Compare two arrays equals');
	value = compare(srt, srtBig, compareNumber);
	t.true(value < 0, 'Compare one array to an bigger one');
	value = compare(srtBig, srt, compareNumber);
	t.true(value > 0, 'Compare one array to an smaller one');
});
