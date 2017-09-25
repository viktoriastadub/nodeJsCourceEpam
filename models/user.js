class User {
    constructor(name) {
        this.name = name;
        console.log(`User module ${this.name}`);
    }

}
module.exports = User;