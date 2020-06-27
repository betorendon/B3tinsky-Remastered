import React, { Component } from "react"
import { Link } from "gatsby"
import navStyles from "../styles/components/navbar.module.scss";

class Navbar extends Component {

  render() {
    return (
      <nav>
          <div className={navStyles.menuIcon}>
            {/* <i class="fa fa-terminal fa-2x"></i> */}
          </div>
          <Link className={navStyles.logo} to="/">B3TINSKY</Link>
          <ul>
            <li>
              <Link className={navStyles.listLink} to="/about">About</Link>
            </li>
            <li>
              <Link className={navStyles.listLink} to="/blog">Blog</Link>
            </li>
          </ul>
      </nav>
    )
  }
}
export default Navbar;