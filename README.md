![travis build results](https://travis-ci.org/ideastouch/js-array-ext.svg?branch=master)    

JavaScript Array Extension
=========
A small library with array generic operations.

### Philosophy under the hood
I think that most of the time what algorithm's programer does is iterate in different ways over one or many list of element and for each iteration applying a process.
Some of those iteration are simply _join_, _intersection_, etc, in the other occasions could be no so easy to see which is the generic iteration/operation we need.

In this small library I try to do basically four things:
- Add basic `Array`'s iterations.
- Add basic operation over Sorted Arrays with unduplicated values, I call those type of arrays as `srtf` (Sorted and Filtered).
- Add complex `Array`'s iterations.
- Add complex iterations over `srtf` `Array`s.

All the functions in this library are built base on current JS Array methods (see <https://www.w3schools.com/jsref/jsref_obj_array.asp>) as much as possible or in function defined in this library.

## Installation
`npm install js-array-ext`

## API
- Markdown style documentation: [API-MD](https://github.com/ideastouch/js-array-ext/blob/master/docs/index.md)
- HTML style documentation: [API-HTML](https://htmlpreview.github.io/?https://github.com/ideastouch/js-array-ext/blob/master/html/global.html)

## Usage
```javascript
import idtArray from 'js-array-ext';
var srt = [0, 1, 2, 3, 4, 5];
var compareNumber = (num1, num2) => num1 - num2;
var srtSliceFind = idtArray.sliceFind(srt, 3, compareNumber);
```  
  
  Output should be `[3, 4, 5]`

## Comparisons 
### Before
```javascript
var xCoords = [3, 4, 6, 8];
var yCoords = [1, 5, 2, 4];
var points = [];
xCoords.forEach(x => yCoords.forEach(y, => points.push({x, y}) ) );
```

### After
```javascript
import idtArray from 'js-array-ext';
var xCoords = [3, 4, 6, 8];
var yCoords = [1, 5, 2, 4];
// We provide the combine function, we do not need call twice forEach anymore.
var points = idtArray.combine(xCoords, yCoords, (x, y) => ({x, y}));
```

### Bonus
If we want a new list of sorted points base on point distance
to origin `(0, 0)` we can just do:
```javascript
var DD = p => p.x * p.x + p.y * p.y; // DD is for Delta * Delta.
var PPDistance = (p1, p2) => DD(p1) - DD(p2);
var srtPnts = idtArray.sort(points, PPDistance);
```
## Tests
`npm test`

## Future Functions

#### splitFilter(array, processFunction) 

Split `array` in tree `Array`, one for elements in which `processFunction` return negative number, one for case return cero and one for case return positive numbers.

#### reduceMap(array, processFunction, reduceFunction, initial) 

Call to `processFunction` for each element and and push each result in an Array. Then call to `reduceFunction` in same way as `Array.reduce`. Default for `initial` is an empty `Array` and default for `reduceFunction` is `Array.concat`

## Contributing

So far only my self.