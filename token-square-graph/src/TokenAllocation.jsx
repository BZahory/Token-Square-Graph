import React, { useCallback, useMemo, useState } from 'react';
import { VictoryPie } from 'victory';

const FormRangeInput = ({ onChange, name, label, value, max }) => {
  return (
    <div className="w-full text-left my-4">
      <label htmlFor={name} className="w-full form-label text-xl capitalize">{label.replace('_', ' ')}</label>
      <div className='flex'>
        <input
          type="range"
          className="
            form-range
            appearance-none
            w-full
            h-6
            p-0
            bg-transparent
            focus:outline-none focus:ring-0 focus:shadow-none
          "
          max={max}
          value={value || "0"}
          id={name}
          onChange={onChange}
        />
        <span className="text-md ml-2">{value}%</span>
      </div>
    </div>
  );
}

const TokenAllocationForm = ({ categories, onChange, max }) => {
  return (
    <>
      {Object.keys(categories).map((category) => (
        <FormRangeInput
        name={category} label={category} value={categories[category]} key={category}
        onChange={(e) => {
            onChange(category, +e.target.value)
          }}
          categories={categories}
          max={categories[category] > max ? categories[category]+max : max}
      />
      ))}
    </>
  );
}

const defaultCategories = {
  'team': 0,
  'investor': 0,
  'treasury': 0,
  'community': 0,
  'private_sale': 0,
  'public_sale': 0,
}

const colors = ["#FABD03", "#34A853", "#EA4535", "#4285F4", "#FF6D01", "cyan" ];

const TokenAllocation = ({ totalToken = 100 }) => {
  const [categories, setCategories] = useState({...defaultCategories });

  const totalAllocated = useMemo(() => {
    const sum = Object.values(categories).reduce((accumulator, curr) => accumulator + curr);
    return sum;
  }, [categories]);

  const chartData = useMemo(() => {
    let res = Object.keys(categories).map((category, i) => ({ x: category.replace('_', ' '), y: categories[category], fill: colors[i] })).filter((datum) => !!datum.y);

    if (totalToken - totalAllocated > 0) res.push({ x: 'unallocated', y: totalToken - totalAllocated, fill: '#737373' });

    return res;
  }, [categories, totalAllocated, totalToken]);
  
  const handleChange = useCallback((category, value) => {
    setCategories({...categories, [category]: (value || 0)});;
  }, [categories, setCategories]);

  return (
    <div className='container m-auto px-6 py-8'>
      <h1 className='text-4xl'>Token Allocation</h1>
      <div className="lg:grid lg:grid-cols-12 lg:gap-6 my-6">
        <div className="col-span-4 flex flex-col items-center justify-center">
          <TokenAllocationForm onChange={handleChange} categories={categories} max={totalToken - totalAllocated} />
        </div>
        <div className='col-span-7 flex items-center'>
          <VictoryPie
            data={chartData}
            innerRadius={30}
            width={200}
            height={200}
            labels={({ datum }) => `${datum.x}\n${datum.y}%`}
            labelRadius={({ innerRadius }) => innerRadius + 3 }
            labelPlacement='parallel'
            style={{
              data: {
                fill: ({ datum }) => datum.fill,
                opacity: ({ datum }) => datum.opacity
              },
              labels: {
                fontSize: 3
              }
            }}
          >
          </VictoryPie>
        </div>
      </div>
    </div>
  );
}

export default TokenAllocation;

