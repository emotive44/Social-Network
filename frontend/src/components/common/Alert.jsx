import React from 'react';
import './Alert.scss';

import { connect } from 'react-redux';

const Alert = ({ alerts }) => {
  return alerts !== null && alerts.length > 0 && alerts.map((alert, i) => (
    <div key={i} className={`alert alert-${alert.alertType}`}>
      {alert.msg}
    </div>
  ));
}

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);