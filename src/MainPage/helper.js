import chiSquaredTest from 'chi-squared-test';
import React from 'react';

export function parseRolls(s, numFaces) {
    const vals = s.split(/[\n, ]+/);

    // Check if each element is a number
    for (let i = 0; i < vals.length; i++) {
        if (isNaN(parseInt(vals[i]))) {
            throw new Error('Text does not contain integers');
        }

        else {
            vals[i] = parseInt(vals[i]);
            if (vals[i] > numFaces) {
                throw new Error('Number exceeds faces');
            }
        }
    }
    return vals;
}

export function pearsonTest(arr, numFaces) {
    const observed = getFrequencies(arr, numFaces);
    const numRolls = arr.length;
    const expected = Array(numFaces).fill(numRolls/numFaces);
    const reduction = 1;

    const prob = chiSquaredTest(observed, expected, reduction);

    if (arr.length < 5 * numFaces) {
        alert('Warning: Too few rolls to use statistical test')
    }

    return prob;
}

function getFrequencies(arr, numFaces) {
    let counts = Array(numFaces).fill(0);
    for (let i = 0; i < arr.length; i++) {
        const num = arr[i];
        counts[num - 1] += 1;
    }
    return counts;
}

export function outputFromState(prob) {
    return (
        <div className="my-2">
            <h2 className="m-2 text-left">
                Result:
            </h2>

            <h4 className="m-2 text-left">
                Probability dice is fair: {truncate(prob, 3)}
            </h4>
        </div>
    );
}

function truncate(num, decimalPlaces) {
    return parseFloat(num.toFixed(decimalPlaces));
}