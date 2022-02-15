import {useState, useEffect} from 'react';
import Searchbar from './Searshbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryList from './ImageGalleryItem/ImageGalleryList';
import {LoadMoreButton} from './Gallery.styled';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader.jsx';

import { Api } from '../services/Api'



const ImageFinder = () => {
    const [images, setImages] = useState([])
    const [filter, setFilter] = useState('')
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const [showModal, setShowModal] = useState(false)
    const [imgUrl, setImgUrl] = useState('')
    const [load, setLoad] = useState(false)
    const [totalHits, setTotalHits] = useState(0)

    

   
    const changFilter = (data) => {
        setFilter(data)

    }

    const toggleModal = () => {
        setShowModal(!showModal)
    }


    const getImgUrl = (url) => {
        setImgUrl( url)
        toggleModal()

    }

    
useEffect(() => {
    setImages([])
    setPage(1)

}, [filter])

    

    useEffect(() => {
      if (filter === ""){
          return 
      }
        const fetchImages = async () => {
        
            try{
               setLoad(true)
           const {hits, total, totalHits} = await Api(filter, page)

            if (hits.length === 0) {
               return Promise.reject(
                   new Error(alert(`Invalid request - ${filter}. Try again`)))
                 }
                 setImages(prevState => page > 1 ?
                    [...prevState, ...hits] : hits )
                 setTotalHits(totalHits)
                 setTotal(total)       

       }catch (error) {
           alert(error)
       } finally {
        setLoad(false)
       }
   }
      
   fetchImages()
    }, [filter, page])
    

        
    

    // componentDidUpdate(prevPropes, prevState) {
    //     if (prevState.filter !== this.state.filter) {
    //         this.setState({ page: 1, images: [] })
    //     }
    //     if ((prevState.filter !== this.state.filter  && this.state.page === 1) || prevState.page !== this.state.page) {
    //         this.fetchImages()
    //         }
    //     }


        return (
            <>
           
            <Searchbar value={filter} onSubmit={changFilter}/>
            <ImageGallery>
                {images.length > 0 && <ImageGalleryList data={images} onModal={getImgUrl}/>}
            </ImageGallery>
            {/* {images.length !==  total &&  page >= 1 && <LoadMoreButton type='button' onClick={() => setPage(page + 1)}>Load more</LoadMoreButton>} */}
            {images.length !== 0  && <LoadMoreButton type='button' onClick={() => setPage(page + 1)}>Load more</LoadMoreButton>}


            {showModal && <Modal image={imgUrl} alt='' onClose={toggleModal}/>}
            {load  && <Loader/>}
            </>
            
            
            

        )
    

}

export default ImageFinder;