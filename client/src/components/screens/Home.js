import React from 'react'
import './Home.css'

class Home extends React.Component {
    state = {
        data: [],
        newItem: ''
    };
    // componentWillMount = () => {
    //     fetch('/userlist', {
    //         method: "post",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": "Bearer " + localStorage.getItem("jwt")
    //         }
    //     }).then(res => {
    //         res.json()
    //     }).then(data => {
    //         console.log(data);
    //         this.setState({ data: data });
    //         console.log(this.state.data);
    //     })
    // }
    inputHandler = event => this.setState({ newItem: event.target.value });

    addItem = () => {
        if (!this.state.newItem) return;
        fetch('/add', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                title: this.state.newItem
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data);
                const updateData = [...data.list];
                updateData.reverse()
                this.setState({ data: updateData, newItem: '' });
                console.log(this.state.data);
            })


    };

    removeItem = id => {
        fetch(`/delete/${id}`, {
            method: "post",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("jwt")
            }
        }).then(res => res.json()).then(data => {
            this.setState({ data: data.list });
        })


    };
    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.addItem()
        }
    }
    searchItem = () => {
        if (!this.state.newItem) return;
        let currentData = [...this.state.data];
        let searchingData = currentData.filter(item => item.toLowerCase().indexOf(this.state.newItem.toLowerCase()) !== -1)
        this.setState({ data: searchingData })
    };

    resetHandler = () => this.setState({ data: [] });

    render() {
        return (
            <div className='container'>
                <h1>My List</h1>
                <div className='input-container'>
                    <input value={this.state.newItem} onChange={this.inputHandler} onKeyDown={this._handleKeyDown} placeholder='add a new item...' />
                    <button onClick={this.addItem} className='add-button'>Add</button>
                    <button onClick={this.searchItem} className='search-button'>Search</button>

                </div>
                <div id='list-container'>
                    {this.state.data.map(item => (
                        <div className='list-item-container'>
                            <p className='list-title'>{item}</p>
                            <button onClick={() => this.removeItem(item)} className='remove-button'>delete</button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home














