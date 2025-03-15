export function insertionSort(array) {
    const animations = [];
    for (let i = 1; i < array.length; i++) {
      let j = i;
      while (j > 0 && array[j] < array[j - 1]) {
        animations.push([j, j-1, 'compare']);
        animations.push([j, j-1, 'swap']);
        [array[j], array[j - 1]] = [array[j - 1], array[j]];
        animations.push([j, j-1, 'revert']);
        j--;
      }
    }
    return animations;
  }