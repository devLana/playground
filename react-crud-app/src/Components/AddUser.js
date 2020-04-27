import React, { useState } from "react";

const AddUser = ({ add }) => {
  const [ user, setUser ] = useState({name: "", occupation: ""});

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({...user, [name]: value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (!user.name || !user.occupation) return;

    add(user);
    setUser({name: "", occupation: ""});
  }

  return (
    <div className="add__user">
      <h3>Add User</h3>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="add__name">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            id="add__name"
            className="form-control form-control-lg"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="add__occupation">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={user.occupation}
            id="add__occupation"
            className="form-control form-control-lg"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <input type="submit" className="btn btn-secondary" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default AddUser;
