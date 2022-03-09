import { useState } from 'react';
import { JsonForms } from '@jsonforms/react';
import schema from '../schema/homeRegistartionSchema.json';
import uischema from '../uischema/homeRegistrationUISchema.json'
import {
  materialCells,
  materialRenderers,
} from '@jsonforms/material-renderers';
import {useTranslation} from "react-i18next";
import {
  createAjv,
  JsonFormsI18nState,
  rankWith,
  scopeEndIs
} from "@jsonforms/core";
import CustomArrayControlRenderer from "./controls/CustomArrayControlRenderer";


const initialData = {
};

const languageControlTester = rankWith(4, scopeEndIs('languages'))

const renderers = [
  ...materialRenderers,
  { tester: languageControlTester,
    renderer:  CustomArrayControlRenderer }
];

const HomeRegistrationForm = () => {
  const [data, setData] = useState<any>(initialData);
  const { t, i18n: { language, exists } } = useTranslation()
  const [ajv] = useState(createAjv({ strictRequired: false, allErrors: false }));

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
      ajv={ajv}
    />
  );
};

export default HomeRegistrationForm;
