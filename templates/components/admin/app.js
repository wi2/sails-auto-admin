import React from 'react';
import Router, {HistoryLocation} from 'react-router';
import {Routes} from 'auto-admin'
import * as modelsForm from './forms'

Router.run(Routes(), HistoryLocation, Root => {
  React.render(<Root {...window.__ReactInitState__} models={modelsForm} />, document.body);
  delete window.__ReactInitState__;
});
