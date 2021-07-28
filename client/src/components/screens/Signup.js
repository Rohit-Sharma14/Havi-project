import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import M from 'materialize-css'
const Signup = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [date, setDate] = useState("")
    const [bio, setBio] = useState("")



    //-----------------------------------upload fields------------------------------------//

    const uploadfields = () => {
        // if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        //     M.toast({ html: 'invalid email', classes: "#c62828 red darken-3" })
        //     return
        // }
        fetch("/signup", {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password,
                date,
                bio
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    M.toast({ html: data.error, classes: "#c62828 red darken-3" })
                }
                else {
                    M.toast({ html: data.message, classes: "#c62828 green darken-3" })
                    history.push('/signin')
                }
            }).catch(err => [
                console.log(err)
            ])
    }

    //------------------------------------posting user data to db-------------------------------//


    //------------------------------------------------frontend-------------------------------------------//
    return (
        <div className="mycard">
            <div className="card auth-card input-field" >
                <h2>Instagram</h2>
                <input
                    type="text"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="date"
                    placeholder="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                />


                <button className="btn waves-effect waves-light #4527a0 deep-purple darken-3" onClick={() => uploadfields()}>Signup</button>
                <h5>
                    <Link to="/signin">Already have account?</Link>
                </h5>
            </div>
        </div>
    )
}

export default Signup