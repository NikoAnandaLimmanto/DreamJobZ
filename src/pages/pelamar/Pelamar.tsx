import { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router"
import ApiClient from "../../utils/ApiClient"
import { Button, Table } from "react-bootstrap"

interface Pelamar {
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

function Pelamar() {
    const [lowongan, setPelamar] = useState<Pelamar[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchPelamar = useCallback(async () => {
        const response = await ApiClient.get("/pelamar")

        if(response.status == 200) {
            setPelamar(response.data.data)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchPelamar()
    }, [fetchPelamar])

    const handleDelete = async () => {
        const response = await ApiClient.delete(`/pelamar/$`)

        if (response.status == 200) {
            fetchPelamar()
        }
    }

    return <div className="container mx-auto">
        <div className ="d-flex justify-content-between mb-3">
            <h2> Halaman Pelamar </h2>
            <NavLink to="/pelamar/add-pelamar" className="btn btn-primary"> Tambah Pelamar </NavLink>
        </div>
        <div>
            <Table className="table table-striped">
                <thead>
                    <th> NamaMahasiswa </th>
                    <th> Email </th>
                    <th> NoTelp </th>
                    <th> Universitas </th>
                    <th> Jurusan </th>
                    <th> Semester </th>
                    <th> IdLowongan </th>
                    <th> TanggalLamar </th>
                    <th> StatusLamaran </th>
                </thead>
                <tbody>
                    {
                        loading && <tr>
                            <td colSpan={5}>Loading......</td>
                        </tr>
                    }
                    
                    {
                        lowongan.length > 0 && lowongan.map((lowongan, index) =>{
                            return <tr>
                                <td>{index +1}</td>
                                <td>{lowongan.namaMahasiswa}</td>
                                <td>{lowongan.email}</td>
                                <td>{lowongan.noTelp}</td>
                                <td>{lowongan.universitas}</td>
                                <td>{lowongan.jurusan}</td>
                                <td>{lowongan.semester}</td>
                                <td>{lowongan.idLowongan}</td>
                                <td>{lowongan.tanggalLamar}</td>
                                <td>{lowongan.statusLamaran}</td>
                                <td>
                                    <Button variant="btn"className="btn btn-danger" onClick={() => handleDelete()}> Delete </Button>
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </Table>
        </div>
    </div>
}

export default Pelamar