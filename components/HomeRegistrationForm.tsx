import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import schema from '../schema/homeRegistartionSchema.json';
import uischema from '../uischema/homeRegistrationUISchema.json'
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import {useTranslation} from "react-i18next";
import {JsonFormsI18nState} from "@jsonforms/core";


const initialData = {
};

const renderers = [
  ...materialRenderers,
  //register custom renderers
];

const HomeRegistrationForm = () => {
  const [data, setData] = useState<any>(initialData);
  const { t, i18n: { language, exists } } = useTranslation()

  const i18n: JsonFormsI18nState = {
    locale: language,
    translate: (key, defaultMessage) => {
      return  exists(key) ? t(key) : (defaultMessage && exists(defaultMessage) ? t(defaultMessage) :  defaultMessage )
    }
  }

  return (
    <JsonForms
      schema={schema}
      uischema={uischema}
      data={data}
      renderers={renderers}
      cells={materialCells}
      onChange={({errors, data}) => setData(data)}
      i18n={i18n}
    />
  );
};

export default HomeRegistrationForm;
