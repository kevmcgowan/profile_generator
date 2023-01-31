// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');


// create Manager class constructor to extend Employee
class Engineer extends Employee {
    constructor(name, id, email, GitHubusername) {
        super(name, id, email);
        this.github = GitHubusername;
        this.role = 'Engineer';
    };

    getGithub() {
        return this.github;
    }

    getRole() {
        return this.role;
    };
};

module.exports = Engineer;