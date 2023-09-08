
import { Link } from "react-router-dom"
import { Header } from "../header/Header"

export const Forgotpassword = () => {
  return (

    <>
      <Header isLogo={true} />
      <section className="content-main mt-80 mb-80">
        <div className="card mx-auto card-login">
          <div className="card-body">
            <h4 className="card-title mb-4">Sign in</h4>
            <form method="POST" >
              <div className="mb-3">
                <input className="form-control" placeholder="Username or email" type="text" />
              </div>
              <div className="mb-4">
                <button type="submit" className="btn btn-primary w-100 center-flex" style={{ fontWeight: "bold" }}>Send Email</button>
              </div>
            </form>
            <p className="text-center mb-4">You have an account? <Link to="/login">Sign in</Link></p>
          </div>
        </div>
      </section>
    </>
  )
}
