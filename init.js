/**
 * This script runs automatically after your first npm-install.
 */
const _prompt = require('prompt');
const { mv, rm, which, exec } = require('shelljs');
const replace = require('replace-in-file');
const colors = require('colors');
const path = require('path');
const { readFileSync, writeFileSync } = require('fs');

const VCF = `
____    ____  ______  _______ 
\\   \\  /   / /      ||   ____|
 \\   \\/   / |  ,----'|  |__   
  \\      /  |  |     |   __|  
   \\    /   |  \`----.|  |     
    \\__/     \\______||__|     
                     
`;

// Note: These should all be relative to the project root directory
const rmDirs = ['.git'];
const rmFiles = ['init.js'];
const modifyFiles = ['package.json', 'test/element_test.html'];
const renameFiles = [
  ['src/vcf-element.js', 'src/--elementname--.js'],
  ['test/vcf-element_test.html', 'test/--elementname--_test.html']
];

const _promptSchemaElementName = {
  properties: {
    element: {
      description: colors.cyan('What do you want the element to be called? (use kebab-case)'),
      pattern: /^[a-z]+(\-[a-z]+)*$/,
      type: 'string',
      required: true,
      message: '"kebab-case" uses lowercase letters, and hyphens for any punctuation'
    }
  }
};

const _promptSchemaElementSuggest = {
  properties: {
    useSuggestedName: {
      description: colors.cyan('Would you like it to be called "' + elementNameSuggested() + '"? [Yes/No]'),
      pattern: /^(y(es)?|n(o)?)$/i,
      type: 'string',
      required: true,
      message: 'You need to type "Yes" or "No" to continue...'
    }
  }
};

_prompt.start();
_prompt.message = '';

// Clear console
process.stdout.write('\x1B[2J\x1B[0f');

if (!which('git')) {
  console.log(colors.red('Sorry, this script requires git'));
  removeItems();
  process.exit(1);
}

// Say hi!
console.log(colors.cyan(VCF));
console.log(colors.cyan("Hi! You're almost ready to make the next great VCF web component."));

// Generate the element name and start the tasks
if (process.env.CI == null) {
  if (!elementNameSuggestedIsDefault()) {
    elementNameSuggestedAccept();
  } else {
    elementNameCreate();
  }
} else {
  // This is being run in a CI environment, so don't ask any questions
  setupElement(elementNameSuggested());
}

/**
 * Asks the user for the name of the element if it has been cloned into the
 * default directory, or if they want a different name to the one suggested
 */
function elementNameCreate() {
  _prompt.get(_promptSchemaElementName, (err, res) => {
    if (err) {
      console.log(colors.red('Sorry, there was an error building the workspace :('));
      removeItems();
      process.exit(1);
      return;
    }

    setupElement(res.element);
  });
}

/**
 * Sees if the users wants to accept the suggested element name if the project
 * has been cloned into a custom directory (i.e. it's not 'vcf-element')
 */
function elementNameSuggestedAccept() {
  _prompt.get(_promptSchemaElementSuggest, (err, res) => {
    if (err) {
      console.log(colors.red("Sorry, you'll need to type the element name"));
      elementNameCreate();
    }

    if (res.useSuggestedName.toLowerCase().charAt(0) === 'y') {
      setupElement(elementNameSuggested());
    } else {
      elementNameCreate();
    }
  });
}

/**
 * The element name is suggested by looking at the directory name of the
 * tools parent directory and converting it to kebab-case
 *
 * The regex for this looks for any non-word or non-digit character, or
 * an underscore (as it's a word character), and replaces it with a dash.
 * Any leading or trailing dashes are then removed, before the string is
 * lowercased and returned
 */
function elementNameSuggested() {
  return path
    .basename(path.resolve(__dirname, '.'))
    .replace(/[^\w\d]|_/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
}

/**
 * Checks if the suggested element name is the default, which is 'vcf-element'
 */
function elementNameSuggestedIsDefault() {
  if (elementNameSuggested() === 'vcf-element') {
    return true;
  }

  return false;
}

/**
 * Calls all of the functions needed to setup the element
 *
 * @param elementname
 */
function setupElement(elementname) {
  console.log(colors.cyan('\nThanks for the info. The last few changes are being made... hang tight!\n\n'));

  // Get the Git username and email before the .git directory is removed
  let username = exec('git config user.name').stdout.trim();
  let usermail = exec('git config user.email').stdout.trim();

  removeItems();

  modifyContents(elementname, username, usermail);

  renameItems(elementname);

  finalize();

  console.log(colors.cyan("OK, you're all set. Happy coding!! ;)\n"));
}

/**
 * Removes items from the project that aren't needed after the initial setup
 */
function removeItems() {
  console.log(colors.underline.white('Removed'));

  // The directories and files are combined here, to simplify the function,
  // as the 'rm' command checks the item type before attempting to remove it
  let rmItems = rmDirs.concat(rmFiles);
  rm('-rf', rmItems.map(f => path.resolve(__dirname, '.', f)));
  console.log(colors.red(rmItems.join('\n')));

  console.log('\n');
}

/**
 * Updates the contents of the template files with the element name or user details
 *
 * @param elementname
 * @param username
 * @param usermail
 */
function modifyContents(elementname, username, usermail) {
  console.log(colors.underline.white('Modified'));

  const elementclassname = elementname
    .split('-')
    .map(c => c[0].toUpperCase() + c.slice(1))
    .join('');

  let files = modifyFiles.map(f => path.resolve(__dirname, '.', f));
  try {
    const changes = replace.sync({
      files,
      from: [/--elementname--/g, /--elementclassname--/g, /--username--/g, /--usermail--/g],
      to: [elementname, elementclassname, username, usermail]
    });
    console.log(colors.yellow(modifyFiles.join('\n')));
  } catch (error) {
    console.error('An error occurred modifying the file: ', error);
  }

  console.log('\n');
}

/**
 * Renames any template files to the new element name
 *
 * @param elementname
 */
function renameItems(elementname) {
  console.log(colors.underline.white('Renamed'));

  renameFiles.forEach(function(files) {
    // Files[0] is the current filename
    // Files[1] is the new name
    let newFilename = files[1].replace(/--elementname--/g, elementname);
    mv(path.resolve(__dirname, '.', files[0]), path.resolve(__dirname, '.', newFilename));
    console.log(colors.cyan(files[0] + ' => ' + newFilename));
  });

  console.log('\n');
}

/**
 * Calls any external programs to finish setting up the element
 */
function finalize() {
  console.log(colors.underline.white('Finalizing'));

  // Recreate Git folder
  let gitInitOutput = exec('git init "' + path.resolve(__dirname, '.') + '"', {
    silent: true
  }).stdout;
  console.log(colors.green(gitInitOutput.replace(/(\n|\r)+/g, '')));

  // Remove post-install command
  let jsonPackage = path.resolve(__dirname, '.', 'package.json');
  const pkg = JSON.parse(readFileSync(jsonPackage));

  // Note: Add items to remove from the package file here
  delete pkg.scripts.postinstall;

  writeFileSync(jsonPackage, JSON.stringify(pkg, null, 2));
  console.log(colors.green('Postinstall script has been removed'));

  console.log('\n');
}
