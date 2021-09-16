import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import devices from '../../apis/devices'
import NavMenu from '../../components/NavMenu';
import { Container } from 'semantic-ui-react';
import CardList from '../../components/CardList';
import useDataPhones from '../../hooks/usePhonesDate';

const DeviceListPage = () => {
  const [phones, setPhones] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { currentUser, logout } = useAuth();
  const { vendorOptions, osOptions } = useDataPhones(phones);

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const { data } = await devices.get('phones', {
          headers: {
            'Auth-Token': currentUser.token
          }
        })
        setPhones(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadDevices();
  }, [])

  const updatePhones = (updatePhoneData) => {
    const phoneIndex = phones.findIndex((phone) => {
      if (phone.id === updatePhoneData.id) {
        return true;
      }
    })
    setPhones((prev) => [
      ...prev.slice(0, phoneIndex),
      updatePhoneData,
      ...prev.slice(phoneIndex + 1)
    ])
  }

  return (
    <>
      <NavMenu user={currentUser} onLogout={logout} />
      <Container>
        {isLoading ? "Loading" : (
          <CardList
            phones={phones}
            currentUser={currentUser}
            updatePhones={updatePhones}
            vendorOptions={vendorOptions}
            osOptions={osOptions}
          />
        )}
      </Container>
    </>
  )
}

export default DeviceListPage;