import {Component} from 'react'

import './App.css'

import {v4} from 'uuid'

const InputItem = props => {
  const {itemDetails, isChecked, onDeleteItem} = props
  const {id, websiteName, password, userName} = itemDetails

  const passwordItem = isChecked ? (
    <p>{password}</p>
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
    />
  )
  const initial = websiteName[0].toLowerCase()

  const onClickDelete = () => {
    onDeleteItem(id)
  }

  return (
    <li className="list-item-container">
      <div className="initial-section">{initial}</div>
      <div className="text-cont">
        <p>{websiteName}</p>
        <p>{userName}</p>
        {passwordItem}
      </div>
      <div className="button-count">
        <button type="button" className="delete-button" onClick={onClickDelete}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

class AddNewPassword extends Component {
  state = {
    contentList: [],
    websiteName: '',
    userName: '',
    password: '',
    searchInput: '',
    isChecked: false,
  }

  renderNoPasswordsView = () => (
    <div className="no-password-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-pass-img"
      />
      <p>No Passwords</p>
    </div>
  )

  onAddPassword = event => {
    event.preventDefault()
    const {websiteName, userName, password} = this.state
    const newItem = {
      id: v4(),
      websiteName,
      userName,
      password,
    }

    this.setState(prevState => ({
      contentList: [...prevState.contentList, newItem],
      websiteName: '',
      userName: '',
      password: '',
    }))
  }

  onChangeWebsite = event => {
    this.setState({websiteName: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({userName: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChecked = () => {
    this.setState(prev => ({isChecked: !prev.isChecked}))
  }

  onChangeClick = event => {
    this.setState({searchInput: event.target.value})
  }

  onDeleteItem = id => {
    const {contentList} = this.state
    const updatedList = contentList.filter(each => each.id !== id)
    this.setState({contentList: updatedList})
  }

  render() {
    const {
      websiteName,
      userName,
      password,
      isChecked,
      contentList,
      searchInput,
    } = this.state

    const updatedList = contentList.filter(each =>
      each.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const count = updatedList.length

    return (
      <div>
        <div className="password-container">
          <div className="sub-password-container">
            <h1>Add New Password</h1>
            <form
              className="password-form-container"
              onSubmit={this.onAddPassword}
            >
              <div>
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                  />
                </div>
                <input
                  className="input"
                  value={websiteName}
                  onChange={this.onChangeWebsite}
                  placeholder="Enter Website"
                />
              </div>
              <div>
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                  />
                </div>
                <input
                  className="input"
                  value={userName}
                  onChange={this.onChangeUsername}
                  placeholder="Enter UserName"
                />
              </div>
              <div>
                <div className="img-container">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                  />
                </div>
                <input
                  className="input"
                  type="password"
                  value={password}
                  onChange={this.onChangePassword}
                  placeholder="Enter Password"
                />
              </div>
              <button className="btn" type="submit">
                Add
              </button>
            </form>
          </div>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
          />
        </div>
        <div>
          <div>
            <div>
              <h1>Your Passwords</h1>
              <p>{count}</p>
            </div>
            <div>
              <div className="img-container">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                  alt="search"
                />
              </div>
              <input
                className="input"
                type="search"
                onChange={this.onChangeClick}
                placeholder="Search"
              />
            </div>
            <hr />
            <div>
              <input
                type="checkbox"
                checked={isChecked}
                id="showPassword"
                onChange={this.onChecked}
              />
              <label htmlFor="showPassword"> Show passwords</label>
            </div>
            {count === 0 ? (
              this.renderNoPasswordsView()
            ) : (
              <ul className="ul">
                {updatedList.map(eachList => (
                  <InputItem
                    key={eachList.id}
                    itemDetails={eachList}
                    isChecked={isChecked}
                    onDeleteItem={this.onDeleteItem}
                  />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    )
  }
}

const App = () => (
  <div className="bg-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
      alt="app logo"
    />
    <AddNewPassword />
  </div>
)

export default App
