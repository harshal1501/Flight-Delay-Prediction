import "./logins.css";
import { Link,useNavigate } from "react-router-dom";

import React, { useState } from "react";
import axios from "axios";


import { Formik, Form ,ErrorMessage} from 'formik'
import * as yup from "yup";


function AddCategoryform() {
    const navigate=useNavigate()

 

    const LoginSchema = yup.object({
        username: yup.string().required("Required!"),
        email:yup.string().required("Required").email("Invalid email"),
        password: yup.string().required("Required!")
    })

    return (
        <>   <Formik
        initialValues={
          {
           username: "",
           password: "",
           email:""
          }
   
        }
        validationSchema={LoginSchema}
        onSubmit={async (values, actions) => {
          console.log(values)
         try {
           let response = await axios.post(
             " http://127.0.0.1:5000/api/users/register",
             values
           );
           console.log("con",response.data)
           if(response.data){
            alert("success full",response.data)
            navigate('/')
           
           }
           if(!response.data){
            
            alert("something went wrong")
           }
          
          
           actions.resetForm()
         } catch (error) {
           alert(error)
         
           console.log("invalid data");
          
         }
       }}
      
        
        
        
        >
          {formik=>(
            <Form onSubmit={formik.handleSubmit}>
               <div class="l-form">
           <div class="form">
             <h1 class="form__title">Sign Up</h1>
          
   
             <div class="form__div mb-2">
             
             <input
                     type="email"
                     class={`form__input mb-2 form-control ${formik.touched.username && formik.errors.username && 'is-invalid'}`}
                     placeholder=" "
                     name="username"
                     value={formik.values.username}
                     onChange={formik.handleChange}
                   />{" "}
                   <label for="" class="form__label mb-3">
                     User name<span style={{ color: "red" }}>*</span>
                   </label>
    
                       </div>{" "}
               <ErrorMessage component='div' className="error" name="username"/>

               <div class="form__div mb-2 mt-5">
             
             <input
                     type="text"
                     class={`form__input form-control ${formik.touched.email && formik.errors.email && 'is-invalid'}`}
                     placeholder=" "
                     name="email"
                     value={formik.values.email}
                     onChange={formik.handleChange}
                   />{" "}
                   <label for="" class="form__label">
                     Email<span style={{ color: "red" }}>*</span>
                   </label>
    
                       </div>{" "}
               <ErrorMessage component='div' className="error" name="email"/>
   
             <div class="form__div mt-5 mb-2">
             <input
                     type="password"
                     class={`form__input form-control ${formik.touched.password && formik.errors.password && 'is-invalid'}`}
                     placeholder=" "
                     name="password"
                     value={formik.values.password}
                     onChange={formik.handleChange}
                   />
                   <label for="" class="form__label">
                     Password <span style={{ color: "red" }}>*</span>
                   </label>
                   
                  
                       </div>{" "}
                       <ErrorMessage component='div' className="error" name="password"/>
   
   
                       <input type="Submit" className='btn mt-2 offset-md-5 rounded-3 w-20  btn-lg btn-outline-secondary btn-dark' onClick={formik.handleSubmit} value="Submit" />
   
       
              
             
             <div className="row mt-2  d-flex  align-items-center  justify-content-center">
               <Link to="/">
                 <p
                   style={{
                     display: "inline-block",
                     position: "relative",
                     left: "30px",
                     color: "#1f44ea",
                     textDecoration: "none",
                   }}
                 >
                   Sign In
                 </p>
               </Link>
             </div>
           </div>
         </div>
            </Form>
     )}
        </Formik>
        </>
    );
}

export default AddCategoryform;