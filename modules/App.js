import React from 'react'
import NavLink from './NavLink'

export default React.createClass({
  render() {
    return (
      
      <div>
        <nav className="navbar navbar-default">
          <div className="container">
              <div className="navbar-header">
                  <ul className="nav navbar-nav">
                      <li><NavLink to="/about">About</NavLink></li>
                      <li><NavLink to="/repos">Repos</NavLink></li>
                  </ul>
              </div>
          </div>
        </nav>
        {this.props.children}
      </div>

    )
  }
})
