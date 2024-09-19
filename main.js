// Function to convert a string from a given base to decimal
function convertToDecimal(value, base) {
    return parseInt(value, base);
}

// Lagrange interpolation to find the constant term
function lagrangeInterpolation(points) {
    let c = 0;
    const k = points.length;

    for (let i = 0; i < k; i++) {
        let [xi, yi] = points[i];
        let term = yi;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let [xj, _] = points[j];
                term *= (0 - xj) / (xi - xj);
            }
        }
        c += term;
    }

    return c;
}

// Main function to parse the input and solve for the constant term
function findConstantTerm(jsonInput) {
    // Parse the JSON input
    const inputData = JSON.parse(jsonInput);
    const n = inputData.keys.n;
    const k = inputData.keys.k;

    // Collect the roots (x, y pairs)
    const points = [];
    for (let i = 1; i <= n; i++) {
        const base = parseInt(inputData[i].base);
        const value = inputData[i].value;
        const x = i;
        const y = convertToDecimal(value, base);
        points.push([x, y]);
    }

    // Solve for the constant term using Lagrange interpolation
    const constantTerm = lagrangeInterpolation(points.slice(0, k));
    
    console.log(Math.round(constantTerm));  // Output the constant term
}

// Example usage with the provided test case
const testCase = `{
    "keys": {
        "n": 9,
        "k": 6
    },
    "1": {
        "base": "10",
        "value": "28735619723837"
    },
    "2": {
        "base": "16",
        "value": "1A228867F0CA"
    },
    "3": {
        "base": "12",
        "value": "32811A4AA0B7B"
    },
    "4": {
        "base": "11",
        "value": "917978721331A"
    },
    "5": {
        "base": "16",
        "value": "1A22886782E1"
    },
    "6": {
        "base": "10",
        "value": "28735619654702"
    },
    "7": {
        "base": "14",
        "value": "71AB5070CC4B"
    },
    "8": {
        "base": "9",
        "value": "122662581541670"
    },
    "9": {
        "base": "8",
        "value": "642121030037605"
    }
}`;

findConstantTerm(testCase);
