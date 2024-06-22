import React from 'react';
import "./index.css"
import { Link } from 'react-router-dom';

const Blocked = () => {
  return (
    <div className='blocked text-center'>
        <h2 className='text-danger fw-bold'>Account Banned</h2>
        <p className="fw-bold"> <spam className="text-warning">NOTE </spam>that this account has been banned by our theft bot crawler. Send us a message if you think this was a mistake.</p>
        <Link to="https://t.me/eefctheftgroup" className='btn btn-primary w-75 text-decoration-none'>Contact</Link>
    </div>
  )
}

export default Blocked