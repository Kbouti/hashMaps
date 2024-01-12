console.log(`Hello from the hash maps console`);

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
    this.next;
  }
}

class Bucket {
  constructor(index) {
    this.index = index;
    this.contents = null;
  }
}

// function generateBuckets(size){
//     //takes the length of the array you want, returns an array containing empty bucket objects
//     console.log(`generate buckets triggered, size: ${size}`);
//     let array = [];
//     for (let i = 0; i < size; i++) {
//       array.push(new Bucket(i));
//     }
// return array;
// }
// Was I just not returning the array on this function before?

class HashMap {
  constructor() {
    this.capacity = 16;
    this.loadFactor = 0.75;
    this.buckets = this.generateBuckets(this.capacity);
    // this.buckets = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  }

  generateBuckets(size) {
    console.log(`generate buckets triggered`);
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
    console.log(`set function triggered`);

    let newNode = new Node(key, value);
    let hashedKey = this.hash(key);
    console.log(newNode);
    console.log(`hashedKey: ${hashedKey}`);
    let bucketNumber = hashedKey % this.capacity;
    console.log(`bucketNumber: ${bucketNumber}`);

    console.log(this.buckets);
    console.log(this.buckets[0]);

    if (this.buckets[bucketNumber].contents !== null) {
      console.log(`Something in this bucket already`);
      console.log(this.buckets[bucketNumber].contents);
      let currentNode = this.buckets[bucketNumber];
      console.log(currentNode);
      // Somehow currentNode is undefined inside this while loop

        while (currentNode.next !== null) {
          currentNode = currentNode.next;
        }
      currentNode.next = new Node(key, value);
    } else {
      this.buckets[bucketNumber].contents = new Node(key, value);
    }
  }
}

let bees = new HashMap();

bees.set(`Kevin`, `Whaaaat`);
bees.set(`Kevhhhin`, `Whaaaat`);
bees.set(`Kevfgsdn`, `Whaaaat`);
bees.set(`Kevertetin`, `Whaaaat`);
