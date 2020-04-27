import React, { useState } from 'react';
import { usersData as data} from "./users";
import ViewUsers from "./Components/ViewUsers";
import AddUser from "./Components/AddUser";
import EditUser from "./Components/EditUser";
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css';

const App = () => {
  const initialUser = {id: null, name: "", occupation: ""};

  const [ users, setUsers ] = useState(data.users);
  const [ editMode, setEditMode ] = useState(false);
  const [ userToEdit, setUserToEdit ] = useState(initialUser);

  const addUser = user => {
    const len = users.length;
    const nextId = (len === 0) ? 1 : users[len - 1].id + 1;

    user.id = nextId;
    setUsers([...users, user]);
  }

  const deleteUser = id => {
    setUsers(users.filter(user => user.id !== id))
  }

  const editUser = user => {
    setEditMode(true);
    setUserToEdit(user);
  }

  const updateUser = editedUser => {
    setUsers(users.map(user => {
      if (user.id === editedUser.id) {
        user.name = editedUser.name;
        user.occupation = editedUser.occupation;
      }
      return user;
    }))
    setEditMode(false);
    setUserToEdit(initialUser);
  }

  const closeEdit = () => {
    setEditMode(false);
    setUserToEdit(initialUser);
  }

  return (
    <div className="container">
      <h1>Personnel Manager</h1>
      <div className="row">
        <div className="form-container col-md-5">
          {
            (!editMode)
              ? <AddUser add={addUser} />
              : <EditUser user={userToEdit} edit={updateUser} users={users} closeEdit={closeEdit} />
          }
        </div>
        <div className="col-md-7">
          <ViewUsers users={users} edit={editMode} del={deleteUser} editUser={editUser} />
        </div>
      </div>
    </div>
  )
}

export default App;
