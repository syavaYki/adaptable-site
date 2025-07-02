import React, { useState } from 'react';
import { Filters, SelectedFilters } from '../../types/Filters';
import { Button } from 'react-bulma-components';
import classNames from 'classnames';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  filterData: Filters | undefined;
  onChange: (selectedFilters: SelectedFilters) => void;
};

const initialSelectedFilters: SelectedFilters = {
  pet_type: [],
  minAge: 0,
  maxAge: 99,
  breed: [],
  sex: undefined,
  coloration: [],
  weightMin: 0,
  weightMax: 999,
  isSterilized: undefined,
};

export const CatalogFilter: React.FC<Props> = ({ filterData, onChange }) => {
  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>(
    initialSelectedFilters,
  );

  const handleCheckboxChange = (field: keyof Filters, value: string) => {
    const oldValues = Array.isArray(selectedFilters[field])
      ? (selectedFilters[field] as string[])
      : [];
    const newValue = oldValues.includes(value)
      ? oldValues.filter(v => v !== value)
      : [...oldValues, value];

    setSelectedFilters({ ...selectedFilters, [field]: newValue });
  };

  const handleNumberChange = (field: keyof Filters, value: string) => {
    const numericValue = value === '' ? null : parseInt(value, 10);
    setSelectedFilters({ ...selectedFilters, [field]: numericValue });
  };

  const handleSingleSelectionChange = (field: keyof Filters, value: string) => {
    const oldValues = selectedFilters[field];
    if (oldValues === value) {
      setSelectedFilters({ ...selectedFilters, [field]: undefined });
    } else {
      setSelectedFilters({ ...selectedFilters, [field]: value });
    }
  };

  const handleMultiSelectChange = (
    field: keyof Filters,
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedOptions = Array.from(
      e.target.selectedOptions,
      option => option.value,
    );
    setSelectedFilters({ ...selectedFilters, [field]: selectedOptions });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange(selectedFilters);
  };

  const handleFieldReset = (field: keyof Filters, defaultVal = []) => {
    setSelectedFilters({ ...selectedFilters, [field]: defaultVal });
  };

  const handleReset = () => {
    setSelectedFilters(initialSelectedFilters);
    onChange(initialSelectedFilters);
  };

  if (!filterData) {
    return <div className="box">Loading filters...</div>;
  }

  return (
    <div className="box">
      <p className="title is-5">Filters</p>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Type of Pet</label>
          <div className="control">
            {(filterData.pet_type || []).map(type => (
              <label
                className="checkbox mr-4"
                key={type}
              >
                <input
                  type="checkbox"
                  checked={
                    selectedFilters.pet_type
                      ? selectedFilters.pet_type.includes(type)
                      : false
                  }
                  onChange={() => handleCheckboxChange('pet_type', type)}
                />
                {` ${type}`}
              </label>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="label">Age Range (Years)</label>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Min"
                  value={selectedFilters.minAge ?? ''}
                  onChange={e => handleNumberChange('minAge', e.target.value)}
                />
              </p>
            </div>

            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Max"
                  value={selectedFilters.maxAge ?? ''}
                  onChange={e => handleNumberChange('maxAge', e.target.value)}
                />
              </p>
            </div>
          </div>
        </div>

        <div className="field">
          <div className="is-flex is-justify-content-space-between p-1">
            <label className="label m-0 p-0">Breed</label>
            <Button
              outlined
              rounded
              className="m-0 p-1"
              onClick={() => {
                handleFieldReset('breed');
              }}
            >
              <FontAwesomeIcon
                className={classNames('has-text-danger')}
                icon={faXmark}
              />
            </Button>
          </div>

          <div className="control">
            <div className="select is-multiple is-fullwidth">
              <select
                multiple
                size={5}
                value={selectedFilters.breed}
                onChange={e => handleMultiSelectChange('breed', e)}
              >
                {(filterData.breed || []).map(breed => (
                  <option
                    key={breed}
                    value={breed}
                  >
                    {breed}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <div className="is-flex is-justify-content-space-between p-1">
            <label className="label m-0 p-0">Coloration</label>
            <Button
              outlined
              rounded
              className="m-0 p-1"
              onClick={() => {
                handleFieldReset('coloration');
              }}
            >
              <FontAwesomeIcon
                className={classNames('has-text-danger')}
                icon={faXmark}
              />
            </Button>
          </div>
          <div className="control">
            <div className="select is-multiple is-fullwidth">
              <select
                multiple
                size={5}
                value={selectedFilters.coloration}
                onChange={e => handleMultiSelectChange('coloration', e)}
              >
                {(filterData.coloration || []).map(color => (
                  <option
                    key={color}
                    value={color}
                  >
                    {color}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="field">
          <label className="label">Sex</label>
          <div className="control">
            <label className="radio mr-4">
              <input
                className="mr-1"
                type="checkbox"
                name="sexMale"
                value="M"
                checked={
                  selectedFilters.sex
                    ? selectedFilters.sex.includes('Male')
                    : false
                }
                onChange={() => handleSingleSelectionChange('sex', 'Male')}
              />
              {'Male'}
            </label>

            <label className="radio mr-4">
              <input
                className="mr-1"
                type="checkbox"
                name="sexFemale"
                value="F"
                checked={
                  selectedFilters.sex
                    ? selectedFilters.sex.includes('Female')
                    : false
                }
                onChange={() => handleSingleSelectionChange('sex', 'Female')}
              />
              {'Female'}
            </label>

            <label className="radio mr-4">
              <input
                className="mr-1"
                type="checkbox"
                name="sexUnknown"
                value="U"
                checked={
                  selectedFilters.sex
                    ? selectedFilters.sex.includes('Unknown')
                    : false
                }
                onChange={() => handleSingleSelectionChange('sex', 'Unknown')}
              />
              {'Unknown'}
            </label>
          </div>
        </div>

        <div className="field">
          <label className="label">Sterilized</label>
          <div className="control">
            <label className="checkbox mr-4">
              <input
                className="mr-1"
                type="checkbox"
                name="sterilizedYes"
                value="Yes"
                checked={
                  selectedFilters.isSterilized
                    ? selectedFilters.isSterilized.includes('Yes')
                    : false
                }
                onChange={() =>
                  handleSingleSelectionChange('isSterilized', 'Yes')
                }
              />
              Yes
            </label>

            <label className="checkbox mr-4">
              <input
                className="mr-1"
                type="checkbox"
                name="sterilizedNo"
                value="No"
                checked={
                  selectedFilters.isSterilized
                    ? selectedFilters.isSterilized.includes('No')
                    : false
                }
                onChange={() =>
                  handleSingleSelectionChange('isSterilized', 'No')
                }
              />
              No
            </label>
          </div>
        </div>

        <div className="field">
          <label className="label">Weight Range (kg)</label>
          <div className="field-body">
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Min"
                  value={selectedFilters.weightMin ?? ''}
                  onChange={e =>
                    handleNumberChange('weightMin', e.target.value)
                  }
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="Max"
                  value={selectedFilters.weightMax ?? ''}
                  onChange={e =>
                    handleNumberChange('weightMax', e.target.value)
                  }
                />
              </p>
            </div>
          </div>
        </div>
        <div className="field is-grouped mt-5">
          <div className="control is-expanded">
            <button
              className="button is-primary is-fullwidth"
              type="submit"
            >
              Apply
            </button>
          </div>
          <div className="control is-expanded">
            <button
              className="button is-fullwidth"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
