import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// function ListContacts(props) {
//   return (
//     <ol className="contact-list">
//       {props.contacts.map((contact) => (
//         <li key={contact.id} className="contact-list-item">
//           <div
//             className="contact-avatar"
//             style={{ backgroundImage: `url(${contact.avatarURL})` }}
//           ></div>
//           <div className="contact-details">
//             <p>{contact.name}</p>
//             <p>{contact.handle}</p>
//           </div>
//           <button
//             className="contact-remove"
//             onClick={() => props.onDeleteContact(contact)}
//           >
//             Remove
//           </button>
//         </li>
//       ))}
//     </ol>
//   );
// }

// // create a prop type to limit the types of props
// ListContacts.PropTypes = {
//   contacts: PropTypes.array.isRequired,
//   onDeleteContact: PropTypes.func.isRequired,
// };

class ListContacts extends Component {
  // create a prop type to limit the types of props
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired,
  };
  state = {
    query: "",
  };
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };
  clearQuery = () => {
    this.updateQuery("");
  };
  render() {
    const { query } = this.state;
    const { contacts, onDeleteContact } = this.props;
    const showingContacts =
      query === ""
        ? contacts
        : contacts.filter((c) =>
            c.name.toLowerCase().includes(query.toLowerCase())
          );

    return (
      <div className="list-contacts">
        <div className="list-contacts-top">
          <input
            className="search-contacts"
            type="text"
            placeholder="Search Contacts"
            value={query}
            onChange={(event) => {
              this.updateQuery(event.target.value);
            }}
          />
          <Link to="/create" className="add-contact">
            Add Contact
          </Link>
        </div>
        {showingContacts.length !== contacts.length && (
          <div className="showing-contacts">
            <span>
              Now showing {showingContacts.length} of {contacts.length}
            </span>
            <button onClick={this.clearQuery}>Show All</button>
          </div>
        )}
        <ol className="contact-list">
          {showingContacts.map((contact) => (
            <li key={contact.id} className="contact-list-item">
              <div
                className="contact-avatar"
                style={{ backgroundImage: `url(${contact.avatarURL})` }}
              ></div>
              <div className="contact-details">
                <p>{contact.name}</p>
                <p>{contact.handle}</p>
              </div>
              <button
                className="contact-remove"
                onClick={() => onDeleteContact(contact)}
              >
                Remove
              </button>
            </li>
          ))}
        </ol>
      </div>
    );
  }
}

export default ListContacts;
