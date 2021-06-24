import Header from "../../components/header/emptyHeader"
import UserHeaderSections from "../../components/header/userMenus/userMenuSections"
import UserCard from "../../components/userCard/userCard"
import "./members.scss"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Input } from "antd"
const { Search } = Input

const Members = () => {
  const token = useSelector((state) => state.user.token)
  const [users, setUsers] = useState([])
  const [committee, setCommittee] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const committeeFetch = await fetch(
        process.env.REACT_APP_API_URL + "/users/all/committee",
        {
          headers: new Headers({
            Authorization: "Bearer " + token,
          }),
        }
      )
      const committeeFetchJson = await committeeFetch.json()
      setCommittee(committeeFetchJson)

      const usersFetch = await fetch(
        process.env.REACT_APP_API_URL + "/users/all/members",
        {
          headers: new Headers({
            Authorization: "Bearer " + token,
          }),
        }
      )
      const usersFetchJson = await usersFetch.json()
      setUsers(usersFetchJson)
    }
    fetchData()
  }, [token])

  const onSearch = (value) => {}

  return (
    <>
      <Header>
        <UserHeaderSections />
      </Header>
      <div className="users__body">
        <h1 className="user__title">Our Enthusiastic Team</h1>
        {committee.map((user, index) => (
          <UserCard
            key={index}
            name={user.firstName + " " + user.lastName}
            position={user.position}
            points={user.points}
            avatar={user.imageData}
            id={user._id}
          />
        ))}
      </div>
      <div className="users__body">
        <h1 className="user__title">Our valued Members</h1>
        <Search
          placeholder="Search User"
          enterButton
          style={{ width: "80%", margin: "20px 0" }}
          onSearch={onSearch}
        />
        {users.map((user, index) => (
          <UserCard
            key={index}
            name={user.firstName + " " + user.lastName}
            position={user.position}
            points={user.points}
            avatar={user.imageData}
            id={user._id}
          />
        ))}
      </div>
    </>
  )
}

export default Members
