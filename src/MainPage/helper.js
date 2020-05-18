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
    const expected = Array(numFaces).fill(1);
    const reduction = 1;
    const observed = getFrequencies(arr, numFaces);

    // Normalize both arrays
    const normExpected = normalize(expected);
    const normObserved = normalize(observed);

    const prob = chiSquaredTest(normObserved, normExpected, reduction);

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


function normalize(arr) {
    var ret = [...arr];
    const sum = arr.reduce((a,b) => a + b, 0)
    for (let i = 0; i < arr.length; i++) {
        ret[i] /= sum;
    }

    return ret;
}