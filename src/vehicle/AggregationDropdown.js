import React from 'react'

import {capitalize} from '../utils/string'

import Dropdown from '../common/components/Dropdown'

const AggregationDropdown = ({counts, options, onChange}) => {
  let aggregationOptions = Object.keys(counts || {})

  if(options.transformOptions)
    aggregationOptions = options.transformOptions(aggregationOptions)

  const getLabel = key => (options.translations && options.translations[key]) || capitalize(key)

  return (
    <div className="input-group-no-conflict">
      <label>{typeof options === 'string'?options:options.label}</label>
      <Dropdown
        options={[undefined, ...aggregationOptions]}
        valueLabel={key => key?getLabel(key):'Any'}
        optionLabel={key => key?`${getLabel(key)} (${counts[key]})`:'Any'}
        onChange={onChange}
      />
    </div>
  ) 
}

export default AggregationDropdown