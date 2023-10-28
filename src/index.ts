type ValueTypes = 'bigint' | 'boolean' | 'function' | 'number' | 'string' | 'symbol';

export interface IterateObjectValuesOptions {
	/**
	 * The value of types you want to iterate over.
	 * @default undefined (all value types)
	 */
	valueTypes?: ValueTypes | ValueTypes[];
	/**
	 * @default false
	 */
	includeKeys?: boolean;
}

export function iterateObjectValues(obj: any, callback: (value: any, valueType: ValueTypes) => void, options?: IterateObjectValuesOptions): void {
	let visitedObjects: WeakSet<Object> | null = new WeakSet();
	const { valueTypes, includeKeys } = options ?? {};
	iterateObjectValuesInternal(obj, callback, visitedObjects, valueTypes, includeKeys);
	visitedObjects = null;
}

function iterateObjectValuesInternal(obj: any, callback: (value: any, valueType: ValueTypes) => void, visitedObjects: WeakSet<Object>, valueTypes?: ValueTypes | ValueTypes[], includeKeys?: boolean): void {
	if (obj === null || obj === undefined) {
		return;
	}

	const callIterateObjectValues = (value: any) => iterateObjectValuesInternal(value, callback, visitedObjects, valueTypes, includeKeys);

	const objType = typeof obj;
	if (objType === 'object') {
		if (visitedObjects.has(obj)) {
			return;
		}
		visitedObjects.add(obj);
	}

	if (valueTypes) {
		valueTypes = Array.isArray(valueTypes) ? valueTypes : [valueTypes];
		if (!valueTypes.includes(objType as ValueTypes) && objType !== 'object') {
			return;
		}
	}

	if (objType === 'object') {
		if (Array.isArray(obj)) {
			for (const item of obj) {
				callIterateObjectValues(item);
			}
		} else if (obj instanceof Map) {
			for (const [key, value] of obj) {
				if (includeKeys) {
					callIterateObjectValues(key);
				}
				callIterateObjectValues(value);
			}
		} else if (obj instanceof Set) {
			for (const value of obj) {
				callIterateObjectValues(value);
			}
		} else {
			for (const key in obj) {
				if (Object.prototype.hasOwnProperty.call(obj, key)) {
					if (includeKeys) {
						callIterateObjectValues(key);
					}
					callIterateObjectValues(obj[key]);
				}
			}
		}
	} else {
		callback(obj, objType as ValueTypes);
	}
}
