/*const fs = require('fs-extra');
const path = require('path');
const Handlebars = require('handlebars');
const { parse } = require('csv-parse');

const locationsData = require('./data/locations.json');
const templatePath = path.join(__dirname, 'templates', 'landing-page.html');
const outputDir = path.join(__dirname, 'public');

async function generatePages() {
    const templateContent = await fs.readFile(templatePath, 'utf-8');
    const template = Handlebars.compile(templateContent);

    for (const location of locationsData) {
        const htmlContent = template(location);
        const outputPath = path.join(outputDir, `${location.id}.html`);
        await fs.outputFile(outputPath, htmlContent);
        console.log(`Generated page for ${location.city}, ${location.state}`);
    }
}

generatePages().catch(console.error);*/


const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const { parse } = require('csv-parse');

const csvFilePath = path.join(__dirname, 'data', 'locations.csv');
const templatePath = path.join(__dirname, 'templates', 'landing-page.html');
const outputDir = path.join(__dirname, 'public');

async function readCSV(filePath) {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream(filePath)
            .pipe(parse({
                columns: true,
                skip_empty_lines: true
            }))
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(error));
    });
}

async function generatePages() {
    try {
        const locationsData = await readCSV(csvFilePath);
        const templateContent = await fs.promises.readFile(templatePath, 'utf-8');
        const template = Handlebars.compile(templateContent);

        for (const location of locationsData) {
            // Parse the services string into an array
            location.services = location.services.split(',').map(service => service.trim());

            const htmlContent = template(location);
            const outputPath = path.join(outputDir, `${location.id}.html`);
            await fs.promises.writeFile(outputPath, htmlContent);
            console.log(`Generated page for ${location.city}, ${location.state}`);
        }
    } catch (error) {
        console.error('Error generating pages:', error);
    }
}

generatePages();