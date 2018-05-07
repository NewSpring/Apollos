import React from 'react';
import { get } from 'lodash';
import { pure } from 'recompose';

import * as Inputs from '@ui/inputs';

const enhance = pure;

const GeographicPicker = enhance(({
  options = [],
  value,
  ...pickerProps
}) => (
  <Inputs.Picker
    displayValue={get(options.find(option => option.id === value), 'label')}
    value={value}
    {...pickerProps}
  >
    {options.map(({ label, id }) => (
      <Inputs.PickerItem label={label} value={id} key={id} />
    ))}
  </Inputs.Picker>
));

export default GeographicPicker;
