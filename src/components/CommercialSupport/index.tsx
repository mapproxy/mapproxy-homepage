import React from 'react';
import styles from './styles.module.scss';

const CommercialSuppport = ({ companyList }) => (
  <div>
    {companyList.map((item) => (
      <div
        key={item.id}
        className={styles.flexrow}
        >
          <div>
            <a href={item.website} >
            <img
              src={item.logoUrl}
            />
            </a>
          </div>
          <div>
            {item.description}
          </div>
      </div>
    ))}
  </div>
);

export default CommercialSuppport;
