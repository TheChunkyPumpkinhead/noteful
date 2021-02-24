import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Note.css';
import NotesContext from '../NotesContext';
import config from '../config';
import PropTypes from 'prop-types';
import moment from "moment"



class Note extends Component {
  deleteRequest = (noteId, callback) => {
    fetch(`${config.API_ENDPOINT}/notes/${noteId}`, {


      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(error => {
            throw error;
          });
        }
        return res.json();
      })
      .then(res => callback(noteId))
      .catch(error => {
        console.log((error.message));
      });
  };


  render() {
    console.log(this.props.match.path);
    return (
      <NotesContext.Consumer>
        {(context) => (
          <div className='Note'>
            <h2 className='Note__title'>
              <Link to={`/note/${this.props.id}`}>
                {this.props.title}
              </Link>
            </h2>
            <button className='Note__delete' type='button'
              onClick={() => {
                this.deleteRequest(this.props.id, context.deleteNote);
                if (this.props.match.path === "/note/:noteId") {
                  this.props.history.push('/');
                }
              }}
            >
              <FontAwesomeIcon icon='trash-alt' />
              {' '}
            remove
          </button>
            <div className='Note__dates'>
              <div className='Note__dates-date_published'>
                date_published
              {' '}
                <span className='Date'>
                  {this.props.date_published?moment(this.props.date_published).format( 'Do MMM YYYY'):null}
                </span>
              </div>
            </div>
          </div>
        )}
      </NotesContext.Consumer>
    );
  }
}
Note.propTypes = {
  history: PropTypes.any,
  id: PropTypes.number,
  name: PropTypes.string,
  match: PropTypes.any,


};

export default Note;