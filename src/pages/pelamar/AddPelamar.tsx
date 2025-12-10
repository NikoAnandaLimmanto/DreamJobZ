 import { useState, type ChangeEvent, type FormEvent } from "react"
import { Button, Form } from "react-bootstrap"
import { NavLink } from "react-router"
import ApiClient from "../../utils/ApiClient"

interface FormPelamar {
    namaMahasiswa : string,
    email : string,
    noTelp : string,
    universitas : string,
    jurusan : string,
    semester : string,
    idLowongan : string,
    tanggalLamar : string,
    statusLamaran : string,
}

function AddPelamar() {
    const [form, setForm] = useState<FormPelamar> ({
        namaMahasiswa: "",
        email: "",
        noTelp: "",
        universitas: "",
        jurusan: "",
        semester: "",
        idLowongan: "",
        tanggalLamar: "",
        statusLamaran: "",
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
            const response = await ApiClient.post('/pelamar', form)
            console.log(response)
        } catch (error) {
            console.log(error);
        }
    }
    
    return <div className="container mx-auto">
        <div className ="d-flex justify-content-between mb-3">
            <h2> Tambah Halaman Pelamar </h2>
            <NavLink to="/pelamar" className="btn btn-primary"> Halaman Pelamar </NavLink>
        </div>
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formNamaMahasiswa">
                    <Form.Label>Nama Mahasiswa</Form.Label>
                    <Form.Control 
                        value={form.namaMahasiswa}
                        onChange={handleInputChange}
                        name="perusahaan" 
                        type="text" 
                        placeholder="Perusahaan"
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
                <Form.Group className="mb-3" controlId="formNoTelp">
                    <Form.Label>NoTelp</Form.Label>
                    <Form.Control 
                        value={form.noTelp}
                        onChange={handleInputChange}
                        name="noTelp" 
                        type="text" 
                        placeholder="NoTelp"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formUniversitas">
                    <Form.Label>Universitas</Form.Label>
                    <Form.Control 
                        value={form.universitas}
                        onChange={handleInputChange}
                        name="universitas" 
                        type="text" 
                        placeholder="Universitas"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formJurusan">
                    <Form.Label>Jurusan</Form.Label>
                    <Form.Control 
                        value={form.jurusan}
                        onChange={handleInputChange}
                        name="jurusan" 
                        type="text" 
                        placeholder="Jurusan"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formSemester">
                    <Form.Label>Semester</Form.Label>
                    <Form.Control 
                        value={form.semester}
                        onChange={handleInputChange}
                        name="semester" 
                        type="text" 
                        placeholder="Semester"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formIdLowongan">
                    <Form.Label>IdLowongan</Form.Label>
                    <Form.Control 
                        value={form.idLowongan}
                        onChange={handleInputChange}
                        name="idLowongan" 
                        type="text" 
                        placeholder="IdLowongan"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="fromTanggalLamar">
                    <Form.Label>TanggalLamar</Form.Label>
                    <Form.Control 
                        value={form.tanggalLamar}
                        onChange={handleInputChange}
                        name="tanggalLamar" 
                        type="text" 
                        placeholder="TanggalLamar"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="fromStatusLamaran">
                    <Form.Label>StatusLamaran</Form.Label>
                    <Form.Control 
                        value={form.statusLamaran}
                        onChange={handleInputChange}
                        name="statusLamaran" 
                        type="text" 
                        placeholder="StatusLamaran"
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

export default AddPelamar