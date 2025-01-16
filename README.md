[![Build Status](https://travis-ci.org/peterolson/BigInteger.js.svg?branch=master)](https://travis-ci.org/peterolson/BigInteger.js)

BigInteger.js
=========

**BigInteger.js** is an arbitrary-length integer library for Javascript, allowing arithmetic operations on integers of unlimited size, notwithstanding memory and time limitations.

If you are using a browser, you can download [BigInteger.js from GitHub](http://peterolson.github.com/BigInteger.js/BigInteger.min.js) or just hotlink to it:

	<script src="http://peterolson.github.com/BigInteger.js/BigInteger.min.js"></script>

If you are using node, you can install BigInteger with [npm](https://npmjs.org/).

    npm install big-integer

Then you can include it in your code:

	var bigInt = require("big-integer");
	
The unit tests are contained in the `spec/spec.js` file. You can [run them online from GitHub](http://peterolson.github.io/BigInteger.js/spec/SpecRunner.html).

There are performance benchmarks that can be viewed from the `benchmarks/index.html` page. You can [run them online from GitHub](http://peterolson.github.io/BigInteger.js/benchmark/).

`bigInt(number, [base])`
---
You can create a bigInt by calling the `bigInt` function. You can pass in

 - a string, which it will parse as an bigInt and throw an `"Invalid integer"` error if the parsing fails.
 - a Javascript number, which it will parse as an bigInt and throw an `"Invalid integer"` error if the parsing fails.
 - another bigInt.
 - nothing, and it will return `bigInt.zero`.

 If you provide a second parameter, then it will parse `number` as a number in base `base`. Note that `base` can be any bigInt (even negative or zero). The letters "a-z" and "A-Z" will be interpreted as the numbers 10 to 36. Higher digits can be specified in angle brackets (`<` and `>`).

Examples:

    var zero = bigInt();
    var ninetyThree = bigInt(93);
	var largeNumber = bigInt("75643564363473453456342378564387956906736546456235345");
	var googol = bigInt("1e100");
	var bigNumber = bigInt(largeNumber);
	 
	var maximumByte = bigInt("FF", 16);
	var fiftyFiveGoogol = bigInt("<55>0", googol);

Note that Javascript numbers larger than `9007199254740992` and smaller than `-9007199254740992` are not precisely represented numbers and will not produce exact results. If you are dealing with numbers outside that range, it is better to pass in strings.

Method Chaining
---
Note that bigInt operations return bigInts, which allows you to chain methods, for example:

    var salary = bigInt(dollarsPerHour).times(hoursWorked).plus(randomBonuses)

Constants
---

There are three named constants already stored that you do not have to construct with the `bigInt` function yourself:

 - `bigInt.one`, equivalent to `bigInt(1)`
 - `bigInt.zero`, equivalent to `bigInt(0)`
 - `bigInt.minusOne`, equivalent to `bigInt(-1)`
 
The numbers from -999 to 999 are also already prestored and can be accessed using `bigInt[index]`, for example:

 - `bigInt[-999]`, equivalent to `bigInt(-999)`
 - `bigInt[256]`, equivalent to `bigInt(256)`

Methods
===

`abs()`
---
Returns the absolute value of a bigInt.

 - `bigInt(-45).abs()` => `45`
 - `bigInt(45).abs()` => `45`

`add(number)`
---
Performs addition.

 - `bigInt(5).add(7)` => `12`
 
[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Addition)

`and(number)`
---
Performs the bitwise AND operation. The operands are treated as if they were represented using [two's complement representation](http://en.wikipedia.org/wiki/Two%27s_complement).

 - `bigInt(6).and(3)` => `2`
 - `bigInt(6).and(-3)` => `4`

`compare(number)`
---
Performs a comparison between two numbers. If the numbers are equal, it returns `0`. If the first number is greater, it returns `1`. If the first number is lesser, it returns `-1`.

 - `bigInt(5).compare(5)` => `0`
 - `bigInt(5).compare(4)` => `1`
 - `bigInt(4).compare(5)` => `-1`

`compareAbs(number)`
---
Performs a comparison between the absolute value of two numbers.

 - `bigInt(5).compareAbs(-5)` => `0`
 - `bigInt(5).compareAbs(4)` => `1`
 - `bigInt(4).compareAbs(-5)` => `-1`

`compareTo(number)`
---
Alias for the `compare` method.

`divide(number)`
---
Performs integer division, disregarding the remainder.

 - `bigInt(59).divide(5)` => `11`
 
[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Division)

`divmod(number)`
---
Performs division and returns an object with two properties: `quotient` and `remainder`. The sign of the remainder will match the sign of the dividend.

 - `bigInt(59).divmod(5)` => `{quotient: bigInt(11), remainder: bigInt(4) }`
 - `bigInt(-5).divmod(2)` => `{quotient: bigInt(-2), remainder: bigInt(-1) }`
 
[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Division)

`eq(number)`
---
Alias for the `equals` method.

`equals(number)`
---
Checks if two numbers are equal.

 - `bigInt(5).equals(5)` => `true`
 - `bigInt(4).equals(7)` => `false`

`geq(number)`
---
Alias for the `greaterOrEquals` method.


`greater(number)`
---
Checks if the first number is greater than the second.

 - `bigInt(5).greater(6)` => `false`
 - `bigInt(5).greater(5)` => `false`
 - `bigInt(5).greater(4)` => `true`

`greaterOrEquals(number)`
---
Checks if the first number is greater than or equal to the second.

 - `bigInt(5).greaterOrEquals(6)` => `false`
 - `bigInt(5).greaterOrEquals(5)` => `true`
 - `bigInt(5).greaterOrEquals(4)` => `true`

`gt(number)`
---
Alias for the `greater` method.

`isDivisibleBy(number)`
---
Returns `true` if the first number is divisible by the second number, `false` otherwise.

 - `bigInt(999).isDivisibleBy(333)` => `true`
 - `bigInt(99).isDivisibleBy(5)` => `false`

`isEven()`
---
Returns `true` if the number is even, `false` otherwise.

 - `bigInt(6).isEven()` => `true`
 - `bigInt(3).isEven()` => `false`

`isNegative()`
---
Returns `true` if the number is negative, `false` otherwise.
Returns `false` for `0` and `-0`.

 - `bigInt(-23).isNegative()` => `true`
 - `bigInt(50).isNegative()` => `false`

`isOdd()`
---
Returns `true` if the number is odd, `false` otherwise.

 - `bigInt(13).isOdd()` => `true`
 - `bigInt(40).isOdd()` => `false`

`isPositive()`
---
Return `true` if the number is positive, `false` otherwise.
Returns `false` for `0` and `-0`.

 - `bigInt(54).isPositive()` => `true`
 - `bigInt(-1).isPositive()` => `false`

`isPrime()`
---
Returns `true` if the number is prime, `false` otherwise.

 - `bigInt(5).isPrime()` => `true`
 - `bigInt(6).isPrime()` => `false`

`isProbablePrime([iterations])`
---
Returns `true` if the number is very likely to be positive, `false` otherwise.
Argument is optional and determines the amount of iterations of the test (default: `5`). The more iterations, the lower chance of getting a false positive.
This uses the [Fermat primality test](https://en.wikipedia.org/wiki/Fermat_primality_test).

 - `bigInt(5).isProbablePrime()` => `true`
 - `bigInt(49).isProbablePrime()` => `false`
 - `bigInt(1729).isProbablePrime(50)` => `false`
 
Note that this function is not deterministic, since it relies on random sampling of factors, so the result for some numbers is not always the same. [Carmichael numbers](https://en.wikipedia.org/wiki/Carmichael_number) are particularly prone to give unreliable results.

For example, `bigInt(1729).isProbablePrime()` returns `false` about 76% of the time and `true` about 24% of the time. The correct result is `false`.

`isUnit()`
---
Returns `true` if the number is `1` or `-1`, `false` otherwise.

 - `bigInt.one.isUnit()` => `true`
 - `bigInt.minusOne.isUnit()` => `true`
 - `bigInt(5).isUnit()` => `false`

`isZero()`
---
Return `true` if the number is `0` or `-0`, `false` otherwise.

 - `bigInt.zero.isZero()` => `true`
 - `bigInt("-0").isZero()` => `true`
 - `bigInt(50).isZero()` => `false`

`leq(number)`
---
Alias for the `lesserOrEquals` method.

`lesser(number)`
---
Checks if the first number is lesser than the second.

 - `bigInt(5).lesser(6)` => `true`
 - `bigInt(5).lesser(5)` => `false`
 - `bigInt(5).lesser(4)` => `false`

`lesserOrEquals(number)`
---
Checks if the first number is less than or equal to the second.

 - `bigInt(5).lesserOrEquals(6)` => `true`
 - `bigInt(5).lesserOrEquals(5)` => `true`
 - `bigInt(5).lesserOrEquals(4)` => `false`

`lt(number)`
---
Alias for the `lesser` method.

`minus(number)`
---
Alias for the `subtract` method.

 - `bigInt(3).minus(5)` => `-2`
 
[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Subtraction)

`mod(number)`
---
Performs division and returns the remainder, disregarding the quotient. The sign of the remainder will match the sign of the dividend.

 - `bigInt(59).mod(5)` =>  `4`
 - `bigInt(-5).mod(2)` => `-1`
 
[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Division)

`modPow(exp, mod)`
---
Takes the number to the power `exp` modulo `mod`.

 - `bigInt(10).modPow(3, 30)` => `10`

`multiply(number)`
---
Performs multiplication.

 - `bigInt(111).multiply(111)` => `12321`

[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Multiplication)

`neq(number)`
---
Alias for the `notEquals` method.

`next()`
---
Adds one to the number.

 - `bigInt(6).next()` => `7`

`not()`
---
Performs the bitwise NOT operation. The operands are treated as if they were represented using [two's complement representation](http://en.wikipedia.org/wiki/Two%27s_complement).

 - `bigInt(10).not()` => `-11`
 - `bigInt(0).not()` => `-1`

`notEquals(number)`
---
Checks if two numbers are not equal.

 - `bigInt(5).notEquals(5)` => `false`
 - `bigInt(4).notEquals(7)` => `true`

 - `bigInt(6).next()` => `7`

`or(number)`
---
Performs the bitwise OR operation. The operands are treated as if they were represented using [two's complement representation](http://en.wikipedia.org/wiki/Two%27s_complement).

 - `bigInt(13).or(10)` => `15`
 - `bigInt(13).or(-8)` => `-3`

`over(number)`
---
Alias for the `divide` method.

 - `bigInt(59).over(5)` => `11`
 
[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Division)

`plus(number)`
---
Alias for the `add` method.

 - `bigInt(5).plus(7)` => `12`
 
[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Addition)

`pow(number)`
---
Performs exponentiation. If the exponent is less than `0`, `pow` returns `0`. `bigInt.zero.pow(0)` returns `1`.

 - `bigInt(16).pow(16)` => `18446744073709551616`

[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Exponentiation)

`prev(number)`
---
Subtracts one from the number.

 - `bigInt(6).prev()` => `5`

`remainder(number)`
---
Alias for the `mod` method.

[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Division)

`shiftLeft(n)`
---
Shifts the number left by `n` places in its binary representation. If a negative number is provided, it will shift right.

 - `bigInt(8).shiftLeft(2)` => `32`
 - `bigInt(8).shiftLeft(-2)` => `2`

`shiftRight(n)`
---
Shifts the number right by `n` places in its binary representation. If a negative number is provided, it will shift left.

 - `bigInt(8).shiftRight(2)` => `2`
 - `bigInt(8).shiftRight(-2)` => `32`

`square()`
---
Squares the number

 - `bigInt(3).square()` => `9`
 
[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Squaring)

`subtract(number)`
---
Performs subtraction.

 - `bigInt(3).subtract(5)` => `-2`
 
[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Subtraction)

`times(number)`
---
Alias for the `multiply` method.

 - `bigInt(111).times(111)` => `12321`
 
[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#Multiplication)

`toJSNumber()`
---
Converts a bigInt into a native Javascript number. Loses precision for numbers outside the range `[-9007199254740992, 9007199254740992]`.

 - `bigInt("18446744073709551616").toJSNumber()` => `18446744073709552000`

`xor(number)`
---
Performs the bitwise XOR operation. The operands are treated as if they were represented using [two's complement representation](http://en.wikipedia.org/wiki/Two%27s_complement).

 - `bigInt(12).xor(5)` => `9`
 - `bigInt(12).xor(-5)` => `-9`
 
Static Methods
===

`gcd(a, b)`
---
Finds the greatest common denominator of `a` and `b`.

 - `bigInt.gcd(42,56)` => `14`

`isInstance(x)`
---
Returns `true` if `x` is a BigInteger, `false` otherwise.

 - `bigInt.isInstance(bigInt(14))` => `true`
 - `bigInt.isInstance(14)` => `false`
 
`lcm(a,b)`
---
Finds the least common multiple of `a` and `b`.
 
 - `bigInt.lcm(21, 6)` => `42`
 
`max(a,b)`
---
Returns the largest of `a` and `b`.

 - `bigInt.max(77, 432)` => `432`

`min(a,b)`
---
Returns the smallest of `a` and `b`.

 - `bigInt.min(77, 432)` => `77`

`randBetween(min, max)`
---
Returns a random number between `min` and `max`.

 - `bigInt.randBetween("-1e100", "1e100")` => (for example) `8494907165436643479673097939554427056789510374838494147955756275846226209006506706784609314471378745`


Override Methods
===

`toString(radix = 10)`
---
Converts a bigInt to a string. There is an optional radix parameter (which defaults to 10) that converts the number to the given radix. Digits in the range `10-36` will use the letters `a-z`.

 - `bigInt("1e9").toString()` => `"1000000000"`
 - `bigInt("1e9").toString(16)` => `"3b9aca00"`

**Note that arithmetical operators will trigger the `valueOf` function rather than the `toString` function.** When converting a bigInteger to a string, you should use the `toString` method or the `String` function instead of adding the empty string.

 - `bigInt("999999999999999999").toString()` => `"999999999999999999"`
 - `String(bigInt("999999999999999999"))` => `"999999999999999999"`
 - `bigInt("999999999999999999") + ""` => `1000000000000000000`

Bases larger than 36 are supported. If a digit is larger than 36, it will be enclosed in angle brackets.

 - `bigInt(567890).toString(100)` => `"<56><78><90>"`

Negative bases are also supported.

 - `bigInt(12345).toString(-10)` => `"28465"`

Base 1 and base -1 are also supported.

 - `bigInt(-15).toString(1)` => `"-111111111111111"`
 - `bigInt(-15).toString(-1)` => `"101010101010101010101010101010"`

Base 0 is only allowed for the number zero.

 - `bigInt(0).toString(0)` => `0`
 - `bigInt(1).toString(0)` => `Error: Cannot convert nonzero numbers to base 0.`
 
[View benchmarks for this method](http://peterolson.github.io/BigInteger.js/benchmark/#toString)
 
`valueOf()`
---
Converts a bigInt to a native Javascript number. This override allows you to use native arithmetic operators without explicit conversion:

 - `bigInt("100") + bigInt("200") === 300; //true`
