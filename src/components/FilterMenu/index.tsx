import React, { useEffect, useState } from 'react'
import { Input, Checkbox, Dropdown } from 'semantic-ui-react'
import { FilterMenuLayout, FilterMenuItem } from './FilterMenu-style';
import { 
  MultipleSelectTypes, 
  PhoneTypes
} from './types'

const FilterMenu = ({ phones, vendorOptions, osOptions, setFilteredPhones }) => {
  console.log(osOptions);
  const [ available, setAvailable ] = useState(false);
  const [ selectedVendor, setSelectedVendor ] = useState([]);
  const [ selectedOs, setSelectedOs ] = useState([]);
  const [ term, setTerm ] = useState('');
  const [ searchError, setSearchError ] = useState('');

  const validateText = values => {
    if (/[^A-Za-z0-9_-]+/i.test(values)){
        setSearchError('No allowed characters');
    } else {
        setTerm(values.toLowerCase());
        if (searchError.length) setSearchError('');
    }
  }

  useEffect(() => {
    let availablePhones: Array<PhoneTypes> = []
    if (selectedVendor.length === 0 && selectedOs.length === 0 && !available && !term) {
      setFilteredPhones(phones);
    } else {
      if (term) {
        availablePhones = phones.filter((item: PhoneTypes) => {
          if (item.model && item.model.toLowerCase().search(term) !== -1)
            return (item)
        })
      
        if (available) {
          availablePhones = availablePhones.filter((phone: PhoneTypes) => {
            if (!phone.hasOwnProperty('borrowed'))
              return phone;
          })
        }

      } else if (available) {
        availablePhones = phones.filter((phone: PhoneTypes) => {
          if (!phone.hasOwnProperty('borrowed'))
            return phone;
        })
      } else {
        availablePhones = [...phones]
      }

      if (selectedVendor.length === 0 && selectedOs.length === 0) {
        setFilteredPhones(availablePhones);

      } else {
        const filteredPhones: Array<PhoneTypes> = availablePhones.filter((phone: PhoneTypes) => {
          console.log(phone);
          if (selectedVendor.length && selectedVendor.indexOf(phone.vendor) !== -1)
            return phone;

          if (selectedOs.length && selectedOs.indexOf(phone.os) !== -1)
            return phone;
        })
        setFilteredPhones(filteredPhones);
      }
    }
  }, [available, selectedVendor, selectedOs, term])

  return (
    <FilterMenuLayout>
      <FilterMenuItem>
        <Dropdown
          placeholder='Operační systém'
          fluid
          multiple
          search
          selection
          options={osOptions}
          onChange={(e, { value }: MultipleSelectTypes) => setSelectedOs(value)}
        />
      </FilterMenuItem>
      <FilterMenuItem>
        <Dropdown
          placeholder='Výrobce'
          fluid
          multiple
          search
          selection
          options={vendorOptions}
          onChange={(e, { value }: MultipleSelectTypes) => setSelectedVendor(value)}
        />
      </FilterMenuItem>
      <FilterMenuItem>
        <Checkbox
          toggle
          label='Jen dostupné'
          onChange={() => setAvailable(!available)}
          checked={available}
          style={{padding: '8px 0'}}
        />
      </FilterMenuItem>
      <Input
        icon='search' 
        placeholder="Search..."
        onChange={(e, { value }: any) => validateText(value)}

      />
    </FilterMenuLayout>
  )
}

export default FilterMenu;
