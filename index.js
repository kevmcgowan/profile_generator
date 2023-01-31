const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
// create an employee array
const employeeArr = []; 
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
// Create an array for the team profiles to populate
let team = []; 

// TODO: Write Code to gather information about the development team members, and render the HTML file.
// function to initialize program and prompt user for input to create team profile page using inquirer
function init() {
  console.log("Welcome to the Team Profile Generator");
  // Inquirer manager prompt
  inquirer.prompt([
        {
            type: 'input',
            name: 'teamManagerName',
            message: 'Input your team manager\'s name:',
            validate: teamManagerName => {
               if (teamManagerName && teamManagerName.trim().length > 0) {
                  return true;
               } else {
                  console.log('Input your manager\'s name:');
                  return false;
               };
            }
          },
          {
            type: 'input',
            name: 'managerId',
            message: 'Input your manager\'s employee ID:',
            validate: managerId => {
               if (managerId && managerId.trim().length > 0) {
                  return true;
               } else {
                  console.log('Input your manager\'s employee ID:');
                  return false;
               };
            }
          },
          {
            type: 'input',
            name: 'managerEmail',
            message: 'Input your manager\'s email address:',
            validate: managerEmail => {
               if (managerEmail && managerEmail.trim().length > 0) {
                  // Check email address format
                  if (/^.+@.+\..+$/gi.test(managerEmail)) {
                     return true;
                  };
               }
               else {
                  console.log('Input your manager\'s email address:');
                  return false;
               };
            }
          },
          {
            type: 'input',
            name: 'OfficeNumber',
            message: 'Input your manager\'s office number:',
            validate: officeNumber => {
               if (officeNumber && officeNumber.trim().length > 0) {
                  return true;
               } else {
                  console.log('Input your manager\'s office number:');
                  return false;
               };
            }
          }
    ])
    .then((data) => {
      // create Manager object
      let manager = new Manager(
        data.teamManagerName,
        data.managerId,
        data.managerEmail,
        data.OfficeNumber
      );
      // add manager to employee array
      employeeArr.push(manager); 
     
      addEmployee();
    });
}

// function to prompt user to select a role to create or finish building
function addEmployee() {
  inquirer.prompt([
      {
        type: "list",
        name: "employeeType",
        message: "Would you like to add another profile?",
        choices: ["Engineer", "Intern", "Done"],
      },
    ])
    .then((data) => {
      if (data.employeeType === "Engineer") {
        // Enter the Engineer's information
        inquirer.prompt([
            {
                type: 'input',
                name: 'engineerName',
                message: 'Input your engineer\'s name:',
                validate: engineerNameInput => {
                   if (engineerNameInput && engineerNameInput.trim().length > 0) {
                      return true;
                   } else {
                      console.log('Input your engineer\'s name:');
                      return false;
                   };
                }
              },
              {
                type: 'input',
                name: 'engineerId',
                message: 'Input your engineer\'s employee ID:',
                validate: engineerIdInput => {
                   if (engineerIdInput && engineerIdInput.trim().length > 0) {
                      return true;
                   } else {
                      console.log('Input your engineer\'s employee ID:');
                      return false;
                   };
                }
              },
              {
                type: 'input',
                name: 'engineerEmail',
                message: 'Input your engineer\'s email address:',
                validate: engineerEmailInput => {
                   if (engineerEmailInput && engineerEmailInput.trim().length > 0) {
                      // Check email address format
                      if (/^.+@.+\..+$/gi.test( engineerEmailInput)) {
                         return true;
                      };
                   } else {
                      console.log('Input your engineer\'s email address:');
                      return false;
                   };
                }
              },
              {
                type: 'input',
                name: 'engineerGithubUsername',
                message: 'Input your engineer\'s Github username:',
                validate: engineerGithubUsername => {
                   if (engineerGithubUsername && engineerGithubUsername.trim().length > 0) {
                      return true;
                   } else { 
                     console.log('Input your engineer\'s Github username:');
                     return false;
                   };
                }
              }
          ])
          .then((data) => {
            // create Engineer object
            const engineer = new Engineer(
              data.engineerName,
              data.engineerId,
              data.engineerEmail,
              data.engineerGithubUsername
            );
            employeeArr.push(engineer); // add engineer to employee array
           // function to prompt user to select a role to create or finish building
            inquirer.prompt([
                {
                  type: "list",
                  name: "continue",
                  message: "Would you like to add another profile or finish?",
                  choices: ["Add another profile", "Finish"],
                },
              ])
              .then((data) => {
                if (data.continue === "Add another profile") {
                  addEmployee();
                } else {
                  
                  const html = render(employeeArr);
                  fs.writeFile(outputPath, html, "utf-8", (err) => {
                    if (err) throw err;
                    console.log("Team has been created and written to output/team.html");
                  });
                }
              });
          });
      } else if (data.employeeType === "Intern") {
        // Enter the Intern's information
        inquirer.prompt([
            {
                type: 'input',
                name: 'internName',
                message: 'Input your intern\'s name:',
                validate: internNameInput => {
                   if (internNameInput && internNameInput.trim().length > 0) {
                      return true;
                   } else {
                      console.log('Input your intern\'s name:');
                      return false;
                   };
                }
             },
             {
                type: 'input',
                name: 'internId',
                message: 'Input your intern\'s employee ID:',
                validate: internIdInput => {
                   if (internIdInput && internIdInput.trim().length > 0) {
                      return true;
                   }else {
                      console.log('Input your intern\'s employee ID:');
                      return false;
                   };
                }
             },
             {
                type: 'input',
                name: 'internEmail',
                message: 'Input your intern\'s email address:',
                validate: internEmailInput => {
                   if (internEmailInput && internEmailInput.trim().length > 0) {
                      // Check email address format
                      if (/^.+@.+\..+$/gi.test( internEmailInput)) {
                         return true;
                      };
                   } else {
                      console.log('Input your intern\'s email address:');
                      return false;
                   };
                }
             },
             {
               type: 'input',
               name: 'internSchool',
               message: 'Input your intern\'s school name:',
               validate: internSchoolInput => {
                  if (internSchoolInput && internSchoolInput.trim().length > 0) {
                     return true;
                  } else {
                     console.log('Input your intern\'s school name:');
                     return false;
                  };
               }
            },
          ])
          .then((data) => {
            // create Intern object
            const intern = new Intern(
              data.internName,
              data.internId,
              data.internEmail,
              data.internSchool
            );
            employeeArr.push(intern); // add intern to employee array
            // Add more employees or finish building
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "continue",
                  message: "Would you like to add another profile or finish?",
                  choices: ["Add another profile", "Finish"],
                },
              ])
              .then((data) => {
                if (data.continue === "Add another profile") {
                  addEmployee();
                } else {
                  // render the HTML and write it to a file using fs
                  const html = render(employeeArr);
                  fs.writeFile(outputPath, html, "utf-8", (err) => {
                    if (err) throw err;
                    console.log("Team has been created and written to output/team.html");
                  });
                }
              });
          });
      }
    });
}

init();