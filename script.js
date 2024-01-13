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

  // Maybe we write the linkedList logic here?
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
    let bucketNumber = this.hash(key) % this.capacity;
    if (bucketNumber < 0 || bucketNumber >= this.buckets.length) {
      throw new Error(`Trying to access index out of bound"`);
    }
    if (this.buckets[bucketNumber].contents !== null) {
      let firstKey = this.buckets[bucketNumber].contents.key;
      if (firstKey == key) {
        let targetNode = this.buckets[bucketNumber].contents;
        targetNode.value = value;
      }
      let currentNode = this.buckets[bucketNumber].contents;
      while (currentNode.next !== null) {
        if (currentNode.next.key == key) {
          let targetNode = currentNode.next;
          targetNode.value = value;
        }
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
      console.log(`Nothing in this bucket`);
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
    console.log(`Key does exist`);


// I think maybe we write remove() on the node class so we can recursively call it in the linkedList


    let bucketNumber = this.hash(key) % this.capacity;
    let targetContents = this.buckets[bucketNumber].contents;
    if (targetContents.key == key) {
      console.log(
        `need to remove key: ${targetContents.key} value: ${targetContents.value}`
      );
      if (targetContents.next == null) {
        console.log(targetContents);
        this.buckets[bucketNumber].contents = null;
        console.log(targetContents);
        console.log(`deleted`);
        return;
      }

      // ************************************************************************
      // Gotta figure this part out:

      while (targetContents.next !== null) {
        let nextNode = targetContents.next;
        if (nextNode.key == key) {
          if (nextNode.next == null) {
            targetNode.next = null;
            //But we gotta make sure we're changing the actual object's next - not just the reference to it
          } else {
            targetNode.next = nextNode.next;
          }
        }
      }
      this.buckets[bucketNumber].contents = targetContents.next;
      console.log(`deleted, and set next reference`);
      return;
    }
  }
  // ************************************************************************
}

let bees = new HashMap();

bees.set(`Kevdsin`, `Whaaaat`);
bees.set(`Kesdfgsdfgvin`, `Whaaaat`);
bees.set(`Kevsdfin`, `Whaaaat`);
bees.set(`Kevdssssin`, `Whaaaat`);
bees.set(`Kevhljhhin`, `Whaaaat`);

bees.set(`Kevin`, `Whaaaat`);
bees.set(`Sally`, `Shitfuckery`);
bees.set(`tacos`, `first tacos`);
bees.set(`tacos`, `something here`);

// console.log(bees.get(`Kevin`));
// console.log(bees.get(`tacos`));
console.log(bees.has(`Sally`));
bees.remove(`Sally`);
console.log(bees.has(`Sally`));
console.log(bees.get(`Sally`));

// This isn't working like it should. Not finding this value
// Add console.logs to figure out the issue
