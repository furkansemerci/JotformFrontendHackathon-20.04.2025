import React, {useEffect, useState} from 'react';
import {getForm} from '../services/FormProvider';
import JF from 'jotform';


const Home = () => {

    const [forms, setForms] = useState();

    useEffect(() =>{
        const loadForms = async() => {
            try{
                const formsData = await getForm();
                setForms(formsData);
            }catch(err){
                console.error('Failed to fetch');
            }
        }

        

        loadForms();

    },[])

    
    return ( 

        <div className="dashboard">

            <h1>Your Cart</h1>

            <div>

               <p>{forms}</p>


            </div>
            
        </div>
     );
}
 
export default Home;