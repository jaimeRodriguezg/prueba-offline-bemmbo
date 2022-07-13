import { useEffect, useState } from 'react'
import axios from 'axios';
import { notaDeCredito } from '../interfaces/interfaces';
import { Form, Formik, Field } from 'formik';
import { FacturaComponent } from './FacturaComponent';
import { LoadingComponent } from './LoadingComponent';
        
const initialValues: { [key: string]: any } = {};

export const NotaDeCreditoComponent = () => {

    const [loading, setLoading] = useState(true)
    const [flag, setFlag] = useState(false)
    const [notasCredito, setNotasCredito] = useState<notaDeCredito[]>([])
    const [facturas, setFacutas] = useState<notaDeCredito[]>([])
    const [dataToSend, setDataToSend] = useState<notaDeCredito[]>([])

    useEffect(() => {
    
        getNotasDeCredito();
      return () => {
        setNotasCredito([])
        setFacutas([])
        setDataToSend([])
      }
    }, [])

    const getNotasDeCredito = async () => {
        let valorDelDolar = 1012 
        try{
            const { data } = await axios.get('/invoices/pending');
            console.log(data)
            data.map((dato: notaDeCredito) =>{
                let valorDolar: number = 0;
                let valorCLP: number = 0;

                if (dato.currency === "CLP") {
                    valorDolar = dato.amount / valorDelDolar
                    valorCLP = dato.amount

                }else{
                    valorCLP = dato.amount * valorDelDolar
                    valorDolar = dato.amount
                }


                let new_object : notaDeCredito = {
                    id : dato. id,
                    amount : dato. amount,
                    organization_id : dato. organization_id,
                    currency : dato. currency,
                    type : dato. type,
                    reference : dato. reference,
                    dolarAmount: valorDolar,
                    clpAmount: valorCLP
                }

                if(new_object.type === "received"){
                    setNotasCredito(notasCredito => [...notasCredito, new_object])
                }else if(new_object.type === "credit_note"){
                    setFacutas(facturas => [...facturas, new_object])
                }
            })

            setLoading(false)

        }catch (error){
            console.log("error", error);
        }
    }

    const handleClick = (id: string) => {
        setDataToSend([])
        console.log(id)
        facturas.map((factura) => {
            if(factura.reference === id){
                setDataToSend(dataToSend => [...dataToSend, factura])
                
                
            }
        
        })
        setFlag(true)
        
    }
    

  return (

      <div className='w-7/12'>
        {
            loading? (
                <LoadingComponent/>
            ): (
                <div>
                    <h1 className='text-center font-bold p-2'>Selecciona una Factura</h1>
                    
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
                                                notasCredito.map((nota: notaDeCredito, index) => {
                                                    return(
                                                        <div key ={nota.id} className='flex flex-col gap-1 '>
                                                             <div className= "border-solid hover:bg-gray-400 cursor-pointer border-2  rounded-lg flex flex-row p-2 justify-around">
                                                                <label>
                                                                <Field type="radio" name="picked" value={nota.id} onChange={() => handleClick(nota.id)} />
                                                                {nota.id} ({nota.organization_id})
                                                                </label>
                                                                <p>{nota.clpAmount} CLP ({nota.dolarAmount} USD)</p>
                                                                <p>{nota.type}</p>
                                                            </div>
                                                            <div>{formik.values.picked}</div>
                                                        </div>
     
                                                    )
                                                })
                                            }
            
                                        </Form>
                                    )
                                }
            
                    </Formik>
                    {
                        flag && 
                        <FacturaComponent facturaData = {dataToSend}/>
                    }
                </div>
            )
        }

    </div>
  )
}
