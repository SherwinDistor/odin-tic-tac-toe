// self-contained module
// everything to do with my module is in my module
// no global variables
// if a module manages more than one thing is should be split up
// separation of concerns
// dry code: don't repeat yourself
// efficient DOM usage
// very few query selectors
// all events can be unbound


const Formatter = (function(doc) {
    console.log('start')
    
    const timesRun = []

    const log = (message) => console.log(`[${Date.now()}] Logger: ${message}`)
    // const setTimesRun = () => {
    //     log('setting times run')
    //     ++timesRun
    // }

    const makeUppercase = (text) => {
        log('making uppercase')
        // timesRun.push(null)
        return text.toUpperCase()
    }

    const writeToDom = (selector, message) => {
        if (!!doc && 'querySelector' in doc) {
            doc.querySelector(selector).innerHTML = message
        }
    }

    return {
        makeUppercase,
        writeToDom,
    }
})(document)

// console.log(Formatter.makeUppercase('hello'))

// Formatter.timesRun = 10
// console.log(Formatter.timesRun.length)

// Formatter.writeToDom('#target', 'hi there')


const counter = (function() {

    // private stuff
    let count = 0;

    function print(message) {
        console.log(message + '---' + count)
    }

    // return an object
    return {
        //value: count,

        get: function() {
            return count;
        },

        set: function(value) {
            count = value;
        },

        increment: function() {
            count += 1;
            print('After increment: ')
        },

        reset: function() {
            print('Before reset: ')
            count = 0;
            print('After reset: ')
        }
    }

})();

console.log(counter.get());

counter.set(5);

console.log(counter.get());

counter.increment();
counter.increment();
counter.increment();

console.log(counter.get());

counter.reset();

console.log(counter.get());