import { faEdit, faEye, faIndianRupee, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Button, Container } from 'react-bootstrap'
import { deleteProductById } from '../../services/ProductService'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'

const SingleProductView = ({ product, index, updateProductList, viewProductModal }) => {

    const formatDate = (time) => {
        return new Date(time).toLocaleDateString()
    }

    const setColorForProductAvailability = () => {
        //live+stock ==> green:table-success
        if (product.live && product.stock) {
            return 'table-success'
        }
        //notlive ==> red:table-danger
        else if (!product.live && product.stock) {
            return 'table-danger'
        }
        //notstock ==> yellow:table-warning
        else if (product.live && !product.stock) {
            return 'table-warning'
        }
        //notlive+notstock ==> dark:table-dark
        else {
            return 'table-secondary'
        }
    }

    //delete product
    const deleteProductLocal = (productId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                //delete api call
                deleteProductById(productId)
                    .then(data => {
                        // Swal.fire(
                        //   'Deleted!',
                        //   'Your file has been deleted.',
                        //   'success'
                        // )
                        toast.success("product deleted")

                        updateProductList(productId)
                    })
                    .catch(error => {
                        console.log(error);
                        toast.error("Error in deleting product!!")
                    })
            }
        })
    }

    return (
        <tr className={setColorForProductAvailability()}>
            <td className='small'>{index + 1}</td>
            <td className='small' colSpan={3}>{product.title}</td>
            <td className='small'>{product.quantity}</td>
            <td className='small'>
                <FontAwesomeIcon size="1x" icon={faIndianRupee} />
                {product.price}
            </td>
            <td className='small'><FontAwesomeIcon size="1x" icon={faIndianRupee} />{product.discountedPrice}</td>
            <td className='small'>{(product.live ? 'Live' : 'No Live')}</td>
            <td className='small'>{(product.stock ? 'Stock' : 'OutOfStock')}</td>
            <td className='small' colSpan={2}>{(product.category ? product.category.title : '-')}</td>
            <td className='small'>{formatDate(product.addedDate)}</td>
            <td className='small'>
                <Container className='text-center'>
                    <Button onClick={event=>viewProductModal(product)} className='me-2 bg-primary' variant='warning' size='sm'>
                        <FontAwesomeIcon size="1x" icon={faEye} />
                    </Button>
                    <Button className='me-2' variant='warning' size='sm'>
                        <FontAwesomeIcon size="1x" icon={faEdit} />
                    </Button>
                    <Button onClick={event => deleteProductLocal(product.productId)} variant='danger' size='sm'>
                        <FontAwesomeIcon size="1x" icon={faTrash} />
                    </Button>
                </Container>
            </td>
            {/* {
                viewProductModal() 
            } */}
        </tr>
    )
}

export default SingleProductView