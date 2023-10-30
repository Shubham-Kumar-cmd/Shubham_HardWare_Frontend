import { faEdit, faEye, faStreetView, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Container } from 'react-bootstrap'

const SingleProductView = ({ product, index }) => {

    const formatDate = (time) => {
        return new Date(time).toLocaleDateString()
    }

    const setColorForProductAvailability=()=>{
        //live+stock ==> green:table-success
        if (product.live && product.stock) {
            return 'table-success'
        }
        //notlive ==> red:table-danger
        else if (!product.live && product.stock) {
            return 'table-danger'
        }
        //notstock ==> yellow:table-warning
        else if(product.live && !product.stock){
            return 'table-warning'
        }
        //notlive+notstock ==> dark:table-dark
        else{
            return 'table-secondary'
        }
    }

    return (
        <tr className={setColorForProductAvailability()}>
            <td className='small'>{index + 1}</td>
            <td className='small' colSpan={3}>{product.title}</td>
            <td className='small'>{product.quantity}</td>
            <td className='small'>{product.price}</td>
            <td className='small'>{product.discountedPrice}</td>
            <td className='small'>{(product.live ? 'Live' : 'No Live')}</td>
            <td className='small'>{(product.stock ? 'Stock' : 'OutOfStock')}</td>
            <td className='small' colSpan={2}>{(product.category ? product.category.title : '-')}</td>
            <td className='small'>{formatDate(product.addedDate)}</td>
            <td className='small'>
                <Container className='text-center'>
                    <Button className='me-2 bg-primary' variant='warning' size='sm'>
                        <FontAwesomeIcon size="1x" icon={faEye} />
                    </Button>
                    <Button className='me-2' variant='warning' size='sm'>
                        <FontAwesomeIcon size="1x" icon={faEdit} />
                    </Button>
                    <Button variant='danger' size='sm'>
                        <FontAwesomeIcon size="1x" icon={faTrash} />
                    </Button>
                </Container>
            </td>
        </tr>
    )
}

export default SingleProductView