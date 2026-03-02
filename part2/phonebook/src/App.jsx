import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import services from "./services/persons";
import Notification from "./components/Notification";

function App() {
  const [person, setPerson] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [search, setSearch] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    services.getAll().then((data) => {
      setPerson(data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const obPerson = {
      name: newName,
      number: newNumber,
    };
    services.create(obPerson).then((data) => {
      setPerson(person.concat(data));
      setNewName("");
      setNewNumber("");
      setSuccessMessage(`Added ${newName}`);
      setTimeout(() => {
        setSuccessMessage("");
      }, 5000);
    });
  };
  const handleDeletion = (id) => {
    const targeted = person.find((onePer) => onePer.id === id);
    if (confirm(`Delete ${targeted.name} ?`)) {
      services.clear(id).then(() => {
        setPerson(person.filter((each) => each.id !== id));
      });
    }
  };

  const isPresent = person.find(
    (each) => each.name.toLowerCase() === newName.toLowerCase(),
  );

  const updatePhone = () => {
    if (isPresent) {
      if (
        confirm(
          `${newName} is already added to the phone book. replace the old number with new one? make sure you wrote the number first.`,
        )
      ) {
        const updatedObject = {
          ...isPresent,
          number: newNumber,
        };
        services
          .update(isPresent.id, updatedObject)
          .then((res) => {
            const updated = person.map((each) =>
              each.id === isPresent.id ? res.data : each,
            );
            setPerson(updated);
            setNewName("");
            setNewNumber("");
            setSuccessMessage(`Added ${newNumber}`);
            setTimeout(() => {
              setSuccessMessage("");
            }, 5000);
          })
          .catch((error) => {
            setErrorMessage(
              `Information of ${isPresent.name} has already been removed from the server`,
            );
            setTimeout(() => {
              setErrorMessage("");
            }, 5000);
          });
      }
      setNewName("");
      setNewNumber("");
    }
  };

  const matched = person.filter((each) =>
    each.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleNewName = (e) => {
    setNewName(e.target.value);
  };
  const handleNewNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <h2>Phone book</h2>
      {successMessage || errorMessage ? (
        <Notification successMes={successMessage} errorMes={errorMessage} />
      ) : (
        ""
      )}
      <Filter value={search} onChange={handleFilter} />
      <h2>Add new</h2>

      <PersonForm
        newName={newName}
        handleNewName={handleNewName}
        onSubmit={handleSubmit}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      {isPresent
        ? updatePhone()
        : matched.map((each) => (
            <Persons
              key={each.name}
              name={each.name}
              number={each.number}
              onClick={() => handleDeletion(each.id)}
            />
          ))}
    </>
  );
}

export default App;
