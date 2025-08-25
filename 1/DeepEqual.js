function deepEqual(actual, expected, path = '$') {
  
  if (actual === expected) {
    return true;
  }

  
  if (actual === null || expected === null) {
    throw new Error(`Различие в ${path}`);
  }

  
  if (typeof actual !== 'object' || typeof expected !== 'object') {
    throw new Error(`Различие в ${path}`);
  }

  
  if (Array.isArray(actual) && Array.isArray(expected)) {
    if (actual.length !== expected.length) {
      throw new Error(`Различие в ${path}`);
    }
    for (let i = 0; i < actual.length; i++) {
      deepEqual(actual[i], expected[i], `${path}[${i}]`);
    }
    return true;
  }

  
  if (Array.isArray(actual) !== Array.isArray(expected)) {
    throw new Error(`Различие в ${path}`);
  }

  
  const keysA = Object.keys(actual);
  const keysB = Object.keys(expected);

  if (keysA.length !== keysB.length) {
    throw new Error(`Различие в ${path}`);
  }

  for (let key of keysA) {
    if (!expected.hasOwnProperty(key)) {
      throw new Error(`Различие в ${path}.${key}`);
    }
    deepEqual(actual[key], expected[key], `${path}.${key}`);
  }

  return true;
}


const obj1 = { a: { b: 1 } };
const obj2 = { a: { b: 2 } };
const obj3 = { a: { b: 1 } };

console.log(deepEqual(obj1, obj1)); 
try {
  deepEqual(obj1, obj2);
} catch (e) {
  console.error(e.message);
}
console.log(deepEqual(obj1, obj3));
