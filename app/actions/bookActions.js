import axios from 'axios';

const prefix = '[books]';

export const booksActionsTypes = {
  SEARCH_REQUEST: `${prefix} Search Request`,
  SEARCH_SUCCESS: `${prefix} Search Success`,
  SEARCH_ERROR: `${prefix} Search Error`,

  BOOK_DETAILS_REQUEST: `${prefix} BOOK Details Request`,
  BOOK_DETAILS_SUCCESS: `${prefix} BOOK Details Success`,
  BOOK_DETAILS_ERROR: `${prefix} BOOK Details Error`,
};

export const searchRequest = () => ({ type: booksActionsTypes.SEARCH_REQUEST });
export const searchSuccess = payload => ({ type: booksActionsTypes.SEARCH_SUCCESS, payload });
export const searchError = payload => ({ type: booksActionsTypes.SEARCH_ERROR, payload });

export const bookDetailsRequest = () => ({ type: booksActionsTypes.BOOK_DETAILS_REQUEST });
export const bookDetailsSuccess = payload => ({ type: booksActionsTypes.BOOK_DETAILS_SUCCESS, payload });
export const bookDetailsError = payload => ({ type: booksActionsTypes.BOOK_DETAILS_ERROR, payload });


export const fetchBooks = (searchPhrase) => {
    return async (dispatch) => {
      dispatch(searchRequest());
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchPhrase}`)
      if (response.status == 200) {
        return dispatch(searchSuccess(response.data));
      } else {
        console.log('err')
        // return dispatch(searchError([json.details]));
      }
    };
  };

  export const fetchBookDetails = (bookId) => {
    return async (dispatch) => {
      dispatch(bookDetailsRequest());
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`);
      if (response.status == 200) {
        return dispatch(bookDetailsSuccess(response.data));
      } else {
        console.log('err')
        // return dispatch(searchError([json.details]));
      }
    }
  }