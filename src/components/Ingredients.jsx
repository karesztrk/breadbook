import React from 'react';

const LIQUID_TYPE = 'liquid';
const FLOUR_TYPE = 'flour';

const Ingredients = ({ data }) => {
  const calculateSummary = () => data.reduce((accumulator, currentValue) => {
    if (currentValue.type === FLOUR_TYPE) {
      accumulator.flour += currentValue.quantity;
    } else if (currentValue.type === LIQUID_TYPE) {
      accumulator.liquid += currentValue.quantity;
    }
    return accumulator;
  }, {
    flour: 0,
    liquid: 0,
  });

  const { liquid, flour } = calculateSummary();
  const hydro = (liquid / flour) * 100;
  return (
    data && (
      <div>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Type</td>
              <td>Quantity</td>
              <td>Unit</td>
            </tr>
          </thead>
          {data.map(({
            name, type, quantity, unit,
          }) => (
            <tr>
              <td>{name}</td>
              <td>{type}</td>
              <td>{quantity}</td>
              <td>{unit || 'gram'}</td>
            </tr>
          ))}
        </table>
        <div>
          <span>Hydratation</span>
          &nbsp;
          <span>{`${hydro}%`}</span>
        </div>
      </div>
    )
  );
};

export default Ingredients;
