// 1. Start by creating a HashMap class or factory function. It’s up to you which you want to use. Then proceed to create the following methods:

// 2. hash takes a value and produces a hash code with it. We did implement a fairly good hash function in the previous lesson. You are free to use that, or if you wish, you can conduct your own research. Beware, this is a deep deep rabbit hole.

// *Hash maps could accommodate various data types for keys like numbers, strings, objects. But for this project, only handle keys of type strings.

// 3. set takes two arguments, the first is a key and the second is a value that is assigned to this key. If a key already exists, then the old value is overwritten.
//     Remember to grow your buckets size when it needs to, by calculating if your bucket has reached the load factor.

// 4. get takes one argument as a key and returns the value that is assigned to this key. If key is not found, return null.

// 5. has takes a key as an argument and returns true or false based on whether or not the key is in the hash map.

// 6. remove takes a key as argument and removes it from the hash table.

// 7. length returns the number of stored keys in the hash map.

// 8. clear removes all entries in the hash map.

// 9. keys returns an array containing all the keys inside the hash map.

// 10. values returns an array containing all the values.

// 11. entries returns an array that contains each key, value pair. Example: [[firstKey, firstValue], [secondKey, secondValue]]

// Remember that a hash map does not preserve insertion order when you are retrieving your hash map’s data. It is normal and expected for keys and values to appear out of the order you inserted them in.
// Extra Credit

// Create a class HashSet that behaves the same as a HashMap but only contains keys with no values.

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }

  remove(previousNode, key) {
    let currentNode = this;
    if (currentNode.key == key) {
      if (currentNode.next == null) {
        previousNode.next = null;
        return;
      }
      previousNode.next = currentNode.next;
      return;
    }
    let nextNode = currentNode.next;
    nextNode.remove(currentNode, key);
    return;
  }
}

class Bucket {
  constructor(index) {
    this.index = index;
    this.contents = null;
  }
}

class HashMap {
  constructor() {
    this.capacity = 3;
    this.loadFactor = 0.75;
    this.buckets = this.generateBuckets(this.capacity);
  }

  generateBuckets(size) {
    let array = [];
    for (let i = 0; i < size; i++) {
      array.push(new Bucket(i));
    }
    return array;
  }

