import { iterateObjectValues } from '../src';

describe('Simple data types', () => {
	test('should not call callback for null', () => {
		const callback = jest.fn();
		iterateObjectValues(null, callback);
		expect(callback).not.toHaveBeenCalled();
	});

	test('should not call callback for undefined', () => {
		const callback = jest.fn();
		iterateObjectValues(undefined, callback);
		expect(callback).not.toHaveBeenCalled();
	});

	test('should call callback for boolean', () => {
		const callback = jest.fn();
		iterateObjectValues(true, callback);
		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(true, 'boolean');
	});

	test('should call callback for number', () => {
		const callback = jest.fn();
		iterateObjectValues(123, callback);
		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(123, 'number');
	});

	test('should call callback for string', () => {
		const callback = jest.fn();
		iterateObjectValues('abc', callback);
		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith('abc', 'string');
	});

	test('should call callback for bigint', () => {
		const callback = jest.fn();
		iterateObjectValues(BigInt(123), callback);
		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(BigInt(123), 'bigint');
	});

	test('should call callback for symbol', () => {
		const callback = jest.fn();
		const symbol = Symbol('abc');
		iterateObjectValues(symbol, callback);
		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(symbol, 'symbol');
	});

	test('should call callback for function', () => {
		const callback = jest.fn();
		iterateObjectValues(() => 'test', callback);
		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(expect.any(Function), 'function');
	});

	test('should not call callback for an empty object', () => {
		const callback = jest.fn();
		iterateObjectValues({}, callback);
		expect(callback).toHaveBeenCalledTimes(0);
	});
});

describe('Arrays', () => {
	test('should call callback for an array of simple values', () => {
		const callback = jest.fn();
		iterateObjectValues([1, '2', true], callback);
		expect(callback).toHaveBeenCalledTimes(3);
		expect(callback).toHaveBeenCalledWith(1, 'number');
		expect(callback).toHaveBeenCalledWith('2', 'string');
		expect(callback).toHaveBeenCalledWith(true, 'boolean');
	});

	test('should call callback for an array of objects', () => {
		const callback = jest.fn();
		const obj1 = { a: 1 };
		const obj2 = { b: 2 };
		const obj3 = { c: 3 };
		iterateObjectValues([obj1, obj2, obj3], callback);
		expect(callback).toHaveBeenCalledTimes(3);
		expect(callback).toHaveBeenCalledWith(1, 'number');
		expect(callback).toHaveBeenCalledWith(2, 'number');
		expect(callback).toHaveBeenCalledWith(3, 'number');
	});

	test('should call callback for an array of arrays', () => {
		const callback = jest.fn();
		const arr1 = [1, 2, 3];
		const arr2 = ['a', 'b', 'c'];
		const arr3 = [true, false, true];
		iterateObjectValues([arr1, arr2, arr3], callback);
		expect(callback).toHaveBeenCalledTimes(9);
		expect(callback).toHaveBeenCalledWith(1, 'number');
		expect(callback).toHaveBeenCalledWith(2, 'number');
		expect(callback).toHaveBeenCalledWith(3, 'number');
		expect(callback).toHaveBeenCalledWith('a', 'string');
		expect(callback).toHaveBeenCalledWith('b', 'string');
		expect(callback).toHaveBeenCalledWith('c', 'string');
		expect(callback).toHaveBeenCalledWith(true, 'boolean');
		expect(callback).toHaveBeenCalledWith(false, 'boolean');
		expect(callback).toHaveBeenCalledWith(true, 'boolean');
	});
});

