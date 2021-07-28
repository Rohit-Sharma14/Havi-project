import React, { useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
import { userContext } from '../App'
const NavBar = () => {
    const { state, dispatch } = useContext(userContext)
    const history = useHistory()

    const admin = (id) => {
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
                M.toast({ html: "You are Now an admin", classes: "#c62828 green darken-3" })
            }

        }
        )
    }
    const renderList = () => {
        if (state) {
            return [
                <li><Link to="/admin">Admin Page</Link></li>,
                <li>
                    <button className="btn waves-effect waves-light #4527a0 deep-purple darken-3"
                        style={{ marginRight: '15px' }}
                        onClick={() => {
                            var user = JSON.parse(localStorage.getItem('user'));
                            console.log(user._id);
                            admin(user._id)
                        }}
                    >Make me Admin</button>
                </li>,
                <li>
                    <button className="btn waves-effect waves-light #4527a0 deep-purple darken-3"
                        style={{ marginRight: '15px' }}
                        onClick={() => {
                            localStorage.clear()
                            dispatch({ type: "CLEAR" })
                            history.push('/signin')
                        }}
                    >Logout</button>
                </li>
            ]

        } else {
            return [
                <li><Link to="/signin">Signin</Link></li>,
                <li><Link to="/signup">SignUp</Link></li>
            ]
        }
    }
    return (
        <nav>
            <div className="nav-wrapper white" >
                <Link to={state ? "/" : "/signin"} style={{ marginLeft: '15px' }} className="brand-logo left">My List</Link>
                <ul id="nav-mobile" className="right">
                    {renderList()}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
