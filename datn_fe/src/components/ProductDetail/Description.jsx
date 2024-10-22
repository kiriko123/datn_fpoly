import React from 'react'
import './Description.css';

const Description = ({description}) => {
  return (
    <div className='description mt-4'>
                    <h3>Mô tả sản phẩm</h3>
                    <table className='description-table'>
                        <tbody dangerouslySetInnerHTML={{ __html: dataProduct?.description }} />
                    </table>
                </div>
  )
}

export default Description