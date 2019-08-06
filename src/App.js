import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import Movies from './components/movies/movies';
import Info from './components/info/info';
import Edit from './components/edit/edit';
import DeleteMovie from './components/delete/delete';
import Add from './components/add/add';
import Modal from './components/UI/Modal/Modal';
import * as actions from './store/actions';
import Layout from './components/layout/layout';
import { searchMovies } from './services/movies';
import ModalContext from './context/modal-context';
import SearchContext from './context/search-context';
import Spinner from './components/UI/Spinner/Spinner';
import Aux from './hoc/Aux';

class App extends Component {

  state = {
    moviesList: null,
    showInfoModal: false,
    showEditModal: false,
    showDeleteModal: false,
    showAddModal: false,
    movie: null
  }

  componentDidMount() {
    this.props.getMovies();
  }

  showInfoModalHandler = (movie) => {
    this.setState(prevState => ({
      showInfoModal: !prevState.showInfoModal,
      movie: movie
    }))
  }

  showEditModalHandler = (movie) => {
    this.setState(prevState => ({
      showEditModal: !prevState.showEditModal,
      movie: movie
    }))
  }

  showDeleteModalHandler = (movie) => {
    this.setState(prevState => ({
      showDeleteModal: !prevState.showDeleteModal,
      movie: movie
    }))
  }

  showAddModalHandler = () => {
    this.setState(prevState => ({
      showAddModal: !prevState.showAddModal
    }))
  }

  saveEditedMovie = (movie) => {
    this.props.editMovie(movie);
    this.setState({ showEditModal: false });
  }

  saveAddedMovie = (movie) => {
    this.props.addMovie(movie);
    this.setState({ showAddModal: false });
  }

  removeMovie = () => {
    this.props.removeMovie(this.state.movie);
    this.setState({ showDeleteModal: false });
  }

  setMoviesBySearchValue = (searchValue) => {
    if (this.props.movies) {
      const movies = searchMovies(searchValue, this.props.movies);
      this.setState({
        moviesList: movies
      })
    }
  }

  render() {

    let movies = <Spinner />;
    if (this.props.movies) {
      movies = <Movies movies={this.state.moviesList || this.props.movies} />
      // setMovies(this.props.movies);
    }

    let infoModal = null;
    if (this.state.showInfoModal) {
      infoModal = (
        <Modal show={this.state.showInfoModal} modalClosed={() => this.showInfoModalHandler(null)}>
          <Info movie={this.state.movie} infoBtn={() => this.showInfoModalHandler(null)} />
        </Modal>
      )
    }

    let editModal = null;
    if (this.state.showEditModal) {
      editModal = (
        <Modal show={this.state.showEditModal}
          modalClosed={() => this.showEditModalHandler(null)}
        >
          <Edit
            moviesData={this.props.movies}
            id={this.state.movie.id}
            img={this.state.movie.img}
            Title={this.state.movie.Title}
            Year={this.state.movie.Year}
            Runtime={this.state.movie.Runtime}
            Genre={this.state.movie.Genre}
            Director={this.state.movie.Director}
            cancel={() => this.showEditModalHandler(null)}
            save={(movie) => this.saveEditedMovie(movie)}
          />
        </Modal>
      )
    }


    let deleteModal = null;
    if (this.state.showDeleteModal) {
      deleteModal = (
        <Modal show={this.state.showDeleteModal}
          modalClosed={() => this.showDeleteModalHandler(null)}
        >
          <DeleteMovie
            cancel={() => this.showDeleteModalHandler(null)}
            delete={this.removeMovie}
          />
        </Modal>
      )
    }

    let showAddModal = null;
    if (this.state.showAddModal) {
      showAddModal = (
        <Modal show={this.state.showAddModal}
          modalClosed={() => this.showAddModalHandler(null)}
        >
          <Add
            moviesData={this.props.movies}
            cancel={this.showAddModalHandler}
            save={(movie) => this.saveAddedMovie(movie)}
          />
        </Modal>
      )
    }

    return (
      <Aux>
        <ModalContext.Provider
          value={{
            showInfoModal: this.showInfoModalHandler,
            showEditModal: this.showEditModalHandler,
            showDeleteModal: this.showDeleteModalHandler,
            showAddModal: this.showAddModalHandler,
          }}
        >
          <SearchContext.Provider
            value={{ setMoviesBySearchValue: this.setMoviesBySearchValue }}
          >
            <Layout>
              {movies}
              {showAddModal}
              {infoModal}
              {editModal}
              {deleteModal}
            </Layout>
          </SearchContext.Provider>
        </ModalContext.Provider>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    movies: state.moviesReducer.movies
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getMovies: () => dispatch(actions.getMovies()),
    editMovie: (movie) => dispatch(actions.editMovie(movie)),
    removeMovie: (movie) => dispatch(actions.removeMovie(movie)),
    addMovie: (movie) => dispatch(actions.addMovie(movie)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
