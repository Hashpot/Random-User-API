import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <Table />
    </div>
  );
  }

const Table = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [users, setUsers] = useState([])

  const fetchData = async () => {
    await fetch("https://randomuser.me/api/?results=10")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUsers(data.results);
      })
    }
      
    useEffect( () => {
      fetchData();
    }, [])

  return (
    <>
     {users &&
      <div>
        <Selected selectedPerson={users[selectedIndex]} />
        <table style={{ width: "100vw" }}>
          <tbody>
            <tr>
              <th>name</th>
              <th>email</th>
              <th>phone</th>
              <th>photo</th>
              <th>show</th>
            </tr>
            {users?.map((item, index) => {
              return (
                <tr key={item.id.value ?? index}>
                  <td>{`${item.name.title} ${item.name.first} ${item.name.last}`}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>
                    <img alt="User thumbnail" width={50} height={50} src={item.picture.thumbnail} />
                  </td>
                  <td>
                    <button onClick={() => setSelectedIndex(index)}>Show</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    }
  </>
  );
};

// Current selected person component

const Selected = ({selectedPerson}) => {
  const person = selectedPerson;
  const name = `${person?.name?.title} ${person?.name?.first} ${person?.name?.last}`; 

  const dateJoined = new Date(person?.registered.date);

  return (
    <>
      {person && 
      <div>
        <h1>{name}</h1>
        <img alt="Selected Person" width={100} height={100} src={person.picture.medium} />
        <p>Joined: {dateJoined.toDateString()} ({getYears(new Date(dateJoined))} years ago)</p>
      </div>
      }
    </>
  );
};

const getYears = (date) =>{
  const diff = Date.now() - new Date(date);
  const mill = new Date(diff);
  return Math.abs(mill.getUTCFullYear() - 1970).toString();
}