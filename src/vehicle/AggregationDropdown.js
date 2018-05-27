import React from 'react'

import {capitalize} from '../utils/string'

import Dropdown from '../common/components/Dropdown'

const AggregationDropdown = ({counts, options, value, onChange}) => {
  //remove empty key (Any)
  let aggregationOptions = Object.keys(counts || {}).filter(key => key.length)

  if(options.transformOptions)
    aggregationOptions = options.transformOptions(aggregationOptions)

  const getLabel = key => (options.translations && options.translations[key]) || capitalize(key)

  return (
    <div className="input-group-no-conflict">
      <label>{typeof options === 'string'?options:options.label}</label>
      <Dropdown
        value={value}
        options={[undefined, ...aggregationOptions]}
        valueLabel={key => key?getLabel(key):'Any'}
        optionLabel={key => {
          const count = counts[key || '']

          return `${key?getLabel(key):'Any'}${count?` (${count})`:''}`
        }}
        onChange={onChange}
      />
    </div>
  ) 
}

export default AggregationDropdown