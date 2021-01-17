import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Form from './Form/Form';
import Search from './Search/Search';
import Section from './Section/Section';
import ContactList from './ContactList/ContactList';
import {
  addContact,
  deleteContact,
  setFilter,
} from '../redux/phonebook/phonebook-actions';

const App = ({ contacts, filter, addContact, setFilter, deleteContact }) => {
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getFilteredContacts = () =>
    contacts.filter(contact => {
      return contact.name
        .toLocaleLowerCase()
        .includes(filter.toLocaleLowerCase());
    });

  const filteredContacts = getFilteredContacts();
  return (
    <div>
      <Section title="Phonebook">
        <Form onSubmit={addContact} />
      </Section>
      <Section title="Contacts">
        {contacts.length > 0 && (
          <>
            <Search onChange={setFilter} filter={filter} />
            {filteredContacts.length > 0 ? (
              <ContactList
                contacts={filteredContacts}
                onDelete={deleteContact}
              />
            ) : (
              <span>Contacts is not found</span>
            )}
          </>
        )}
        {!contacts.length && <span>No contacts yet. Add contacts</span>}
      </Section>
    </div>
  );
};

const mapStateToProps = state => ({
  contacts: state.phonebook.items,
  filter: state.phonebook.filter,
});

const mapDispatchToProps = dispatch => ({
  addContact: newContact => dispatch(addContact(newContact)),
  setFilter: filter => dispatch(setFilter(filter)),
  deleteContact: id => dispatch(deleteContact(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
