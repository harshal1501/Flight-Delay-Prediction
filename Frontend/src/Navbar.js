import { Link, useMatch, useResolvedPath } from "react-router-dom"

export default function Navbar() {
  return (
    <>

<nav class="navbar navbar-expand-lg  site-title navbar-dark bg-opacity-25 text-white " >
  <a class="navbar-brand  mx-2  fs-2" href="#">Trip Easy</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse justify-content-center" id="navbarTogglerDemo02">
    <ul class="navbar-nav  mt-2 mt-lg-0">
      <li class="nav-item active">
        <a class="nav-link fs-3" href="/home">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link fs-3" href="/about">About</a>
      </li>
      <li class="nav-item">
        <a class="nav-link fs-3"href="/contact">Contact</a>
      </li>
      {(localStorage.getItem('token'))?<><li class="nav-item active">
        <a class="nav-link fs-3 " href="#" onClick={() => {
    localStorage.removeItem('token');
    alert("Logout")
    window.location.reload()
    
  }}>Logout</a>
      </li></>:<></>}
    </ul>
  </div>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
</nav>



       
        
      

    </>

  )
}


