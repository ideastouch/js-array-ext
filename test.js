'use strict';
import test from 'ava';
import {sort, filter, sortFilter, equal, compare, union, sliceFind, intersection, exclusion, findIndexBinary} from './';

const srt = [0, 1, 2, 3, 4, 5];
console.log('srt: ' + srt);
const srtCopy = srt.slice(0);
console.log('srtCopy: ' + srtCopy);
const srtBig = srt.slice(0).concat([srt.length]);
console.log('srtBig: ' + srtBig);
const srt1 = srtBig.slice(0, 4);
console.log('srt1: ' + srt1);
const srt2 = srtBig.slice(0, 1).concat(srtBig.slice(3));
console.log('srt2: ' + srt2);
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

test('union', t => {
	let srtUnion = union(srt1, srt2, compareNumber);
	let value = compare(srtUnion, srtBig, compareNumber);
	t.true(value === 0, 'Union of first and second arrays ');
	srtUnion = union(srt2, srt1, compareNumber);
	value = compare(srtUnion, srtBig, compareNumber);
	t.true(value === 0, 'Union of second and first arrays ');
});

test('sliceFind', t => {
	const srtSliceFind = sliceFind(srt, 3, compareNumber);
	const value = compare(srtSliceFind, [3, 4, 5], compareNumber);
	t.true(value === 0, 'Slice array from finded value');
});

test('intersection', t => {
	let srtIntersection = intersection(srt1, srt2, compareNumber);
	let value = compare(srtIntersection, [0, 3], compareNumber);
	t.true(value === 0, 'Intersection of first and second arrays ');
	srtIntersection = intersection(srt2, srt1, compareNumber);
	value = compare(srtIntersection, [0, 3], compareNumber);
	t.true(value === 0, 'Intersection of second and first arrays ');
});

test('exclusion', t => {
	let srtExclusion = exclusion(srt1, srt2, compareNumber);
	let value = compare(srtExclusion, [1, 2], compareNumber);
	t.true(value === 0, 'Exclusion of first and second arrays ');
	srtExclusion = exclusion(srt2, srt1, compareNumber);
	value = compare(srtExclusion, [4, 5, 6], compareNumber);
	t.true(value === 0, 'Exclusion of second and first arrays ');
});

test('findIndexBinary', t => {
	let index = findIndexBinary(srtBig, 1, compareNumber);
	t.true(index !== -1, 'Find Index of 1 using Binary algorithm.');
	index = findIndexBinary(srtBig, 3, compareNumber);
	t.true(index !== -1, 'Find Index of 3 using Binary algorithm.');
	index = findIndexBinary(srtBig, 6, compareNumber);
	t.true(index !== -1, 'Find Index of 6 using Binary algorithm.');
});

const people = [
	{firstName: 'Gus', lastName: 'Halp', age: 30, sport: 'surf'},
	{firstName: 'Caro', lastName: 'Silb', age: 27, sport: 'shoping'},
	{firstName: 'Aar', lastName: 'Sam', age: 35, sport: 'walk'},
	{firstName: 'Emily', lastName: 'Sam', age: 19, sport: 'shoping'},
	{firstName: 'Manu', lastName: 'Halp', age: 12, sport: 'soccer'},
	{firstName: 'Palo', lastName: 'Halp', age: 10, sport: 'soccer'},
	{firstName: 'Valen', lastName: 'Grizu', age: 15, sport: 'play'},
	{firstName: 'Sil', lastName: 'Halp', age: 57, sport: 'soccer'},
	{firstName: 'Noe', lastName: 'Halp', age: 57, sport: 'yoga'},
	{firstName: 'Eli', lastName: 'Silb', age: 51, sport: 'read'},
	{firstName: 'Loti', lastName: 'Silb', age: 51, sport: 'shoping'}
];
// People helpers
const printPerson = p => p.firstName + ' ' + p.lastName + ', age: ' + p.age + ', sport: ' + p.sport;
const printPeople = people => people.reduce((total, person) => total + ' ' + printPerson(person) + '\n', '');
// Person compare functions
const sameSport = sport => person => person.sport.localeCompare(sport) === 0;
const biggerThanAge = age => person => person.age > age;
const smallerThanAge = age => person => person.age < age;
const compareFirstName = firstName => person => person.firstName.localeCompare(firstName);
const compareLastName = lastName => person => person.lastName.localeCompare(lastName);
const compareAge = age => person => person.age - age;
const compareSport = sport => person => person.sport.localeCompare(sport);
const compareFirstNames = (person1, person2) => compareFirstName(person2.firstName)(person1);
const compareLastNames = (person1, person2) => compareLastName(person2.lastName)(person1);
const compareAges = (person1, person2) => compareAge(person2.age)(person1);
const compareSports = (person1, person2) => compareSport(person2.sport)(person1);
// Print outs
console.log('People: \n' + printPeople(people));
const peopleSortByFirstName = sort(people, compareFirstNames);
console.log('People sort by first name: \n' + printPeople(peopleSortByFirstName));
const peopleSortByLastName = sort(people, compareLastNames);
console.log('People sort by last name: \n' + printPeople(peopleSortByLastName));
console.log('People sort by last name and filter: \n' + printPeople(filter(peopleSortByLastName, compareLastNames)));
console.log('People sort by last name and filter: \n' + printPeople(sortFilter(people, compareLastNames)));
const peopleSortByAge = sort(people, compareAges);
console.log('People sort by age: \n' + printPeople(peopleSortByAge));
const peopleSortBySport = sort(people, compareSports);
console.log('People sort by Sport: \n' + printPeople(peopleSortBySport));
const seniors = peopleSortByAge.filter(biggerThanAge(50));
console.log('Seniors sort by Age: \n' + printPeople(seniors));
const adults = peopleSortByAge.filter(biggerThanAge(17)).filter(smallerThanAge(51));
console.log('Adults sort by Age: \n' + printPeople(adults));
const childrens = peopleSortByAge.filter(smallerThanAge(18));
console.log('Childrens sort by Age: \n' + printPeople(childrens));
const childrenAndSeniorSoccerByAge = sort(childrens.concat(seniors), compareSports).filter(sameSport('soccer')).sort(compareAges);
console.log('Childrens and Seniors than like soccer and sort by Age: \n' + printPeople(childrenAndSeniorSoccerByAge));
const childrensAndAdultsSameSport = intersection(sort(childrens, compareSports), sort(adults, compareSports), compareSports);
console.log('Childrens and Adults Same Sport: \n' + printPeople(childrensAndAdultsSameSport));
const childrensAndSeniorsSameSport = intersection(sort(childrens, compareSports), sort(seniors, compareSports), compareSports);
console.log('Childrens and Seniors Same Sport: \n' + printPeople(childrensAndSeniorsSameSport));
const list = intersection(sort(seniors, compareLastNames), sort(childrens, compareLastNames), compareLastNames);
console.log('Seniors and Childrens Same Family Name: \n' + printPeople(list));
