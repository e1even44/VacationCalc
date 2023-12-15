
// testing ***

function numberComparator(a, b) {
    if (a > b) {
        return true;
    }
    return false;
}

function heightWeightComparator(a, b) {
    if (a.height === b.height) {
        return (a.weight > b.weight);
    }

    return (a.height > b.height);
}

function bubblesort(array, comparator) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (comparator(array[j], array[j + 1])) {
                const temp = array[j + 1];
                array[j + 1] = array[j];
                array[j] = temp;
            }
        }
    }
    return array;
}

function heightWeightSort(array, comparator) {
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - 1; j++) {
            if (comparator(array[j], array[j + 1])) {
                const temp = array[j + 1];
                array[j + 1] = array[j];
                array[j] = temp;
            }
        }
        return array;
    }
}