
export const HeaderLogin = () => {
   return (
      <header className="main-header style-2 navbar">
         
         <div className="col-nav">
            <ul className="nav">
               <li className="nav-item">
                  <a className="nav-link btn-icon" href="#">
                     <i className="material-icons md-notifications animation-shake"></i>
                     <span className="badge rounded-pill">3</span>
                  </a>
               </li>
               <li className="nav-item">
                  <a className="nav-link btn-icon darkmode" href="#"> <i className="material-icons md-nights_stay"></i> </a>
               </li>
               <li className="nav-item">
                  <a href="#" className="requestfullscreen nav-link btn-icon"><i className="material-icons md-cast"></i></a>
               </li>
               <li className="dropdown nav-item">
                  <a className="dropdown-toggle" data-bs-toggle="dropdown" href="#" id="dropdownLanguage" aria-expanded="false"><i className="material-icons md-public"></i></a>
                  <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownLanguage">
                     <a className="dropdown-item text-brand" href="#"><img src="assets/imgs/theme/flag-us.png" alt="English" />English</a>
                     <a className="dropdown-item" href="#"><img src="assets/imgs/theme/flag-fr.png" alt="Français" />Français</a>
                     <a className="dropdown-item" href="#"><img src="assets/imgs/theme/flag-jp.png" alt="Français" />日本語</a>
                     <a className="dropdown-item" href="#"><img src="assets/imgs/theme/flag-cn.png" alt="Français" />中国人</a>
                  </div>
               </li>
               <li className="dropdown nav-item">
                  <a className="dropdown-toggle" data-bs-toggle="dropdown" href="#" id="dropdownAccount" aria-expanded="false"> <img className="img-xs rounded-circle" src="assets/imgs/people/avatar-2.png" alt="User" /></a>
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
