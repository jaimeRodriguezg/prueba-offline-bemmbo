import { notaDeCredito } from '../interfaces/interfaces';
import { Formik, Form, Field } from 'formik';
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";

interface Props {
    facturaData: notaDeCredito[]
}

export const FacturaComponent = ({facturaData} : Props) => {

 
    const handleClick = () => {
        
        Swal.fire({  
            title: 'Nota de crédito asignada correctamente',  
            icon:'success',
            text: `El id de la facutra asociada es: ${facturaData[0].reference}`,
            confirmButtonText: `Seguir asignando`,  
        }).then((result) => {
            if(result.isConfirmed){
                //borrar del listado
            }
        })
    }
    
  return (
    <div className='mt-10'>
        <h1 className='text-center font-bold p-2'>Selecciona una Nota de Crédito</h1>
        {facturaData.length == 0 && (
            <h2>No hay notás de crédito asociadas </h2>
        )}
        <Formik initialValues={{
            picked: ''
        }}
                onSubmit={ (values) => {
                    console.log(values)
                }}>

                    {
                        (formik) => (
                            <Form noValidate>
                                {
                                    facturaData.map((nota: notaDeCredito, index) => {
                                        return(
                                            <div key ={index} className='flex flex-col gap-1 '>
                                                 <div className= "border-solid hover:bg-gray-400 cursor-pointer border-2  rounded-lg flex flex-row p-2 justify-around">
                                                    <label>
                                                    <Field type="radio" name="picked" value={nota.id}  />
                                                    {nota.id} ({nota.organization_id})
                                                    </label>
                                                    <p>{nota.amount} {nota.currency}</p>
                                                    <p>{nota.type}</p>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {facturaData.length != 0 && (
                                                <div className='flex flex-row justify-center mt-10'>
                                                <button type="submit" className='bg-blue-700 w-52 text-white rounded-lg' onClick={() => handleClick()}>Asignar</button>
                                            </div>
                                )}
                    
                            </Form>
                        )
                    }

        </Formik>

    </div>
  )
}
