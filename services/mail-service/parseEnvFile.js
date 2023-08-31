const fs = require("fs");

const envFilePath = require("path").join(__dirname, ".env"); // Path to your .env file

function parseEnvFile() {
    const envVars = {};
    const fileContents = fs.readFileSync(envFilePath, "utf-8");
    const lines = fileContents.split("\n");

    for (const line of lines) {
        const [key, value] = line.split("=");
        if (key && value) {
            envVars[key.trim()] = value.trim();
        }
    }

    process.env = { ...process.env, ...envVars };

    return envVars;
}

module.exports = parseEnvFile;
