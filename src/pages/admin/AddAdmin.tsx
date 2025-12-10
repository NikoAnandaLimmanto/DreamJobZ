import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink } from "react-router"
import ApiClient from "../../utils/ApiClient"

interface FormAdmin {
    username : string,
    email : string,
    password : string,
}

function AddAdmin() {
    const [form, setForm] = useState<FormAdmin> ({
        username: "",
        email: "",
        password: "",
    })

    const handleInputChange = (event : ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target

        setForm({
            ...form,
            [name] : value
        })
    }

    const handleSubmit = async (event : FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await ApiClient.post('/admin', form)
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }
    
    return <div className="container mx-auto">
        <div className ="d-flex justify-content-between mb-3">
            <h2> Tambah Admin </h2>
            <NavLink to="/admin" className="btn btn-primary"> Halaman Admin </NavLink>
        </div>
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        value={form.username}
                        onChange={handleInputChange}
                        name="username" 
                        type="text" 
                        placeholder="Username"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        value={form.email}
                        onChange={handleInputChange}
                        name="email" 
                        type="text" 
                        placeholder="Email"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        value={form.password}
                        onChange={handleInputChange}
                        name="password" 
                        type="text" 
                        placeholder="Password"
                    />
                </Form.Group>
                <br></br>
                <Button type="submit" variant="primary">
                    Simpan
                </Button>                
            </Form>
        </div>

    </div>
}

export default AddAdmin