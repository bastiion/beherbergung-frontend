import React, {ComponentType, useCallback} from 'react'
import {
  ArrayLayoutProps,
  composeWithUi,
  getData,
  OwnPropsOfControl,
  Resolve} from "@jsonforms/core";
import _ from 'lodash';
import {
  Hidden,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox, SelectChangeEvent
} from "@mui/material";

import {
  ctxDispatchToArrayControlProps,
  ctxToArrayLayoutProps,
  JsonFormsStateContext,
  withJsonFormsContext
} from "@jsonforms/react";
import {useTranslation} from "react-i18next";

type ArrayDataProp = {
  arrayData: any[]
}

type CustomArrayLayoutProps = ArrayLayoutProps & ArrayDataProp

const CustomArrayControlRenderer = ({removeItems, addItem, visible, schema, arrayData, path, label }: CustomArrayLayoutProps) => {
  const options = schema.oneOf?.map(({const: key, title}) => ({
    key: key as string,
    value: key,
    label: title
  }))

  const getLabel = (_key:string) =>
   options?.find(({key}) => key === _key)?.label || _key
  const values: string[] =  arrayData || []

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const targetValues = event.target.value
      const diff = _.xor(values, targetValues)
      if(targetValues.length > values.length) {
        diff.forEach(item => addItem(path, item)())
      } else {
        diff.forEach(item => {
          const i = values.indexOf(item)
          i > -1 && removeItems && removeItems(path, [i])()
        })
      }

    },
    [addItem, removeItems, values],
  );

  const  { t } = useTranslation()


  return <Hidden xsUp={!visible}>
    <FormControl fullWidth={true}>
      <InputLabel id="multiple-checkbox-label">{label}</InputLabel>
      {<Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={values}
        onChange={handleChange}
        input={<Input />}
        renderValue={(selected: string[]) => selected.map(s => t(getLabel(s))).join(', ')}
      >
        {options?.map(({key, value, label}) => (
          <MenuItem key={key} value={value}>
            <Checkbox checked={values.indexOf(value) > -1} />
            <ListItemText primary={t(label)} />
          </MenuItem>
        ))}
      </Select>}
    </FormControl>
  </Hidden>
}
const withContextToArrayLayoutProps =
  (Component: ComponentType<CustomArrayLayoutProps>): ComponentType<OwnPropsOfControl> =>
    ({ ctx, props }: JsonFormsStateContext & ArrayLayoutProps) => {
      const arrayLayoutProps = ctxToArrayLayoutProps(ctx, props);
      const rootData = getData({jsonforms: ctx});
      const path = composeWithUi(props.uischema, props.path);
      const data = Resolve.data(rootData, path);
      const dispatchProps = ctxDispatchToArrayControlProps(ctx.dispatch);
      return (<Component {...arrayLayoutProps} {...dispatchProps} arrayData={data} />);
    };

export const withJsonFormsArrayLayoutProps =
  (Component: ComponentType<CustomArrayLayoutProps>, memoize = true): ComponentType<OwnPropsOfControl> =>
    withJsonFormsContext(withContextToArrayLayoutProps(memoize ? React.memo(Component) : Component));

export default withJsonFormsArrayLayoutProps(CustomArrayControlRenderer)
