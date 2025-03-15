import React from 'react';
const Controls = ({
    resetArray,
    isSorting,
    speed,
    setSpeed,
    arraySize,
    setArraySize,
    selectedAlgorithm,
    handleAlgorithmChange,
    startSorting
  }) => {
    const algorithms = [
      { value: 'bubbleSort', label: 'Bubble Sort' },
      { value: 'mergeSort', label: 'Merge Sort' },
      { value: 'quickSort', label: 'Quick Sort' },
      { value: 'insertionSort', label: 'Insertion Sort' }
    ];
  
    return (
      <div className="max-w-3xl mx-auto bg-gray-700 p-4 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
    
          <div className="flex flex-col w-full md:w-auto">
            <label className="text-gray-300 text-sm mb-1">Algorithm</label>
            <select
              value={selectedAlgorithm}
              onChange={(e) => handleAlgorithmChange(e.target.value)}
              className="bg-gray-600 text-white rounded p-2 cursor-pointer"
              disabled={isSorting}
            >
              {algorithms.map((algo) => (
                <option key={algo.value} value={algo.value}>
                  {algo.label}
                </option>
              ))}
            </select>
          </div>
  
        
          <div className="flex flex-col gap-2 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <button
                onClick={resetArray}
                disabled={isSorting}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 rounded transition-colors text-white"
              >
                Generate New Array
              </button>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col">
                <label className="text-gray-300 text-sm">Size</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={arraySize}
                  onChange={(e) => setArraySize(Number(e.target.value))}
                  className="w-24"
                  disabled={isSorting}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-300 text-sm">Speed</label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-24"
                  disabled={isSorting}
                />
              </div>
            </div>
          </div>
  
          <button
            onClick={startSorting}
            disabled={isSorting}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-500 rounded transition-colors text-white w-full md:w-auto"
          >
            {isSorting ? 'Sorting...' : 'Start Sorting'}
          </button>
        </div>
      </div>
    );
  };
  
  export default Controls;