describe('Maps', () => {
	describe('without keys', () => {
		test('should call callback for a map of simple values', () => {
			const callback = jest.fn();
			const map = new Map();
			map.set('a', 1);
			map.set('b', 2);
			map.set('c', 3);
			iterateObjectValues(map, callback);
			expect(callback).toHaveBeenCalledTimes(3);
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
		});

		test('should call callback for a map of objects', () => {
			const callback = jest.fn();
			const obj1 = { a: 1 };
			const obj2 = { b: 2 };
			const obj3 = { c: 3 };
			const map = new Map();
			map.set('a', obj1);
			map.set('b', obj2);
			map.set('c', obj3);
			iterateObjectValues(map, callback);
			expect(callback).toHaveBeenCalledTimes(3);
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
		});

		test('should call callback for a map of arrays', () => {
			const callback = jest.fn();
			const arr1 = [1, 2, 3];
			const arr2 = ['e', 'f', 'g'];
			const arr3 = [true, false, true];
			const map = new Map();
			map.set('a', arr1);
			map.set('b', arr2);
			map.set('c', arr3);
			iterateObjectValues(map, callback);
			expect(callback).toHaveBeenCalledTimes(9);
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
			expect(callback).toHaveBeenCalledWith('e', 'string');
			expect(callback).toHaveBeenCalledWith('f', 'string');
			expect(callback).toHaveBeenCalledWith('g', 'string');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
			expect(callback).toHaveBeenCalledWith(false, 'boolean');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
		});
	});

	describe('with keys', () => {
		test('should call callback for a map of simple values', () => {
			const callback = jest.fn();
			const map = new Map();
			map.set('a', 1);
			map.set('b', 2);
			map.set('c', 3);
			iterateObjectValues(map, callback, { includeKeys: true });
			expect(callback).toHaveBeenCalledTimes(6);
			// keys
			expect(callback).toHaveBeenCalledWith('a', 'string');
			expect(callback).toHaveBeenCalledWith('b', 'string');
			expect(callback).toHaveBeenCalledWith('c', 'string');
			// values
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
		});

		test('should call callback for a map of objects', () => {
			const callback = jest.fn();
			const obj1 = { e: 1 };
			const obj2 = { f: 2 };
			const obj3 = { g: 3 };
			const map = new Map();
			map.set('a', obj1);
			map.set('b', obj2);
			map.set('c', obj3);
			iterateObjectValues(map, callback, { includeKeys: true });
			expect(callback).toHaveBeenCalledTimes(9);
			// keys
			expect(callback).toHaveBeenCalledWith('a', 'string');
			expect(callback).toHaveBeenCalledWith('b', 'string');
			expect(callback).toHaveBeenCalledWith('c', 'string');
			expect(callback).toHaveBeenCalledWith('e', 'string');
			expect(callback).toHaveBeenCalledWith('f', 'string');
			expect(callback).toHaveBeenCalledWith('g', 'string');
			// values
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
		});

		test('should call callback for a map of arrays', () => {
			const callback = jest.fn();
			const arr1 = [1, 2, 3];
			const arr2 = ['e', 'f', 'g'];
			const arr3 = [true, false, true];
			const map = new Map();
			map.set('a', arr1);
			map.set('b', arr2);
			map.set('c', arr3);
			iterateObjectValues(map, callback, { includeKeys: true });
			expect(callback).toHaveBeenCalledTimes(12);
			// keys
			expect(callback).toHaveBeenCalledWith('a', 'string');
			expect(callback).toHaveBeenCalledWith('b', 'string');
			expect(callback).toHaveBeenCalledWith('c', 'string');

			// values
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
			expect(callback).toHaveBeenCalledWith('e', 'string');
			expect(callback).toHaveBeenCalledWith('f', 'string');
			expect(callback).toHaveBeenCalledWith('g', 'string');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
			expect(callback).toHaveBeenCalledWith(false, 'boolean');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
		});
	});
});

