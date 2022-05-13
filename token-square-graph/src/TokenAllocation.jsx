import React, { useCallback, useMemo, useState } from 'react';
import { VictoryPie, VictoryTheme } from 'victory';
import { canvas as canvasToken } from './tokenschedules';

const FormRangeInput = ({ onChange, name, label, value, max }) => {
  return (
    <div className="w-full text-left my-4">
      <label htmlFor={name} className="w-full form-label text-xl capitalize">{label.replace(/_/g, ' ')}</label>
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
          min={0}
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
          max={categories[category]+max}
      />
      ))}
    </>
  );
}

const getCategories = (tokenAllocations) => {
  const categories = {};

  tokenAllocations.forEach((allocation) => {
    categories[allocation.category] = allocation.allocation.alloc;
  });

  return categories;
}

const colors = [
  "#2C56DD",
  "#FF6B4A",
  "#09237D",
  "#34DDAE",
  "#202328",
  "#3A4F97",
  "#3DEDD8",
  "#09237D",
  "#698899",
  "#01D49A",
  "#3A4F97",
  "#87A0AD",
  "#FF896E",
  "#84FDE7",
  "#6B7AB1",
  "#A4B8C2",
  "#FEA691",
  "#A4FDEE",
  "#67E5C2",
  "#9DA7CB",
  "#C2D0D5",
  "#FFC4B7",
  "#C1FEF3",
  "#99EED7",
  "#E1E7EA",
  "#FEE1DB",
  "#E0FFF9",
  "#CCF6EB",
];

const TokenAllocation = ({ totalToken = canvasToken.maxSupply, allocations = canvasToken.allocations }) => {
  const HUNDRED_PERCENT = 100;
  const [categories, setCategories] = useState(getCategories(allocations));

  const percentageAllocated = useMemo(() => {
    const percentageSum = Object.values(categories).reduce((accumulator, curr) => accumulator + curr);
    return percentageSum;
  }, [categories]);

  const chartData = useMemo(() => {
    const res = Object.keys(categories).map((category, i) => ({ x: category.split(' ')[0], y: categories[category], fill: colors[i] })).filter((datum) => !!datum.y);

    if ((HUNDRED_PERCENT - percentageAllocated) > 0) res.push({ x: 'unallocated', y: HUNDRED_PERCENT - percentageAllocated, fill: '#87A0AD' });

    return res;
  }, [categories, percentageAllocated]);
  
  const handleChange = useCallback((category, value) => {
    setCategories({...categories, [category]: (value || 0)});;
  }, [categories, setCategories]);

  return (
    <div className='container m-auto px-6 py-8'>
      <h1 className='text-4xl'>${canvasToken.symbol} Allocation</h1>
      <div className="text-lg mt-4">
        <span><b>Total Tokens:</b> {totalToken.toLocaleString()}</span>
        <span className='mx-3'><b>Allocated Tokens:</b> {((percentageAllocated/HUNDRED_PERCENT)*totalToken).toLocaleString(2)}</span>
        <span className='mx-3'><b>Unallocated Tokens:</b> {(totalToken - ((percentageAllocated/HUNDRED_PERCENT)*totalToken)).toLocaleString(2)}</span>
      </div>
      <div className="lg:grid lg:grid-cols-12 lg:gap-6 my-6">
        <div className="col-span-4 flex flex-col items-center justify-center">
          <TokenAllocationForm onChange={handleChange} categories={categories} max={HUNDRED_PERCENT - percentageAllocated} />
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
            theme={VictoryTheme.material}
            style={{
              data: {
                fill: ({ datum }) => datum.fill,
                opacity: ({ datum }) => datum.opacity
              },
              labels: {
                fontSize: 3,
                fill: '#ffffff',
                textTransform: 'capitalize',
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default TokenAllocation;
