import { Formik, Form, Field, ErrorMessage } from "formik";
import { React, useEffect } from 'react';
import { getAllCities, getstates } from "../Services/api";
import * as yup from 'yup';
import useState from 'react-usestateref'
import { useNavigate } from "react-router-dom";
export default function Home() {

  const validate = yup.object({
    sou: yup.string()
      .required('Required'),
    des: yup.string()
      .required("Required")
      .notOneOf([yup.ref('sou'), null], 'Source and Destination cannot be same'),


  })
  const navigate = useNavigate();
  var [counter, setCounter, counterRef] = useState([])
  var [city, setcity, cityRef] = useState([])
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/')
    }
    async function data() {
      let dat = await getAllCities()
      console.log(dat)
      setCounter(dat)
      console.log("dat", counterRef.current)
    }
    data()


  }, []);
  return (
    <>
      <br />
      <Formik
        initialValues={{

          sou: '',
          des: ''
        }}
        validationSchema={validate}
        onSubmit={async (values, actions) => {

          console.log("submitted values", { "sd": values.sou + "_" + values.des })
          try {
            let dat = await getstates({ "sd": values.sou + "_" + values.des })

            let json = await dat.json();
            console.log(json)
            setcity(json)
            console.log("city", cityRef.current)
            alert("submitted")


          } catch (error) {
            console.log(error)

          }


          actions.resetForm()



        }}>
        {formik => (
          <Form>
            <div className="container ">
              <div className="container ">
                <div className="row   offset-md-3
                          ">
                  <div className="col">
                    <label class="text-white site-title ">Source Airport</label>
                    <Field as="select" className={` text-dark  border border-info bg-transparent form-control bg-none mx-3 mt-3 site-title px-4 py-2 shadow-none mb-2 ${formik.touched.sou && formik.errors.sou && 'is-invalid'}`} name="sou">

                      <option defaultValue="" className="text-dark bg-transparent">Select Source</option>
                      {
                        counter && counter.map(
                          (i) => (
                            <option value={i} className="border-dark bg-transparent">{i}</option>
                          )
                        )
                      }

                    </Field>

                    <ErrorMessage name='sou' className='error text-danger' component='div' />


                  </div>
                  <div className="col">
                    <label class="text-white site-title ">Destination Airport</label>

                    <Field as="select" className={` border border-info form-control bg-transparent mx-3 mt-3 site-title px-4 py-2 shadow-none mb-2 ${formik.touched.des && formik.errors.des && 'is-invalid'}`} name="des">
                      <option defaultValue=""> Select Destination</option>
                      {/* <option value="Mumbai">Mumbai</option>
             <option value="Goa">Goa</option>
             <option value="Gujarat">Gujarat</option>
             <option value="Delhi">Delhi</option> */}
                      {

                        counter && counter.map(
                          (i) => (
                            <option value={i}>{i}</option>
                          )
                        )
                      }
                    </Field>
                    <ErrorMessage name='des' className='error text-danger' component='div' />
                  </div>


                </div>
              </div>
            </div>
            <br />
            <br />
            <input type="submit" className="btn btn-primary px-4 py-2  site-title offset-md-5 " value="Submit" />


          </Form>
        )}
      </Formik>
      <br />
      <br />

      <div className="container mt-3 offset-md-3">
        <table className="text-dark  offset-md-1  table site-title  text-center site-title border-bottom-none ">
          <thead>
            <tr className="text-start">

              <th scope="col">Source</th>
              <th scope="col">Destination</th>
              <th scope="col">Flight</th>
              {/* <th scope="col">Date</th> */}
              <th scope="col">Departure</th>
              <th scope="col">Arrival</th>
              <th scope="col">Delay</th>
              <th scope="col">Reason for Delay</th>
              <th scope="col">Contact</th>
            </tr>
          </thead>
          <tbody>
            {
              city && city.map(
                (i, index) => (
                  <td key={index} >
                    <tr scope="col" className="text-center text-white border-bottom-none">{i[0]}</tr>
                    <tr scope="col" className="text-center text-white  border-bottom-none">{i[1]}</tr>
                    <tr scope="col" className="text-center text-white border-bottom-none">{i[6]}</tr>
                    {/* <tr scope="col" className="text-center text-white border-bottom-none">{i[7]}</tr> */}
                    <tr scope="col" className="text-center text-white  border-bottom-none">{i[2]}</tr>
                    <tr scope="col" className="text-center text-white  border-bottom-none">{i[3]}</tr>
                    <tr scope="col" className="text-center text-white  border-bottom-none">{i[4]}</tr>
                    <tr scope="col" className="text-center border-bottom-none">{i[5]}</tr>




                  </td>
                )
              )
            }

          </tbody>
        </table></div></>
  )
}
