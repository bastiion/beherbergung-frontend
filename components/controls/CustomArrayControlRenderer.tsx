import React from 'react'
import {ArrayLayoutProps} from "@jsonforms/core";
import {Hidden} from "@mui/material";
import {withJsonFormsArrayLayoutProps} from "@jsonforms/react";

const CustomArrayControlRenderer = ({removeItems, visible}: ArrayLayoutProps) => {
  return <Hidden xsUp={!visible}>custom</Hidden>
}

export default withJsonFormsArrayLayoutProps(CustomArrayControlRenderer)
