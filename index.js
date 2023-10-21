// Quick Sort Algorithm
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (arr.length <= 1) {
        return arr;
    }

    if (left < right) {
        const pivotIndex = partition(arr, left, right);
        quickSort(arr, left, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, right);
    }

    return arr;
}

function partition(arr, left, right) {
    const pivot = arr[right];
    let i = left - 1;

    for (let j = left; j < right; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }
    swap(arr, i + 1, right);
    return i + 1;
}

function swap(arr, i, j) {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// V
const initialArrayGrid = document.getElementById('initial-array-grid');
const startButton = document.getElementById('start-button');
let initialArr = [90, 8, 70,4,40,3,50,1];
let displayedSteps = [];

// Displaying the initial array 
initialArr.forEach((value) => {
    const cell = document.createElement('div');
    cell.classList.add('array-grid');
    cell.textContent = value;
    initialArrayGrid.appendChild(cell);
});

startButton.addEventListener('click', () => {
    startButton.style.display = 'none';

    // Starting Quick Sort visualization
    visualizeQuickSort(initialArr);
});

function visualizeQuickSort(arr) {
    const steps = quickSortSteps([...arr]); //copying the initial array
    let stepIndex = 0;

    function displayStep() {
        if (stepIndex < steps.length) {
            const step = steps[stepIndex];

            const stepString = step.join(',');
            if (!displayedSteps.includes(stepString)) {
                displayedSteps.push(stepString);

                // Creatiing a array for each step.
                const sortedArrayGrid = createGridFromArray(step);

                // Displaying the array at each step
                document.body.appendChild(sortedArrayGrid);
            }

            stepIndex++;
            setTimeout(displayStep, 1000); // Time delay
        }
    }

    displayStep();
}

function quickSortSteps(arr, left = 0, right = arr.length - 1) {
    const steps = [];

    function quickSortStep(arr, left, right) {
        if (left < right) {
            const pivotIndex = partition(arr, left, right);
            steps.push([...arr]); // Cloning  the array and creating a  copy

            quickSortStep(arr, left, pivotIndex - 1);
            quickSortStep(arr, pivotIndex + 1, right);
        }
    }

    quickSortStep(arr, left, right);
    return steps;
}

function createGridFromArray(arr) {
    const grid = document.createElement('div');
    grid.classList.add('array-grid');

    arr.forEach((value) => {
        const cell = document.createElement('div');
        cell.textContent = value;
        cell.classList.add('array-grid-cell');
        grid.appendChild(cell);
    });

    return grid;
}