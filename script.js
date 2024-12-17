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

console.log(Formatter.makeUppercase('hello'))

// Formatter.timesRun = 10
// console.log(Formatter.timesRun.length)

Formatter.writeToDom('#target', 'hi there')