import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import * as Inputs from '@ui/inputs';

// NOTE: Id's are resolved to frequencies for
// NMI at withGive
export const FREQUENCY_IDS = [
  { label: 'one time', id: 'once' },
  { label: 'every week', id: 'weekly' },
  { label: 'every two weeks', id: 'biweekly' },
  { label: 'once a month', id: 'monthly' },
];

const FrequencyInput = (({
  scheduleFrequencies = FREQUENCY_IDS,
  onChange,
  value,
  ...pickerProps
}) => (
  <Inputs.Picker
    label="Frequency"
    onValueChange={onChange}
    value={value}
    displayValue={get(scheduleFrequencies.find(f => f.id === value), 'label')}
    {...pickerProps}
  >
    {scheduleFrequencies.map(({ label, id }) => (
      <Inputs.PickerItem label={label} value={id} key={id} />
    ))}
  </Inputs.Picker>
));

FrequencyInput.propTypes = {
  scheduleFrequencies: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
  })),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onChange: PropTypes.func,
};

export default FrequencyInput;