describe('Sets', () => {
	describe('without keys', () => {
		test('should call callback for a set of simple values', () => {
			const callback = jest.fn();
			const set = new Set();
			set.add(1);
			set.add('2');
			set.add(true);
			iterateObjectValues(set, callback);
			expect(callback).toHaveBeenCalledTimes(3);
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith('2', 'string');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
		});

		test('should call callback for a set of objects', () => {
			const callback = jest.fn();
			const obj1 = { a: 1 };
			const obj2 = { b: 2 };
			const obj3 = { c: 3 };
			const set = new Set();
			set.add(obj1);
			set.add(obj2);
			set.add(obj3);
			iterateObjectValues(set, callback);
			expect(callback).toHaveBeenCalledTimes(3);
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
		});

		test('should call callback for a set of arrays', () => {
			const callback = jest.fn();
			const arr1 = [1, 2, 3];
			const arr2 = ['e', 'f', 'g'];
			const arr3 = [true, false, true];
			const set = new Set();
			set.add(arr1);
			set.add(arr2);
			set.add(arr3);
			iterateObjectValues(set, callback);
			expect(callback).toHaveBeenCalledTimes(9);
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
			expect(callback).toHaveBeenCalledWith('e', 'string');
			expect(callback).toHaveBeenCalledWith('f', 'string');
			expect(callback).toHaveBeenCalledWith('g', 'string');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
			expect(callback).toHaveBeenCalledWith(false, 'boolean');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
		});
	});

	describe('with keys', () => {
		test('should call callback for a set of simple values', () => {
			const callback = jest.fn();
			const set = new Set();
			set.add(1);
			set.add('2');
			set.add(true);
			iterateObjectValues(set, callback, { includeKeys: true });
			expect(callback).toHaveBeenCalledTimes(3);
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith('2', 'string');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
		});

		test('should call callback for a set of objects', () => {
			const callback = jest.fn();
			const obj1 = { a: 1 };
			const obj2 = { b: 2 };
			const obj3 = { c: 3 };
			const set = new Set();
			set.add(obj1);
			set.add(obj2);
			set.add(obj3);
			iterateObjectValues(set, callback, { includeKeys: true });
			expect(callback).toHaveBeenCalledTimes(6);
			// keys
			expect(callback).toHaveBeenCalledWith('a', 'string');
			expect(callback).toHaveBeenCalledWith('b', 'string');
			expect(callback).toHaveBeenCalledWith('c', 'string');
			// values
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
		});

		test('should call callback for a set of arrays', () => {
			const callback = jest.fn();
			const arr1 = [1, 2, 3];
			const arr2 = ['e', 'f', 'g'];
			const arr3 = [true, false, true];
			const set = new Set();
			set.add(arr1);
			set.add(arr2);
			set.add(arr3);
			iterateObjectValues(set, callback, { includeKeys: true });
			expect(callback).toHaveBeenCalledTimes(9);
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
			expect(callback).toHaveBeenCalledWith('e', 'string');
			expect(callback).toHaveBeenCalledWith('f', 'string');
			expect(callback).toHaveBeenCalledWith('g', 'string');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
			expect(callback).toHaveBeenCalledWith(false, 'boolean');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
		});
	});
});

