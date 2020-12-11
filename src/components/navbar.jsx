import React, { Component } from "react"
import { Link } from "gatsby"
import navStyles from "../styles/components/navbar.module.scss";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
class Navbar extends Component {
  state = {
    scrolled: false,
    open: true
  }

  componentDidMount() {
    window.addEventListener('scroll', this.navOnScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.navOnScroll)
  }

  navOnScroll = () => {
    if (window.scrollY > 20) {
      this.setState({ scrolled: true })
    } else {
      this.setState({ scrolled: false })
    }
  }
  
  handleClick = () => {
    if (this.state.open === true) {
      this.setState({ open: false })
    } else {
      this.setState({ open: true })
    }
  }
  render() {
    const { scrolled } = this.state
    const { open } = this.state
    return (
      <nav className={scrolled ? navStyles.black : navStyles.transparent}>
          <div className={navStyles.menuIcon}>
            
          <FontAwesomeIcon icon={faTerminal} transform="down-7 grow-2.5" onClick={this.handleClick}/>
          </div>
          <Link className={navStyles.logo} to="/">B3TINSKY</Link>
          <ul className={open ? navStyles.showing : ""}>
            <li>
              <Link className={navStyles.listLink} to="/about">About</Link>
            </li>
            <li>
              <Link className={navStyles.listLink} to="/blog">Blog</Link>
            </li>
            <li>
              <Link className={navStyles.listLink} to="/projects">Projects</Link>
            </li>
            <li>
              <Link className={navStyles.listLink} to="/challenges">Challenges</Link>
            </li>
          </ul>
      </nav>
    )
  }
}
export default Navbar;