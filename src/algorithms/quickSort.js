export function quickSort(array) {
    const animations = [];
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
  }
  
  function quickSortHelper(array, low, high, animations) {
    if (low < high) {
      const pi = partition(array, low, high, animations);
      quickSortHelper(array, low, pi - 1, animations);
      quickSortHelper(array, pi + 1, high, animations);
    }
  }
  
  function partition(array, low, high, animations) {
    const pivot = array[high];
    let i = low - 1;
    
    for (let j = low; j < high; j++) {
      animations.push([j, high, 'compare']);
      if (array[j] < pivot) {
        i++;
        animations.push([i, j, 'swap']);
        [array[i], array[j]] = [array[j], array[i]];
      }
      animations.push([j, high, 'revert']);
    }
    
    animations.push([i+1, high, 'swap']);
    [array[i+1], array[high]] = [array[high], array[i+1]];
    return i + 1;
  }