describe('Objects', () => {
	describe('without keys', () => {
		test('should call callback for an object of simple values', () => {
			const callback = jest.fn();
			const obj = { a: 1, b: '2', c: true };
			iterateObjectValues(obj, callback);
			expect(callback).toHaveBeenCalledTimes(3);
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith('2', 'string');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
		});

		test('should call callback for an object of objects', () => {
			const callback = jest.fn();
			const obj1 = { a: 1 };
			const obj2 = { b: 2 };
			const obj3 = { c: 3, d: { e: 4, f: { g: 5 } } };
			const obj = { obj1, obj2, obj3 };
			iterateObjectValues(obj, callback);
			expect(callback).toHaveBeenCalledTimes(5);
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
			expect(callback).toHaveBeenCalledWith(4, 'number');
			expect(callback).toHaveBeenCalledWith(5, 'number');
		});

		test('should call callback for an object of arrays', () => {
			const callback = jest.fn();
			const arr1 = [1, 2, 3];
			const arr2 = ['e', 'f', 'g'];
			const arr3 = [true, false, true];
			const obj = { arr1, arr2, arr3 };
			iterateObjectValues(obj, callback);
			expect(callback).toHaveBeenCalledTimes(9);
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
			expect(callback).toHaveBeenCalledWith('e', 'string');
			expect(callback).toHaveBeenCalledWith('f', 'string');
			expect(callback).toHaveBeenCalledWith('g', 'string');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
			expect(callback).toHaveBeenCalledWith(false, 'boolean');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
		});

		test('should call callback for an object of mixed values', () => {
			const callback = jest.fn();
			const obj1 = { a: 1 };
			const obj2 = { b: 2 };
			const obj3 = { c: 3, d: { e: 4, f: { g: 5 } } };
			const arr1 = [6, 7, 8];
			const arr2 = ['e', 'f', 'g'];
			const arr3 = [true, false, true];
			const obj = { obj1, obj2, obj3, arr1, arr2, arr3 };
			iterateObjectValues(obj, callback);
			expect(callback).toHaveBeenCalledTimes(14);
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
			expect(callback).toHaveBeenCalledWith(4, 'number');
			expect(callback).toHaveBeenCalledWith(5, 'number');
			expect(callback).toHaveBeenCalledWith(6, 'number');
			expect(callback).toHaveBeenCalledWith(7, 'number');
			expect(callback).toHaveBeenCalledWith(8, 'number');
			expect(callback).toHaveBeenCalledWith('e', 'string');
			expect(callback).toHaveBeenCalledWith('f', 'string');
			expect(callback).toHaveBeenCalledWith('g', 'string');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
			expect(callback).toHaveBeenCalledWith(false, 'boolean');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
		});

		test('should call callback for an object with a circular reference', () => {
			const callback = jest.fn();
			const obj1 = { a: 1 };
			const obj2 = { b: 2 };
			const obj3 = { c: 3, d: { e: 4, f: { g: 5 } } };
			const arr1 = [6, 7, 8];
			const arr2 = ['e', 'f', 'g'];
			const arr3 = [true, false, true];
			const obj = { obj1, obj2, obj3, arr1, arr2, arr3 };
			(obj as any).obj1.circular = obj;
			iterateObjectValues(obj, callback);
			expect(callback).toHaveBeenCalledTimes(14);
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
			expect(callback).toHaveBeenCalledWith(4, 'number');
			expect(callback).toHaveBeenCalledWith(5, 'number');
			expect(callback).toHaveBeenCalledWith(6, 'number');
			expect(callback).toHaveBeenCalledWith(7, 'number');
			expect(callback).toHaveBeenCalledWith(8, 'number');
			expect(callback).toHaveBeenCalledWith('e', 'string');
			expect(callback).toHaveBeenCalledWith('f', 'string');
			expect(callback).toHaveBeenCalledWith('g', 'string');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
			expect(callback).toHaveBeenCalledWith(false, 'boolean');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
		});

		test('should call callback once for an object that has multiple references to the same object', () => {
			const callback = jest.fn();
			const obj1 = { a: 1 };
			const obj2 = { b: 2 };
			const obj3 = { c: 3 };
			const obj = { obj1, obj2, obj3, obj4: obj1, obj5: obj1, obj6: obj1 };
			iterateObjectValues(obj, callback);
			expect(callback).toHaveBeenCalledTimes(3);
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
		});
	});

	describe('with keys', () => {
		test('should call callback for an object of simple values', () => {
			const callback = jest.fn();
			const obj = { a: 1, b: '2', c: true };
			iterateObjectValues(obj, callback, { includeKeys: true });
			expect(callback).toHaveBeenCalledTimes(6);
			// keys
			expect(callback).toHaveBeenCalledWith('a', 'string');
			expect(callback).toHaveBeenCalledWith('b', 'string');
			expect(callback).toHaveBeenCalledWith('c', 'string');
			// values
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith('2', 'string');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
		});

		test('should call callback for an object of objects', () => {
			const callback = jest.fn();
			const obj1 = { a: 1 };
			const obj2 = { b: 2 };
			const obj3 = { c: 3, d: { e: 4, f: { g: 5 } } };
			const obj = { obj1, obj2, obj3 };
			iterateObjectValues(obj, callback, { includeKeys: true });
			expect(callback).toHaveBeenCalledTimes(15);
			// keys
			expect(callback).toHaveBeenCalledWith('a', 'string');
			expect(callback).toHaveBeenCalledWith('b', 'string');
			expect(callback).toHaveBeenCalledWith('c', 'string');
			expect(callback).toHaveBeenCalledWith('d', 'string');
			expect(callback).toHaveBeenCalledWith('e', 'string');
			expect(callback).toHaveBeenCalledWith('f', 'string');
			expect(callback).toHaveBeenCalledWith('g', 'string');
			expect(callback).toHaveBeenCalledWith('obj1', 'string');
			expect(callback).toHaveBeenCalledWith('obj2', 'string');
			expect(callback).toHaveBeenCalledWith('obj3', 'string');
			// values
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
			expect(callback).toHaveBeenCalledWith(4, 'number');
			expect(callback).toHaveBeenCalledWith(5, 'number');
		});

		test('should call callback for an object of arrays', () => {
			const callback = jest.fn();
			const arr1 = [1, 2, 3];
			const arr2 = ['e', 'f', 'g'];
			const arr3 = [true, false, true];
			const obj = { arr1, arr2, arr3 };
			iterateObjectValues(obj, callback, { includeKeys: true });
			expect(callback).toHaveBeenCalledTimes(12);
			// keys
			expect(callback).toHaveBeenCalledWith('arr1', 'string');
			expect(callback).toHaveBeenCalledWith('arr2', 'string');
			expect(callback).toHaveBeenCalledWith('arr3', 'string');
			// values
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
			expect(callback).toHaveBeenCalledWith('e', 'string');
			expect(callback).toHaveBeenCalledWith('f', 'string');
			expect(callback).toHaveBeenCalledWith('g', 'string');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
			expect(callback).toHaveBeenCalledWith(false, 'boolean');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
		});

		test('should call callback for an object of mixed values', () => {
			const callback = jest.fn();
			const obj1 = { a: 1 };
			const obj2 = { b: 2 };
			const obj3 = { c: 3, d: { e: 4, f: { g: 5 } } };
			const arr1 = [6, 7, 8];
			const arr2 = ['t', 'm', 'p'];
			const arr3 = [true, false, true];
			const obj = { obj1, obj2, obj3, arr1, arr2, arr3 };
			iterateObjectValues(obj, callback, { includeKeys: true });
			expect(callback).toHaveBeenCalledTimes(27);
			// keys
			expect(callback).toHaveBeenCalledWith('a', 'string');
			expect(callback).toHaveBeenCalledWith('b', 'string');
			expect(callback).toHaveBeenCalledWith('c', 'string');
			expect(callback).toHaveBeenCalledWith('d', 'string');
			expect(callback).toHaveBeenCalledWith('e', 'string');
			expect(callback).toHaveBeenCalledWith('f', 'string');
			expect(callback).toHaveBeenCalledWith('g', 'string');
			expect(callback).toHaveBeenCalledWith('obj1', 'string');
			expect(callback).toHaveBeenCalledWith('obj2', 'string');
			expect(callback).toHaveBeenCalledWith('obj3', 'string');
			expect(callback).toHaveBeenCalledWith('arr1', 'string');
			expect(callback).toHaveBeenCalledWith('arr2', 'string');
			expect(callback).toHaveBeenCalledWith('arr3', 'string');
			// values
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
			expect(callback).toHaveBeenCalledWith(4, 'number');
			expect(callback).toHaveBeenCalledWith(5, 'number');
			expect(callback).toHaveBeenCalledWith(6, 'number');
			expect(callback).toHaveBeenCalledWith(7, 'number');
			expect(callback).toHaveBeenCalledWith(8, 'number');
			expect(callback).toHaveBeenCalledWith('t', 'string');
			expect(callback).toHaveBeenCalledWith('m', 'string');
			expect(callback).toHaveBeenCalledWith('p', 'string');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
			expect(callback).toHaveBeenCalledWith(false, 'boolean');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
		});

		test('should call callback for an object with a circular reference', () => {
			const callback = jest.fn();
			const obj1 = { a: 1 };
			const obj2 = { b: 2 };
			const obj3 = { c: 3, d: { e: 4, f: { g: 5 } } };
			const arr1 = [6, 7, 8];
			const arr2 = ['e', 'f', 'g'];
			const arr3 = [true, false, true];
			const obj = { obj1, obj2, obj3, arr1, arr2, arr3 };
			(obj as any).obj1.circular = obj;
			iterateObjectValues(obj, callback, { includeKeys: true });
			expect(callback).toHaveBeenCalledTimes(28);
			// keys
			expect(callback).toHaveBeenCalledWith('a', 'string');
			expect(callback).toHaveBeenCalledWith('b', 'string');
			expect(callback).toHaveBeenCalledWith('c', 'string');
			expect(callback).toHaveBeenCalledWith('d', 'string');
			expect(callback).toHaveBeenCalledWith('e', 'string');
			expect(callback).toHaveBeenCalledWith('f', 'string');
			expect(callback).toHaveBeenCalledWith('g', 'string');
			expect(callback).toHaveBeenCalledWith('obj1', 'string');
			expect(callback).toHaveBeenCalledWith('obj2', 'string');
			expect(callback).toHaveBeenCalledWith('obj3', 'string');
			expect(callback).toHaveBeenCalledWith('arr1', 'string');
			expect(callback).toHaveBeenCalledWith('arr2', 'string');
			expect(callback).toHaveBeenCalledWith('arr3', 'string');
			expect(callback).toHaveBeenCalledWith('circular', 'string');
			// values
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
			expect(callback).toHaveBeenCalledWith(4, 'number');
			expect(callback).toHaveBeenCalledWith(5, 'number');
			expect(callback).toHaveBeenCalledWith(6, 'number');
			expect(callback).toHaveBeenCalledWith(7, 'number');
			expect(callback).toHaveBeenCalledWith(8, 'number');
			expect(callback).toHaveBeenCalledWith('e', 'string');
			expect(callback).toHaveBeenCalledWith('f', 'string');
			expect(callback).toHaveBeenCalledWith('g', 'string');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
			expect(callback).toHaveBeenCalledWith(false, 'boolean');
			expect(callback).toHaveBeenCalledWith(true, 'boolean');
		});

		test('should call callback once for an object that has multiple references to the same object', () => {
			const callback = jest.fn();
			const obj1 = { a: 1 };
			const obj2 = { b: 2 };
			const obj3 = { c: 3 };
			const obj = { obj1, obj2, obj3, obj4: obj1, obj5: obj1, obj6: obj1 };
			iterateObjectValues(obj, callback, { includeKeys: true });
			expect(callback).toHaveBeenCalledTimes(12);
			// keys
			expect(callback).toHaveBeenCalledWith('a', 'string');
			expect(callback).toHaveBeenCalledWith('b', 'string');
			expect(callback).toHaveBeenCalledWith('c', 'string');
			expect(callback).toHaveBeenCalledWith('obj1', 'string');
			expect(callback).toHaveBeenCalledWith('obj2', 'string');
			expect(callback).toHaveBeenCalledWith('obj3', 'string');
			expect(callback).toHaveBeenCalledWith('obj4', 'string');
			expect(callback).toHaveBeenCalledWith('obj5', 'string');
			expect(callback).toHaveBeenCalledWith('obj6', 'string');
			// values
			expect(callback).toHaveBeenCalledWith(1, 'number');
			expect(callback).toHaveBeenCalledWith(2, 'number');
			expect(callback).toHaveBeenCalledWith(3, 'number');
		});
	});
});

