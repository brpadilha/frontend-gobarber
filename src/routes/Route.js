import React from 'react';
import PropTypes from 'prop-types';

import { Route, Redirect } from 'react-router-dom';

export default function RouteWrapper({
  // eslint-disable-next-line react/prop-types
  component: Component,
  // eslint-disable-next-line react/prop-types
  isPrivate = false,
  ...rest
}) {
  const signed = true;

  if (!signed && isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="dashboard" />;
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTipes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
