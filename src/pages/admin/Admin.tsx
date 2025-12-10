import { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router"
import ApiClient from "../../utils/ApiClient"
import { Button, Table } from "react-bootstrap"

interface Admin {
    username : string,
    email : string,
    password : string,
}

function Admin() {
    const [lowongan, setAdmin] = useState<Admin[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    const fetchAdmin = useCallback(async () => {
        const response = await ApiClient.get("/admin")

        if(response.status == 200) {
            setAdmin(response.data.data)
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchAdmin()
    }, [fetchAdmin])

    const handleDelete = async () => {
        const response = await ApiClient.delete(`/admin/$`)

        if (response.status == 200) {
            fetchAdmin()
        }
    }

    return <div className="container mx-auto">
        <div className ="d-flex justify-content-between mb-3">
            <h2> Halaman Admin </h2>
            <NavLink to="/admin/add-admin" className="btn btn-primary"> Tambah Admin </NavLink>
        </div>
        <div>
            <Table className="table table-striped">
                <thead>
                    <th> Username </th>
                    <th> Email </th>
                    <th> Password </th>
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
                                <td>{lowongan.username}</td>
                                <td>{lowongan.email}</td>
                                <td>{lowongan.password}</td>
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

export default Admin