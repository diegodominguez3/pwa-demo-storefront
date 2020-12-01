import React from 'react';
import { shape, string } from 'prop-types';
import { mergeClasses } from '@magento/venia-ui/lib/classify';

import defaultClasses from './topbar.css';

const TopBar = (props) => {
  const classes = mergeClasses(defaultClasses, props.classes);
  return <div className={classes.root}>Top Bar Component </div>;
};

TopBar.propTypes = {
  classes: shape({
    root: string,
  }),
};

export default TopBar;