import React, { Component } from 'react';
import NotesContext from '../NotesContext';
import config from '../config';
import PropTypes from 'prop-types';
import NotefulForm from "../NotefulForm/NotefulForm";
import "./AddNote.css";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteName: '',
      noteContent: '',
      folder: '',
      folder_id: '',
      validNoteMessage: '',
      validNoteName: false,
      validContentMessage: '',
      validContent: false,
      validFolderMessage: '',
      validFolder: false,
      datetime: new Date()
    };
  }

  static contextType = NotesContext;

  updateNoteName(name) {
    this.setState({ noteName: name }, () => { this.validateNoteName(name); });
  }

  updateNoteContent(content) {
    this.setState({ noteContent: content }, () => { this.validateNoteContent(content); });
  }

  updateFolder(name) {
    console.log(name);
    this.setState({ folder: name }, () => { });
  }

  // validateFolder(name) {
  //   let errorMsg = this.state.validFolderMessage;
  //   let hasError = false;
  //   if (this.context.folders.find((folder) => folder.name === name) === undefined) {
  //     errorMsg = 'Please select a valid folder'
  //     hasError = true;
  //   } else {
  //     errorMsg = '';
  //     hasError = false;
  //   }
  //   this.setState({
  //     validFolderMessage: errorMsg,
  //     validFolder: !hasError
  //   })
  // }

  validateNoteName(name) {
    let errorMsg = this.state.validNoteMessage;
    let hasError = false;
    name = name.trim();
    if (name.length < 3) {
      errorMsg = 'Please enter a note name at least 3 characters long';
      hasError = true;
    } else {
      errorMsg = '';
      hasError = false;
    }
    this.setState({
      validMessage: errorMsg,
      validNoteName: !hasError
    });
  }

  validateNoteContent(content) {
    let errorMsg = this.state.validContentMessage;
    let hasError = false;
    content = content.trim();
    if (content.length < 3) {
      errorMsg = 'Please enter content that is at least 3 characters long';
      hasError = true;
    } else {
      errorMsg = '';
      hasError = false;
    }
    this.setState({
      validContentMessage: errorMsg,
      valdContent: !hasError
    });
  }

  addNoteRequest(name, content, folder_id, date, addNote) {
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ title: name, content: content, date_published: date, folder_id: folder_id })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Couldn\'t add note. Sorry!');
        }
        return res.json();

      })
      .then(res => {
        addNote(res);
        this.context.getNotes();
      })


      .catch(err => console.log(err));
  }

  render() {
    console.log(this.props);


    this.handleSubmit = (event) => {
      event.preventDefault();
      console.log(this.state.folder.id);
      this.addNoteRequest(event.target.name.value, event.target.content.value, (event.target.folder_id.value)
        //folder.name === this.state.folder).id
        , new Date(), addNote);

      this.props.history.push("/");
    };

    const { addNote } = this.context;

    return (
      <section className="AddNote">
        <h2>Create a note</h2>
        <NotefulForm onSubmit={this.handleSubmit}>
          <div className="field">
            <label htmlFor="note-name-input">Name</label>
            <input type="text" id="note-name-input" name="name" />
          </div>
          <div className="field">
            <label htmlFor="note-content-input">Content</label>
            <textarea id="note-content-input" name="content" />
          </div>
          <div className="field">
            <label htmlFor="note-folder-select">Folder</label>
            <select id="note-folder-select" name="folder_id">
              <option value={null}>...</option>
              {this.context.folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.title}
                </option>
              ))}
            </select>
          </div>
          <div className="buttons">
            <button type="submit">Add note</button>
          </div>
        </NotefulForm>
      </section>
    );
    //   <div>
    //     <form onSubmit={(event) => this.handleSubmit(event)}>
    //       <label > Note Name
    //         <input required placeholder="Note name" onChange={(e) => this.updateNoteName(e.target.value)}></input>
    //       </label>
    //       <label> Note content
    //         <input placeholder="Note content" onChange={(e) => this.updateNoteContent(e.target.value)}></input>
    //       </label>
    //       <label> Folder Name
    //         <select required
    //         name="folder_id" onChange={(e) =>  this.updateFolder(e.target.value)}>
    //           <option>

    //           </option>
    //           {this.context.folders.map(folder=> <option 
    //           value={folder.id}
    //           key={folder.id}>
    //             {folder.name}
    //             </option>)}
    //         </select>



    //       </label>
    //       <button type="submit">Submit</button>
    //     </form>
    //     {!this.state.validNoteName ? <p>{this.state.validNoteMessage}</p> : <></>}
    //     {!this.state.validContent ? <p>{this.state.validContentMessage}</p> : <></>}
    //     {!this.state.validFolder ? <p>{this.state.validFolderMessage}</p> : <> </>}
    //   </div>
    // )
  }
}
AddNote.propTypes = {
  history: PropTypes.any
};