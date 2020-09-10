import React from 'react';
import { ingredientTypes } from './UploadForm';

const Ingredients = ({ data = [], variant = 'light' }) => (
  data.length > 0 && (
    <ul className="mx-8">
      {data.map((ingredient, index) => {
        const type = ingredientTypes.find((i) => ingredient.type === i.name);
        const typeLabel = type ? type.label : ingredient.type;
        const last = index === data.length - 1;
        return (
          <li className={`flex border-t border-gray-300 py-2 ${last ? 'border-b' : ''}`}>
            <span className="text-gray-500">{ingredient.name}</span>
            &nbsp;
            <span className="text-gray-500">{`(${typeLabel})`}</span>
            &nbsp;
            <span className={`ml-auto ${variant === 'light' ? 'text-gray-900' : 'text-white'}`}>{`${ingredient.amount} gram`}</span>
          </li>
        );
      })}
    </ul>
  )
);

export default Ingredients;
