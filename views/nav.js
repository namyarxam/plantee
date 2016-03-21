var firstView;
  {if(this.state.change) {
    firstView = <div>
  <div className="row">
  <Header details="Hi, I'm Plantee"/>
<div><img src={'images/plantee.png'} alt="plantee" className=""/></div>
    <section className="col s12">
    <ul>
        {this.state.loggedIn ? (
          <div>
            <li><Link to="/logout">Log out</Link> </li>
            <li><Link to="/create">Create Your Plantee</Link></li>
            {/*<Create> <Veri/> </Create>*/}
         </div>
        ) : (
          <div>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/signup">Sign up</Link></li>
         </div>
        )}
      <li><Link to="/about">About</Link></li>
    </ul>
    {this.props.children || <p>You are {!this.state.loggedIn && 'not'} logged in.</p>}
    </section>
  </div> </div>
} else {
  firstView= <div>'Hello'</div>
}
  return (
  <div>  {firstView} </div>
)
}}
})
