import React, { useState } from 'react'
import devices from '../../apis/devices';
import ItemCard from '../../components/ItemCard';
import { Card } from 'semantic-ui-react';
import FilterMenu from '../FilterMenu';


const CardList = ({ phones, currentUser, updatePhones, vendorOptions, osOptions }) => {
    const [ phonesToView, setPhonesToView ] = useState(phones);
    const returnPhone = async (phoneId) => {
        try {
            const { data } = await devices.post(`phones/${phoneId}/return`, {}, {
                headers: {
                    'Auth-Token': currentUser.token
                } 
            })
            updatePhones(data)
        } catch(error) {
            console.error(error);
        }
    }

    const borrowPhone = async (phoneId) => {
        try {
            const { data } = await devices.post(`phones/${phoneId}/borrow`, {}, {
                headers: {
                    'Auth-Token': currentUser.token
                } 
            })
            updatePhones(data)
        } catch(error) {
            console.error(error);
        }
    }

    const saveFilteredPhones = (values) => {
      setPhonesToView(values)
    }

    const renderPhones = phonesToView.map((element) => {
        return (
            <ItemCard 
                key={element.id} 
                cardData={element} 
                currentUserId={currentUser.id}
                onBorrow={borrowPhone}
                onReturn={returnPhone}
            />
        )
    })

    return ( 
        <>
        <FilterMenu 
          phones={phones} 
          vendorOptions={vendorOptions}
          osOptions={osOptions}
          setFilteredPhones={saveFilteredPhones}/>
        <Card.Group centered={true}>
            {renderPhones}
        </Card.Group>
        </>
    )
}

export default CardList;
