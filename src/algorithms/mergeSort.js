export function mergeSort(array) {
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = [...array];
    mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
  }
  
  function mergeSortHelper(mainArray, start, end, auxiliaryArray, animations) {
    if (start === end) return;
    const middle = Math.floor((start + end) / 2);
    mergeSortHelper(auxiliaryArray, start, middle, mainArray, animations);
    mergeSortHelper(auxiliaryArray, middle + 1, end, mainArray, animations);
    merge(mainArray, start, middle, end, auxiliaryArray, animations);
  }
  
  function merge(mainArray, start, middle, end, auxiliaryArray, animations) {
    let k = start;
    let i = start;
    let j = middle + 1;
  
    while (i <= middle && j <= end) {
      animations.push([i, j, 'compare']);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        animations.push([k, auxiliaryArray[i], 'overwrite']);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        animations.push([k, auxiliaryArray[j], 'overwrite']);
        mainArray[k++] = auxiliaryArray[j++];
      }
      animations.push([i-1, j-1, 'revert']);
    }
  
    while (i <= middle) {
      animations.push([k, auxiliaryArray[i], 'overwrite']);
      mainArray[k++] = auxiliaryArray[i++];
    }
  
    while (j <= end) {
      animations.push([k, auxiliaryArray[j], 'overwrite']);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }