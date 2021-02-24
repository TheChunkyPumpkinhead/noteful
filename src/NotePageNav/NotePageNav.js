import React, {Component} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CircleButton from '../CircleButton/CircleButton'
// import NotesContext from '../NotesContext'
import './NotePageNav.css'
// import { findNote, findFolder } from "../notes-helpers";


class NotePageNav extends Component {


	

  render() {
    const {folders} = this.context
    return (
      <div className='NotePageNav'>
        <CircleButton
          tag='button'
          role='link'
          onClick={() => this.props.history.goBack()}
          className='NotePageNav__back-button'
        >
          <FontAwesomeIcon icon='chevron-left' />
          <br />
          Back
        </CircleButton>
        {folders && (
          <h3 className='NotePageNav__folder-name'>
            {folders.title}
          </h3>
        )}
      </div>
    )
      }
}

export default NotePageNav