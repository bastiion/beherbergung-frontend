import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import schema from '../schema/homeRegistartionSchema.json';
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';

const initialData = {
};

const renderers = [
  ...materialRenderers,
  //register custom renderers
];

const HomeRegistrationForm = () => {
  const [data, setData] = useState<any>(initialData);

  return (
    <JsonForms
      schema={schema}
      data={data}
      renderers={renderers}
      cells={materialCells}
      onChange={({errors, data}) => setData(data)}
    />
  );
};

export default HomeRegistrationForm;
