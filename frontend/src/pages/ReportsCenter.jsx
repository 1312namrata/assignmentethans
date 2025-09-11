import React from 'react'

const ReportsCenter = () => {
  return (
        <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src="http://localhost:4200/reporting"  
        title="Report Generator"
        width="100%"
        height="100%"
        style={{ border: 'none' }}
      />
    </div>




  )
}

export default ReportsCenter