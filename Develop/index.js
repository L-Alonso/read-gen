const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');

// TODO: Create an array of questions for user input
const questions = () => {
    return inquirer.prompt([
        {
            type:'input',
            name:'name',
            message:'What would be your project tile?',
            validate:nameInput =>{
                if(nameInput){
                    return true;
                }else {
                    console.log('ERROR, project tile was not captured');
                    return false;
                }
            }
        },
        {
            type:'confirm',
            name:'confirmDescription',
            message:'May you please enter a description of the projected?',
            default:true
        },
        {
            type:'input',
            name:'about',
            message:'Provided information about the project',
            when:({confirmDescription}) =>{
                if(confirmDescription){
                    return true;
                } else{
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'installInstruction',
            message: 'What installations would you like us to know, if any?',
            default: true 
        },
        {
            type: 'input',
            name: 'instructions',
            message: 'Information on the installation(s) for your project?:',
            when: ({ installInstruction }) => {
                if (installInstruction) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'usageInformation',
            message: 'Provided any Usage Information you may like us to know?',
            default: true, 
        },
        {
            type: 'input',
            name: 'information',
            message: 'Provide the Usage Information about your project:',
            when: ({ usageInformation }) => {
                if (usageInformation) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'contributionGuidelines',
            message: 'Is there any Contribution Guidelines?',
            default: true, 
        },
        {
            type: 'input',
            name: 'guidelines',
            message: 'Provide the Contribution Guidelines:',
            when: ({ contributionGuidelines }) => {
                if (contributionGuidelines) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'testInstructions',
            message: 'Are there any Test Instructions?',
            default: true, 
        },
        {
            type: 'input',
            name: 'instructions',
            message: 'Provide the Test Instructions:',
            when: ({ testInstructions }) => {
                if (testInstructions) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'checkbox' ,
            name: 'license',
            message: 'What License did you use in this project? (Check those applicable)',
            choices: ['MIT', 'APACHE', 'GNU', 'BSD3'],
         },
         {
            type:'input',
            name:'github',
            message:'Enter your Github Username(required)',
            validate: nameInput =>{
              if(nameInput){
                return true;
              }else {
                console.log('Please enter your Github!');
                return false;
              }
            }
          },
          {
            type: 'input',
            name: 'email',
            message: 'Provided an Email. (Required)',
            validate: emailInput => {
                if (emailInput) {
                    return true;
                } else {
                    console.log('ERROR: email.');
                    return false
                }
            }
        },
    ])
}



questions()
  .then((readmeData) => {
    console.log(readmeData);
    writeToFile("readme.md", generateMarkdown(readmeData));
  })
  .catch((err) => {
    if (err) {
      throw err;
    }
  });
  // TODO: Create a function to write README file
function writeToFile(filename, readmeData) {
    console.log(filename, readmeData);
    return fs.writeFileSync(path.join(process.cwd(), filename), readmeData)};
