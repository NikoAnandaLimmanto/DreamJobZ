import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink } from "react-router"
import ApiClient from "../../utils/ApiClient"

interface FormLowongan {
    perusahaan : string,
    lokasi : string,
    gaji : string,
    status : string,
    tanggalPosting : string,
}

function AddLowongan() {
    const [form, setForm] = useState<FormLowongan> ({
        perusahaan: "",
        lokasi: "",
        gaji: "",
        status: "",
        tanggalPosting: "",
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
            const response = await ApiClient.post('/lowongan', form)
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }
    
    return <div className="container mx-auto">
        <div className ="d-flex justify-content-between mb-3">
            <h2> Tambah Halaman Lowongan </h2>
            <NavLink to="/lowongan" className="btn btn-primary"> Halaman Lowongan </NavLink>
        </div>
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formPerusahaan">
                    <Form.Label>Perusahaan</Form.Label>
                    <Form.Control 
                        value={form.perusahaan}
                        onChange={handleInputChange}
                        name="perusahaan" 
                        type="text" 
                        placeholder="Perusahaan"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLokasi">
                    <Form.Label>Lokasi</Form.Label>
                    <Form.Control 
                        value={form.lokasi}
                        onChange={handleInputChange}
                        name="Lokasi" 
                        type="text" 
                        placeholder="Lokasi"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGaji">
                    <Form.Label>Gaji</Form.Label>
                    <Form.Control 
                        value={form.gaji}
                        onChange={handleInputChange}
                        name="gaji" 
                        type="text" 
                        placeholder="Gaji"
                    />
                <Form.Group className="mb-3" controlId="fromStatus">
                    <Form.Label>Status</Form.Label>
                    <Form.Control
                        value={form.status}
                        onChange={handleInputChange}
                        name="status"
                        type="enum"
                        placeholder="Status"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="fromTanggalPosting">
                    <Form.Label>TanggalPosting</Form.Label>
                    <Form.Control
                        value={form.tanggalPosting}
                        onChange={handleInputChange}
                        name="tanggalPosting"
                        type="enum"
                        placeholder="TanggalPosting"
                    />
                </Form.Group>

                </Form.Group>
                <br></br>
                <Button type="submit" variant="primary">
                    Simpan
                </Button>                
            </Form>
        </div>

    </div>
}

export default AddLowongan