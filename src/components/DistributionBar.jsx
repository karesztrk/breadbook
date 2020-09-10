import React, { useState } from 'react';
import Tooltip from './Tooltip';
import { ingredientTypes } from './UploadForm';

const DistributionBar = ({ data = [] }) => {
  const calculateSummary = () => data.reduce((accumulator, currentValue) => {
    const exist = !!accumulator[currentValue.type];
    accumulator[currentValue.type] = exist ? accumulator[currentValue.type] + currentValue.amount
      : currentValue.amount;
    accumulator.total += currentValue.amount;
    return accumulator;
  }, {
    total: 0,
  });
  const calculateDistribution = (summary) => Object.keys(summary)
    .filter((key) => key !== 'total')
    .map((key) => {
      const percentage = (summary[key] / summary.total) * 100;
      const type = ingredientTypes.find((i) => key === i.name);
      const label = type ? type.label : key;
      return {
        name: key,
        label,
        percentage,
      };
    });
  const summary = calculateSummary();
  const distribution = calculateDistribution(summary);
  const [hovered, setHovered] = useState();
  const formatNumberFraction = (value, decimals = 2) => {
    const mod = decimals !== 0 ? 10 ** decimals : 1;
    return Math.round(value * mod) / mod;
  };
  return (
    <div className="distribution-bar h-2 flex rounded max-w">
      {distribution.map((item, index) => {
        const percentageText = `${formatNumberFraction(item.percentage)}%`;
        return (
          <span
            onMouseEnter={() => setHovered(item)}
            onMouseLeave={() => setHovered(undefined)}
            className={`bg-orange-${index + 3}00 distribution-part`}
            style={{
              width: percentageText,
            }}
          >
            {hovered && hovered.name === item.name && <Tooltip name={`${item.label} ${percentageText}`} />}
          </span>
        );
      })}
    </div>
  );
};

export default DistributionBar;
