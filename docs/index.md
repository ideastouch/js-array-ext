# Global
[github](https://github.com/ideastouch/js-array-ext) |
[npm](https://www.npmjs.com/package/@ideastouch/js-array-ext)




* * *

### combine(arr1, arr2, processFunction) 

Call to processFunction wich each possible combination of elements in arr1 and arr2
and return an array with the result of each call to processFunction. ej. We have two list of coords and
we want all possible combinations of points. Simple as call this functions with the list and the constructor.

**Parameters**

**arr1**: `Array`, Unsorted array.

**arr2**: `Array`, Unsorted array.

**processFunction**: `Array`, Two arguments function which return a new element.

**Returns**: `Array`, Array of elements according to description.


### sort(array, compareFunction) 

Same as Array.sort with the addition that is retuning a new Array.

**Parameters**

**array**: `Array`, Same as Array.sort with the addition that is retuning a new Array.

**compareFunction**: `Funcion`, Two argument function that return a number minor, equal or bigger than 0.

**Returns**: `Array`, New Array of elements according to description.


### removeEquals(srtf, compareFunction) 

Compare contiguous elemented and remove the second if the compare function return any
value different than 0.
This method is usual used to remove repeated elements in a previously sorted Array.

**Parameters**

**srtf**: `Array`, SortFilter Array.

**compareFunction**: `Funcion`, Two argument function that return a number minor, equal or bigger than 0.

**Returns**: `Array`, New Array of elements according to description.


### sortFilter(array, compareFunction) 

Sort Array and then remove equal contiguos elements in both cases using compare function.

**Parameters**

**array**: `Array`, Sort Array and then remove equal contiguos elements in both cases using compare function.

**compareFunction**: `Funcion`, Two argument function that return a number minor, equal or bigger than 0.

**Returns**: `Array`, New Array of elements according to description.


### equal(srtf1, srtf2, compareFunction) 

Compare two sorted array

**Parameters**

**srtf1**: `Array`, SortFilter Array.

**srtf2**: `Array`, SortFilter Array.

**compareFunction**: `Funcion`, Two argument function that return a number minor, equal or bigger than 0.

**Returns**: `Bool`, Return true if succeed or false other way.


### compare(srtf1, srtf2, compareFunction) 

Compared each two elements in two sorted arrays until one return non sero value.

**Parameters**

**srtf1**: `Array`, SortFilter Array.

**srtf2**: `Array`, SortFilter Array.

**compareFunction**: `Funcion`, Two argument function that return a number minor, equal or bigger than 0.

**Returns**: `Number`, A number minor, equal or bigger than 0 according to description.


### union(srtf1, srtf2, compareFunction) 

SortFilter Array of values in both sorted arrays without repeating values.

**Parameters**

**srtf1**: `Array`, SortFilter Array.

**srtf2**: `Array`, SortFilter Array.

**compareFunction**: `Funcion`, Two argument function that return a number minor, equal or bigger than 0.

**Returns**: `Array`, New Array of elements according to description.


### sliceFind(srtf, value, compareFunction) 

New Array starting from first index where compare function return 0 or positive numeber.

**Parameters**

**srtf**: `Array`, , SortFilter Array.

**value**: `*`, New Array starting from first index where compare function return 0 or positive numeber.

**compareFunction**: `Funcion`, Two argument function that return a number minor, equal or bigger than 0.

**Returns**: `Array`, New Array of elements according to description.


### intersection(srtf1, srtf2, compareFunction) 

New SortFilter Array with elements duplicated in both Arrays, by duplicate means compare function return 0.

**Parameters**

**srtf1**: `Array`, , SortFilter Array.

**srtf2**: `Array`, , SortFilter Array.

**compareFunction**: `Funcion`, Two argument function that return a number minor, equal or bigger than 0.

**Returns**: `Array`, New Array of elements according to description.


### exclusion(srtf1, srtf2, compareFunction) 

New SortFilter Array with elements of srtf1 which are not duplicated in srtf2.

**Parameters**

**srtf1**: `Array`, , SortFilter Array.

**srtf2**: `Array`, , SortFilter Array.

**compareFunction**: `Funcion`, Two argument function that return a number minor, equal or bigger than 0.



### mutualExclusion(srtf1, srtf2, compareFunction) 

New SortFilter Array with elements of srtf1 which are not duplicated in srtf2
and elements of srtf2 which are not duplicated in srtf1.

**Parameters**

**srtf1**: `Array`, , SortFilter Array.

**srtf2**: `Array`, , SortFilter Array.

**compareFunction**: `Funcion`, Two argument function that return a number minor, equal or bigger than 0.




* * *










