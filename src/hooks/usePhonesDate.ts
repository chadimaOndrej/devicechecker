import { useState } from 'react';

const useDataPhones = (phones) => {
  const [ vendorOptions, setVendorOptions ] = useState([])
  const [ osOptions, setOsOptions ] = useState([]);

  const helperFunction = (arrayOfObject, testedValue) => {
    return arrayOfObject.findIndex(function (item, index) {
      if (item.value === testedValue)
        return true;
    });
  }

  for (const element of phones) {
    if (element.vendor && element.os) {
      if (helperFunction(vendorOptions, element.vendor) === -1) {
        setVendorOptions([
          ...vendorOptions,
          {
            key: element.vendor,
            text: element.vendor,
            value: element.vendor
          }
        ])
      }

      if (helperFunction(osOptions, element.os) === -1) {
        setOsOptions([
          ...osOptions,
          {
            key: element.os,
            text: element.os,
            value: element.os
          }
        ])
      }
    }
  }

  return {vendorOptions, osOptions}
}

export default useDataPhones;