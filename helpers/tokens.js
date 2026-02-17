

const generateToken = () => Date.now() + Math.random().toString(32) + Math.random().toString(32).substring(2);

export {
    generateToken
}


