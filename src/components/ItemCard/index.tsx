import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react';
import { 
    CardImageBlock,
    CardImageBorrowed
} from './ItemCard-style';


const ItemCard = ({ cardData, currentUserId, onBorrow, onReturn }) => {
    const renderButtons = () => {
        if (cardData.borrowed) {
            if (cardData.borrowed.user.id === currentUserId) {
                return (
                    <Button fluid color="red" onClick={() => onReturn(cardData.id)}>Vrátit</Button>
                )
            } else {
                return (
                    <Button fluid disabled>Půjčit</Button>
                )
            }
        } else {
            return (
                <Button fluid color="orange" onClick={() => onBorrow(cardData.id)}>
                    Půjčit
                </Button>
            )
        }

    } 

    const renderTime = (time) => {
        const date = new Date(time)
        return date.toLocaleDateString()
    }

    return (
        <Card key={cardData.id}>
            <CardImageBlock>
                <Image 
                    src={cardData.image || 'https://via.placeholder.com/300x300?text=No+image'}
                    size='medium'
                    centred={true}
                    style={{height: 300, width: 'auto', margin: '0 auto'}}
                /> 
                {cardData.borrowed ? (
                    <CardImageBorrowed>
                        Vypůjčeno: {cardData.borrowed.user.name}, {renderTime(cardData.borrowed.date)}
                    </CardImageBorrowed>
                ) : ''}
            </CardImageBlock>
            <Card.Content>
                <Card.Header>{cardData.model}</Card.Header>
                <Card.Meta>{cardData.vendor}</Card.Meta>
                <Card.Description>{cardData.os} {cardData.osVersion}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                {renderButtons()}
            </Card.Content> 
        </Card>
    )
}

export default ItemCard;
