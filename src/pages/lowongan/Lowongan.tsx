import { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router"
import ApiClient from "../../utils/ApiClient"
import { Button, Table } from "react-bootstrap"

interface Lowongan {
    perusahaan : string,
    lokasi : string,
    gaji : string,
    status : string,
    tanggalPosting : string,
}

function Lowongan() {
    const [lowongan, setLowongan] = useState<Lowongan[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchLowongan = useCallback(async () => {
        const response = await ApiClient.get("/lowongan")

        if(response.status == 200) {
            setLowongan(response.data.data)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchLowongan()
    }, [fetchLowongan])

    const handleDelete = async () => {
        const response = await ApiClient.delete(`/lowongan/$`)

        if (response.status == 200) {
            fetchLowongan()
        }
    }

    return <div className="container mx-auto">
        <div className ="d-flex justify-content-between mb-3">
            <h2> Halaman Lowongan </h2>
            <NavLink to="/lowongan/add-lowongan" className="btn btn-primary"> Tambah Lowongan </NavLink>
        </div>
        <div>
            <Table className="table table-striped">
                <thead>
                    <th> Perusahaan </th>
                    <th> Lokasi </th>
                    <th> Gaji </th>
                    <th> Status </th>
                    <th> Tanggal Posting </th>
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
                                <td>{lowongan.perusahaan}</td>
                                <td>{lowongan.lokasi}</td>
                                <td>{lowongan.gaji}</td>
                                <td>{lowongan.status}</td>
                                <td>{lowongan.tanggalPosting}</td>
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

export default Lowongan