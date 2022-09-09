const jwt = require('jsonwebtoken');
//JWT represents encrypted content using JSON-based data structure
const config = require('./config');

const accounts = [
    { username: "test", password: "testtest" }
];

const handleSignUp = (username, password) => {
    if (hasDuplicateUsername(username)) {
        throw Error(`Account with username ${username} already exists`);
    }

    accounts.push({ username, password });
};

const handleSignIn = (username, password) => {
    const accountsWithUsername = accounts.filter(account => account.username === username);
    if (accountsWithUsername.length === 0) {
        throw new Error(`Account with username ${username} does not exist`);
    }

    const accountWithUsername = accountsWithUsername[0];

    if (accountWithUsername.password !== password) {
        throw new Error("Password is wrong");
    }

    return jwt.sign({ username }, config.jwtSecret);
};

const hasDuplicateUsername = (username) => {
    return accounts.filter(account => account.username === username).length > 0;
};

module.exports = {
    handleSingUp: handleSignUp,
    handleSignIn
};