  hash(string) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < string.length; i++) {
      hashCode = primeNumber * hashCode + string.charCodeAt(i);
    }
    return hashCode;
  }

  set(key, value) {
    if (this.has(key)) {
      this.remove(key);
    }
    let bucketNumber = this.hash(key) % this.capacity;
    if (bucketNumber < 0 || bucketNumber >= this.buckets.length) {
      throw new Error(`Trying to access index out of bound"`);
    }
    if (this.buckets[bucketNumber].contents !== null) {
      let currentNode = this.buckets[bucketNumber].contents;
      while (currentNode.next !== null) {
        currentNode = currentNode.next;
      }
      currentNode.next = new Node(key, value);
      return;
    } else {
      this.buckets[bucketNumber].contents = new Node(key, value);
      return;
    }
  }

  get(key) {
    let bucketNumber = this.hash(key) % this.capacity;
    let targetContents = this.buckets[bucketNumber].contents;
    if (targetContents == null) {
      return null;
    }
    if (targetContents.key == key) {
      return targetContents.value;
    }
    while (targetContents.next !== null) {
      targetContents = targetContents.next;
      if (targetContents.key == key) {
        return targetContents.value;
      }
    }
    return null;
  }

  has(key) {
    let bucketNumber = this.hash(key) % this.capacity;
    let targetContents = this.buckets[bucketNumber].contents;
    if (targetContents == null) {
      return false;
    }
    if (targetContents.key == key) {
      return true;
    }
    while (targetContents.next !== null) {
      targetContents = targetContents.next;
      if (targetContents.key == key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    if (!this.has(key)) {
      console.log(`Trying to remove a key that does not exist`);
      return null;
    }
    let bucketNumber = this.hash(key) % this.capacity;
    let rootNode = this.buckets[bucketNumber].contents;
    let currentNode = rootNode;
    if (rootNode.key == key && rootNode.next == null) {
      this.buckets[bucketNumber].contents = null;
      return;
    } else if (rootNode.key == key && rootNode.next !== null) {
      let nextNode = rootNode.next;
      this.buckets[bucketNumber].contents = nextNode;
      return;
    }
    currentNode = currentNode.next;
    currentNode.remove(rootNode, key);
    return;
  }

  length() {
    console.log(`length triggered`);
    let count = 0;
    console.log(`Number of buckets to check: ${this.capacity}`);
    for (let i = 0; i < this.capacity; i++) {
      let currentNode = this.buckets[i].contents;
      if (currentNode !== null) {
        count++;
        while (currentNode.next !== null) {
          count++;
          currentNode = currentNode.next;
        }
      }
      console.log(`done counting bucket ${i}`);
    }
    return count;
  }

  clear() {
    console.log(`Clear function triggered`);
    for (let i = 0; i < this.capacity; i++) {
      this.buckets[i].contents = null;
    }
    return;
  }

  keys() {
    console.log(`keys function called`);
    if (this.length() === 0) {
      console.log(`empty hash table, returning null`);
      return null;
    }
    let array = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i].contents !== null) {
        let currentNode = this.buckets[i].contents;
        array.push(currentNode.key);
        while (currentNode.next !== null) {
          currentNode = currentNode.next;
          array.push(currentNode.key);
        }
      }
    }
    return array;
  }

  values() {
    console.log(`values function called`);
    if (this.length() === 0) {
      console.log(`empty hash table, returning null`);
      return null;
    }
    let array = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i].contents !== null) {
        let currentNode = this.buckets[i].contents;
        array.push(currentNode.value);
        while (currentNode.next !== null) {
          currentNode = currentNode.next;
          array.push(currentNode.value);
        }
      }
    }
    return array;
  }

  entries() {
    console.log(`entries function called`);
    if (this.length() === 0) {
      console.log(`empty hash table, returning null`);
      return null;
    }
    let array = [];
    for (let i = 0; i < this.capacity; i++) {
      if (this.buckets[i].contents !== null) {
        let currentNode = this.buckets[i].contents;
        array.push([currentNode.key, currentNode.value]);
        while (currentNode.next !== null) {
          currentNode = currentNode.next;
          array.push([currentNode.key, currentNode.value]);
        }
      }
    }
    return array;
  }
}

let bees = new HashMap();

bees.set(`Key1`, `Value1`);
bees.set(`Key2`, `Value2`);
bees.set(`Key3`, `Value3`);
bees.set(`Key4`, `Value4`);
bees.set(`Key5`, `Value5`);

// bees.set(`Kevin`, `Whaaaat`);
bees.set(`Sally`, `Shitfuckery`);
bees.set(`tacos`, `first tacos`);
bees.set(`tacos`, `second tacos`);

// console.log(bees.get(`Kevin`));
// console.log(bees.get(`tacos`));
console.log(bees.has(`tacos`));
// bees.remove(`tacos`);
console.log(bees.has(`tacos`));
console.log(bees.get(`tacos`));
console.log(bees.length());
// bees.clear();
// console.log(bees.length());
console.log(bees.entries());
console.log(bees.keys());
console.log(bees.values());



class HashSet {
    constructor() {
        this.capacity = 3;
        this.loadFactor = 0.75;
        this.buckets = this.generateBuckets(this.capacity);
      }
    
      generateBuckets(size) {
        let array = [];
        for (let i = 0; i < size; i++) {
          array.push(new Bucket(i));
        }
        return array;
      }
    
      hash(string) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < string.length; i++) {
          hashCode = primeNumber * hashCode + string.charCodeAt(i);
        }
        return hashCode;
      }
}