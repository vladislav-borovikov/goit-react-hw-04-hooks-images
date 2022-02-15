import {useState} from 'react';
import {SearchForm, SearchFormInput, SearchFormButton, SearchbarSection } from './Searchbar.styled';
import { BiSearchAlt2 } from "react-icons/bi"


 
const  Searchbar = ({onSubmit}) => {
    const [filter, setFilter] = useState("")

    
    const changFilter = (event) => {
        event.preventDefault()
        const data = filter
        onSubmit(data)
    }

    const changInput = (e) => {
        e.preventDefault();
        setFilter(e.currentTarget.value)
    }
    

    
    
        return(
            <SearchbarSection>
                <SearchForm className="form" type="text" onSubmit={changFilter}>
                    <SearchFormButton> <BiSearchAlt2 fill={ '#3f51b5' } size={36}/> </SearchFormButton>
                    <SearchFormInput type="text" name="filter" onChange={changInput} />
                </SearchForm>
            </SearchbarSection>
            
            
        )


    
}

export default Searchbar ;
