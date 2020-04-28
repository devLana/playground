import React, { useState, useEffect } from "react";

const EditUser = props => {
  const [ user, setUser ] = useState(props.user);
  useEffect(() => setUser(props.user), [props.user]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({...user, [name]: value})
  }

  const handleBlur = e => {
    const { name, value } = e.target;
    setUser({...user, [name]: value.trim()});
  }

  const handleSubmit = e => {
    e.preventDefault();
    console.log(user)
    if (!user.name || !user.occupation) return;

    props.edit(user);
    setUser({id: null, name: "", occupation: ""})
  }

  const closeEdit = () => {
    props.closeEdit();
  }

  return (
    <div className="edit__user">
      <h3>Edit User</h3>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="edit__name">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            id="edit__name"
            className="form-control form-control-lg"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="form-group">
          <label htmlFor="edit__occupation">Occupation</label>
          <input
            type="text"
            name="occupation"
            value={user.occupation}
            id="edit__occupation"
            className="form-control form-control-lg"
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
        <div className="ctrl__btns">
          <span className="btn btn-dark" onClick={closeEdit}>Cancel</span>
          <input type="submit" className="btn btn-secondary" value="Submit" />
        </div>
      </form>
    </div>
  )
}

export default EditUser;
