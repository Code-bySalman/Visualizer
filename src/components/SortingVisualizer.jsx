import { useState, useEffect } from 'react';
import { bubbleSort } from '../algorithms/bubbleSort';
import { mergeSort } from '../algorithms/mergeSort';
import { quickSort } from '../algorithms/quickSort';
import { insertionSort } from '../algorithms/insertionSort';
import React from 'react';

const MIN_BAR_HEIGHT = 40;
const MAX_BAR_HEIGHT = 320;

const algorithmExplanations = {
  bubbleSort: ["💧 Neighbor comparisons", "🔄 Swaps elements", "🐢 Simple but slow"],
  mergeSort: ["✂️ Divide & conquer", "🧩 Merge sorted halves", "🌳 Recursive sorting"],
  quickSort: ["🚀 Pivot partitioning", "📦 In-place sorting", "⚡ Fastest average"],
  insertionSort: ["🃏 Builds sorted array", "🔍 Insert in order", "📈 Good for small data"]
};

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [inputNumbers, setInputNumbers] = useState('');
  const [error, setError] = useState('');
  const [explanationStep, setExplanationStep] = useState(0);

  useEffect(() => {
    setExplanationStep(0);
    const timer = setInterval(() => {
      setExplanationStep(prev => Math.min(prev + 1, algorithmExplanations[selectedAlgorithm].length - 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [selectedAlgorithm]);

  const normalizeValues = (numbers) => {
    if (numbers.length === 0) return [];
    const minVal = Math.min(...numbers);
    const maxVal = Math.max(...numbers);
    return numbers.map(num => {
      if (minVal === maxVal) return MIN_BAR_HEIGHT;
      return ((num - minVal) / (maxVal - minVal)) * (MAX_BAR_HEIGHT - MIN_BAR_HEIGHT) + MIN_BAR_HEIGHT;
    });
  };

  const handleVisualizeAndSort = () => {
    const numbers = inputNumbers.split(',')
      .map(num => parseInt(num.trim(), 10))
      .filter(num => !isNaN(num));
    
    if (numbers.length < 2 || numbers.length > 40) {
      setError('Enter 2-40 numbers (e.g., 34,12,89)');
      return;
    }
    
    setError('');
    const normalizedHeights = normalizeValues(numbers);
    setArray(numbers.map((num, index) => ({
      value: num,
      height: normalizedHeights[index]
    })));
    
    const arrCopy = [...numbers];
    let animations = [];
    
    switch(selectedAlgorithm) {
      case 'bubbleSort': animations = bubbleSort(arrCopy); break;
      case 'mergeSort': animations = mergeSort(arrCopy); break;
      case 'quickSort': animations = quickSort(arrCopy); break;
      case 'insertionSort': animations = insertionSort(arrCopy); break;
    }
    
    animateSorting(animations, arrCopy);
  };

  const animateSorting = (animations, sortedArray) => {
    setIsSorting(true);
    const bars = document.getElementsByClassName('array-bar');

    animations.forEach(([idx1, idx2, action], i) => {
      setTimeout(() => {
        const bar1 = bars[idx1];
        const bar2 = bars[idx2];
        
        switch(action) {
          case 'compare':
            bar1.classList.add('bg-red-500');
            bar2.classList.add('bg-red-500');
            break;
          case 'swap':
            [bar1.style.height, bar2.style.height] = [bar2.style.height, bar1.style.height];
            [bar1.children[0].textContent, bar2.children[0].textContent] = 
              [bar2.children[0].textContent, bar1.children[0].textContent];
            break;
          case 'revert':
            bar1.classList.remove('bg-red-500');
            bar2.classList.remove('bg-red-500');
            break;
        }
      }, i * speed);
    });

    setTimeout(() => {
      setIsSorting(false);
      const normalizedHeights = normalizeValues(sortedArray);
      setArray(sortedArray.map((num, index) => ({
        value: num,
        height: normalizedHeights[index]
      })));
    }, animations.length * speed);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-8 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Sorting Visualizer
        </h1>

        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-1 bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-slate-700/50">
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-200 mb-3 sm:mb-4">
              {selectedAlgorithm.replace(/([A-Z])/g, ' $1').replace('Sort', '').trim()}
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
              <div className="p-3 sm:p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div className="space-y-2 h-40 overflow-y-auto">
                  {algorithmExplanations[selectedAlgorithm].map((line, index) => (
                    <div 
                      key={index}
                      className={`text-slate-300 text-xs sm:text-sm transition-all duration-500 ${
                        index <= explanationStep ? 
                        'opacity-100 translate-y-0' : 
                        'opacity-0 translate-y-2'
                      }`}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-3 sm:p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                <div className="text-xl sm:text-2xl font-bold text-slate-200">
                  {{
                    bubbleSort: 'O(n²) Time',
                    mergeSort: 'O(n log n)',
                    quickSort: 'O(n log n)',
                    insertionSort: 'O(n²)'
                  }[selectedAlgorithm]}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 bg-slate-800/50 p-4 sm:p-6 rounded-xl border border-slate-700/50">
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={inputNumbers}
                  onChange={(e) => setInputNumbers(e.target.value)}
                  placeholder="Numbers: 34,12,89,5"
                  className="flex-1 px-4 py-2 sm:py-3 text-sm sm:text-base bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 focus:ring-2 focus:ring-cyan-500"
                />
                <button
                  onClick={handleVisualizeAndSort}
                  disabled={isSorting}
                  className="px-6 py-2 sm:py-3 text-sm sm:text-base bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {isSorting ? 'Sorting...' : 'Visualize'}
                </button>
              </div>
              {error && <div className="text-red-400 -mt-2 text-xs sm:text-sm">{error}</div>}

              {/* ... (keep all previous code the same) */}

<div className="relative rounded-xl bg-slate-900/30 border border-slate-700/50 p-4">
  <div className="flex items-end h-64 sm:h-80 gap-1 sm:gap-2 overflow-x-auto pb-2">
    {array.map((item, idx) => (
      <div
        key={idx}
        className="array-bar relative min-w-[2%] flex-shrink-0 bg-indigo-500 rounded-t sm:rounded-t-lg transition-all duration-300 shadow-lg flex items-center justify-center"
        style={{ height: `${item.height}px` }}
      >
        <span className="text-white text-xs xs:text-sm font-medium absolute bottom-1">
          {item.value}
        </span>
      </div>
    ))}
  </div>
</div>



              <div className="flex flex-col md:flex-row gap-4 items-center">
                <select
                  value={selectedAlgorithm}
                  onChange={(e) => setSelectedAlgorithm(e.target.value)}
                  className="w-full md:w-56 px-4 py-2 text-sm sm:text-base bg-slate-700/50 border border-slate-600/50 rounded-lg text-slate-200 focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="bubbleSort">Bubble Sort</option>
                  <option value="mergeSort">Merge Sort</option>
                  <option value="quickSort">Quick Sort</option>
                  <option value="insertionSort">Insertion Sort</option>
                </select>

                <div className="flex-1 w-full space-y-1">
                  <div className="flex justify-between text-slate-400 text-xs sm:text-sm">
                    <span>Slow</span>
                    <span>Fast</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-full bg-slate-700/50 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortingVisualizer;