import React, { useState } from 'react';
import devices from '../../apis/devices'
import { useAuth } from '../../context/AuthContext';
import * as yup from 'yup';
import NavMenu from '../../components/NavMenu';
import { Card, Message, Form, Button, Input, Header } from 'semantic-ui-react';
import { Formik } from 'formik';


const CreateDevicePage = () => {
    const [response, setResponse] = useState()
    const { currentUser, logout } = useAuth();
    const initialValues = {code: '', model: '', os: '', osVersion: '', vendor: '', image: ''}
    
    const validationSchema = yup.object().shape({
        code: yup.string().required('Povinný údaj'),
        model: yup.string().required('Povinný údaj'),
        os: yup.string().required('Povinný údaj'),
        osVersion: yup.string(), 
        vendor: yup.string().required('Povinný údaj'), 
        image: yup.string()
    })

    const loginSubmit = async (values, { resetForm }) => {
        try {
            const { data } = await devices.post('phones', {values}, {
                headers: {
                    'Auth-Token': currentUser.token
                } 
            })
            setResponse(data);
        }
        catch(error) {
            setResponse(error);
            console.error(error);
        }
        resetForm();
    }  

    return (
        <>
            <NavMenu user={currentUser} onLogout={logout} />
            <Card centered style={{width: 400}}>
                <Card.Content>
                    <Header as="h3">Nové zařízení</Header>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={loginSubmit}
                    >
                        {({
                            values,
                            errors, 
                            handleChange,
                            handleSubmit, 
                            isSubmitting
                        }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Field
                                    id="code"
                                    required
                                    name="code"
                                    control={Input}
                                    placeholder="Unikátní kód zařízení"
                                    value={values.code}
                                    onChange={handleChange}
                                    error={errors?.code}
                                />
                                <Form.Field
                                    id="model"
                                    required
                                    name="model"
                                    control={Input}
                                    placeholder="Název Modelu"
                                    value={values.model}
                                    onChange={handleChange}
                                    error={errors?.model}
                                />
                                <Form.Field
                                    id="os"
                                    required
                                    name="os"
                                    control={Input}
                                    placeholder="Operační Systém"
                                    value={values.os}
                                    onChange={handleChange}
                                    error={errors?.os}
                                />
                                <Form.Field
                                    id="osVersion"
                                    name="osVersion"
                                    control={Input}
                                    placeholder="Verze operačního systému"
                                    value={values.osVersion}
                                    onChange={handleChange}
                                    error={errors?.osVersion}
                                />
                                <Form.Field
                                    id="vendor"
                                    required
                                    name="vendor"
                                    control={Input}
                                    placeholder="Výrobce"
                                    value={values.vendor}
                                    onChange={handleChange}
                                    error={errors?.vendor}
                                />
                                <Form.Field
                                    id="image"
                                    name="image"
                                    control={Input}
                                    placeholder="Obrázek"
                                    value={values.image}
                                    onChange={handleChange}
                                    error={errors?.image}
                                />
                                
                                <Button 
                                    type='submit'
                                    fluid
                                    color="orange"
                                    disable={isSubmitting}
                                >
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>

                    {response ? ( 
                        <Message
                            positive
                            header='Zařízení úspěšne přidáno'
                        />
                    ) : ''}
                </Card.Content>
            </Card>
        </>
    )
}

export default CreateDevicePage;
