import React, { useEffect, useState } from 'react';
import ProgressBar from './ProgressBar';
import useStorage from '../hooks/useStorage';
import SelectBox from './SelectBox';

const types = ['image/png', 'image/jpeg'];

export const ingredientTypes = [
  {
    name: 'starter',
    label: 'Starter',
  },
  {
    name: 'liquid',
    label: 'Liquid',
  },
  {
    name: 'salt',
    label: 'Salt',
  },
  {
    name: 'flour',
    label: 'Flour',
  },
];
const UploadForm = ({ className }) => {
  const [file, setFile] = useState();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [ingredientName, setIngredientName] = useState('');
  const [ingredientType, setIngredientType] = useState(ingredientTypes[0].name);
  const [ingredientAmount, setIngredientAmount] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [error, setError] = useState();
  const [payload, setPayload] = useState({});
  const { url, progress } = useStorage(payload);

  useEffect(() => {
    if (url) {
      setTitle('');
      setDescription('');
      setFile(undefined);
      setIngredients([]);
      setPayload({});
    }
  }, [url, setFile]);

  const onFileChange = (e) => {
    const [selected] = e.target.files;

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError(undefined);
    } else {
      setFile(undefined);
      setError('Please select an image file (png or jpeg)');
    }
  };

  const onUploadClick = () => {
    if (file) {
      setPayload({
        file,
        title,
        description,
        ingredients,
      });
    } else {
      setError('Please select an image file');
    }
  };

  const onAddIngredientClick = () => {
    const amount = Number(ingredientAmount);
    if (!Number.isNaN(amount) && ingredientName && ingredientType) {
      setIngredients((prevValue) => [...prevValue, {
        name: ingredientName,
        type: ingredientType,
        amount,
      }]);

      setIngredientName('');
      setIngredientType(ingredientTypes[0].name);
      setIngredientAmount(0);
    }
  };

  return (
    <div className={className}>
      {error && <div className="error">{error}</div>}
      <div
        className="lg:w-2/3 mx-auto bg-white rounded-lg p-8 flex flex-col w-full mt-10 md:mt-0 relative z-10"
      >
        <input
          className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2 mb-4"
          placeholder="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea className="bg-white rounded border border-gray-400 focus:outline-none h-32 focus:border-indigo-500 text-base px-4 py-2 mb-4 resize-none" onChange={(e) => setDescription(e.target.value)} placeholder="Recipe" value={description} />
        <div className="flex justify-between flex-col lg:flex-row xl:flex-row mb-4">
          <input
            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
            placeholder="Name"
            type="text"
            onChange={(e) => setIngredientName(e.target.value)}
            value={ingredientName}
          />
          <SelectBox name="Type" options={ingredientTypes} onChange={setIngredientType} value={ingredientType} />
          <input
            className="bg-white rounded border border-gray-400 focus:outline-none focus:border-indigo-500 text-base px-4 py-2"
            placeholder="Amount"
            type="number"
            min="0"
            onChange={(e) => setIngredientAmount(e.target.value)}
            value={ingredientAmount}
          />
          <button
            type="button"
            className="flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded"
            onClick={onAddIngredientClick}
          >
            Add
          </button>
        </div>
        <ul>
          {ingredients.map((ingredient) => {
            const type = ingredientTypes.find((i) => ingredient.type === i.name);
            const typeLabel = type ? type.label : ingredient.type;
            return (
              <li className="flex border-t border-gray-300 py-2">
                <span className="text-gray-500">{ingredient.name}</span>
                &nbsp;
                <span className="text-gray-500">{`(${typeLabel})`}</span>
                &nbsp;
                <span className="ml-auto text-gray-900">{`${ingredient.amount} gram`}</span>
              </li>
            );
          })}
        </ul>
        <input className="mb-4" type="file" onChange={onFileChange} />
        <button
          type="button"
          onClick={onUploadClick}
          className={`text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg ${file ? '' : 'opacity-50 cursor-not-allowed'}`}
        >
          Upload
        </button>
      </div>
      {file && <ProgressBar progress={progress} />}
    </div>
  );
};

export default UploadForm;
