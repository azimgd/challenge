import React from 'react';
import styles from 'containers/HomeContainer/index.scss';

var MagentoAPI = require('magento-xmlrpc');
var magento = new MagentoAPI({
  host: 'www-test.unumotors.com',
  port: 443,
  path: '/en/api/xmlrpc/',
  login: 'unu-challenge',
  pass: 'unu-challenge'
});


setTimeout(() => {

  magento.login(function(err, sessId) {
    if (err) {
      console.log(err);
      return;
    }
  });


}, 3000);

const HomeContainer = () => (
  <div className={styles.block}>
    <div className={styles.component}>
      Home
    </div>
  </div>
);

export default HomeContainer;