describe('Filtering value types', () => {
	test('should only call callback for numbers', () => {
		const callback = jest.fn();
		const obj = { a: 1, b: '2', c: true };
		iterateObjectValues(obj, callback, { valueTypes: ['number'] });
		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(1, 'number');
	});

	test('should only call callback for strings', () => {
		const callback = jest.fn();
		const obj = { a: 1, b: '2', c: true };
		iterateObjectValues(obj, callback, { valueTypes: ['string'] });
		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith('2', 'string');
	});

	test('should only call callback for booleans', () => {
		const callback = jest.fn();
		const obj = { a: 1, b: '2', c: true };
		iterateObjectValues(obj, callback, { valueTypes: ['boolean'] });
		expect(callback).toHaveBeenCalledTimes(1);
		expect(callback).toHaveBeenCalledWith(true, 'boolean');
	});

	test('should only call callback for functions', () => {
		const callback = jest.fn();
		const obj = { a: 1, b: '2', c: true };
		iterateObjectValues(obj, callback, { valueTypes: ['function'] });
		expect(callback).toHaveBeenCalledTimes(0);
	});

	test('should only call callback for numbers and strings', () => {
		const callback = jest.fn();
		const obj = { a: 1, b: '2', c: true };
		iterateObjectValues(obj, callback, { valueTypes: ['number', 'string'] });
		expect(callback).toHaveBeenCalledTimes(2);
		expect(callback).toHaveBeenCalledWith(1, 'number');
		expect(callback).toHaveBeenCalledWith('2', 'string');
	});

	test('should only call callback for numbers and booleans', () => {
		const callback = jest.fn();
		const obj = { a: 1, b: '2', c: true };
		iterateObjectValues(obj, callback, { valueTypes: ['number', 'boolean'] });
		expect(callback).toHaveBeenCalledTimes(2);
		expect(callback).toHaveBeenCalledWith(1, 'number');
		expect(callback).toHaveBeenCalledWith(true, 'boolean');
	});
});
