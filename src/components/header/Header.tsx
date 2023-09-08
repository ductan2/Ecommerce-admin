import { useState } from "react"
import { Link } from "react-router-dom"
import logo from "../../../public/assets/imgs/theme/logo.svg"
import { Search } from "../search/Search"

type props = {
  isLogo?: boolean
  toggleSidebar?: () => void
}

export const Header = ({ isLogo, toggleSidebar }: props) => {

  const [darkMode, setDarkMode] = useState(true)
  const handleDarkMode = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.querySelector('body')?.classList.add('dark')
    } else {
      document.querySelector('body')?.classList.remove('dark')
    }
  }


  return (
    <header className="main-header navbar">
      {
        isLogo ? (
          <div className="col-brand">
            <Link to="/admin" className="brand-wrap">
              <img src={logo} className="logo" alt="Nest Dashboard" />
            </Link>
          </div>
        ) : (
          <div className="col-search">
            <form className="searchform">
              <Search />
            </form>
          </div>
        )
      }





      <div className="col-nav">
        <button className="btn btn-icon btn-mobile me-auto" data-trigger="#offcanvas_aside" onClick={toggleSidebar}>
          <i className="material-icons md-apps"></i>
        </button>
        <ul className="nav">
          <li className="nav-item">
            <a className="nav-link btn-icon" href="#">
              <i className="material-icons md-notifications animation-shake"></i>
              <span className="badge rounded-pill">3</span>
            </a>
          </li>
          <li className="nav-item" onClick={handleDarkMode}>
            <a className="nav-link btn-icon darkmode" > <i className="material-icons md-nights_stay"></i> </a>
          </li>
          <li className="nav-item">
            <a href="#" className="requestfullscreen nav-link btn-icon"><i className="material-icons md-cast"></i></a>
          </li>

          <li className="dropdown nav-item">
            <a className="dropdown-toggle" data-bs-toggle="dropdown" href="#" id="dropdownAccount" aria-expanded="false">
              <img className="img-xs rounded-circle" src="assets/imgs/people/avatar-2.png" alt="User" /></a>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownAccount">
              <a className="dropdown-item" href="#"><i className="material-icons md-perm_identity"></i>Edit Profile</a>
              <a className="dropdown-item" href="#"><i className="material-icons md-settings"></i>Account Settings</a>
              <a className="dropdown-item" href="#"><i className="material-icons md-account_balance_wallet"></i>Wallet</a>
              <a className="dropdown-item" href="#"><i className="material-icons md-receipt"></i>Billing</a>
              <a className="dropdown-item" href="#"><i className="material-icons md-help_outline"></i>Help center</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item text-danger" href="#"><i className="material-icons md-exit_to_app"></i>Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </header>
  )
}
