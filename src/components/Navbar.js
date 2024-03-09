import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { signOut } from '../features/auth/authSlice';
import { toast } from 'react-toastify';

const Navbar = ({ onSearch }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleSignout = () =>{
    sessionStorage.removeItem("id")
    dispatch(signOut())
    toast.success("Signout Successfull")
  }

  const handleSubmit = (e) => {
    e.preventDefault();
   // const searchValue = e.target.elements.search.value; 
    onSearch(e.target.value); 
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary bg-gradient">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Home
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {isAuthenticated ? (
              <>
                       
<form className="d-flex" >
  <input
    className="form-control me-2"
    type="search"
    placeholder="Search"
    aria-label="Search"
    name="search"
    onChange={handleSubmit}
  />
</form>
                <li className="nav-item">
                  <Link className="nav-link" to="/" onClick={handleSignout}>
                    SignOut
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Signup
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">
                    Signin
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
