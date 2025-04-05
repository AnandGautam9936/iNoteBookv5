import React from 'react';

function Alert({ alert = null }) {
  const capitalize = (word) => {
    if (!word) return "";
    if(alert.type === 'danger'){
      word = 'Error'
    }  
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div>
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(alert.type)}</strong> : {alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
