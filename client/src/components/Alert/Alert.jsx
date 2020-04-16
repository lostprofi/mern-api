import React from 'react';
import { connect } from 'react-redux';

const Alert = (props) => {

  const { alerts } = props;

  return alerts.map((alert) => {
    return (
      <div key={alert.id} className={`alert alert-${alert.alertType}`} role="alert">
        {alert.msg}
      </div>
    );
  });

};

const mapStateToProps = (store) => ({
  alerts: store.alert,
});

export default connect(mapStateToProps, null)(Alert);
