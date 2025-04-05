import React from 'react';

function Alert({ alert = null }) {
  const capitalize = (word) => {
    if (!word) return "";
    if (alert.type === 'danger') {
      word = 'Error';
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    <div className="position-fixed top-0 start-50 translate-middle-x mt-3 z-3" style={{ minWidth: '300px', maxWidth: '90%', zIndex: 1055 }}>
      {alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show shadow-sm`} role="alert">
          <strong>{capitalize(alert.type)}</strong>: {alert.msg}
        </div>
      )}
    </div>
  );
}

export default Alert;
