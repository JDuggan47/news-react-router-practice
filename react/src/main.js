import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import ArticlesIndexContainer from './containers/ArticlesIndexContainer'


$(function() {
  ReactDOM.render(
    <ArticlesIndexContainer />,
    document.getElementById('app')
  );
});
