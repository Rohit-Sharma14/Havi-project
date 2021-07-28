import React, { useState, useEffect, useContext } from 'react'
import { userContext } from '../../App'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import './Admin.css'
const Admin = () => {
    const [data, setData] = useState([])
    const [auth, setAuth] = useState(false)
    useEffect(() => {
        fetch('alluser', {
            method: "post",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                    setAuth(false)
                } else {
                    setAuth(true)
                }
                console.log(data);
                setData(data)
            })
    }, [])

    const makeadmin = (id, bool) => {
        console.log('yee');
        if (bool) {
            fetch(`/removeadmin/${id}`, {
                method: 'post',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }).then(data => {
                if (data.error) {
                    M.toast({ html: "Error", classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: "Succes", classes: "#c62828 green darken-3" })
                }

            }
            )
        }
        else {
            fetch(`/makeadmin/${id}`, {
                method: 'post',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                }
            }).then(data => {
                if (data.error) {
                    M.toast({ html: "Error", classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: "Succes", classes: "#c62828 green darken-3" })
                }

            }
            )
        }
    }

    return (
        <div>
            {auth ?
                <div className='containerr'>

                    {data.map(item => (
                        <div className='card' style={{ margin: "15px" }}>
                            <div className='card-content'>
                                <span className="card-title">{item.name}</span>

                                <p>
                                    Total list {item.list.length}
                                </p>
                                <br></br>
                                <div onClick={() => makeadmin(item._id, item.admin)}>
                                    <a class="waves-effect waves-light btn-large" >{item.admin ? 'Remove' : 'Make'} Admin</a>
                                </div>
                            </div>
                        </div>
                    ))}


                </div> : <h1 style={{ alignItems: 'center' }}>Not authorized</h1>}
        </div>
    )
}

export default Admin