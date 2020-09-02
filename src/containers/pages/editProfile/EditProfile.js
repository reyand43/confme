import React from 'react'
import Name from './editProfilePages/Name'
import Company from './editProfilePages/Company'
import Input from '../../../components/UI/Input/Input'

class EditProfile extends React.Component{

    render(){
        return(
            
            <div>
                <Input placeholder="Name"></Input>
                <Input></Input>
                <Input></Input>
            

<button>Next</button>
            </div>
        )
    }
}

export default EditProfile