import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Container,
  Content,
} from 'native-base';

import BookSearchItemDetailsCard from '../../components/BookSearchItemDetailsCard/BookSearchItemDetailsCard';
import RenderError from '../../../../common/error/error';
import RenderMessage from '../../../../common/message/message';

import { fetchBookDetails } from '../../../../actions/bookActions';

class BookSearchItemDetails extends React.Component {
  constructor(props) {
    super(props);

    this.fetchBookDetails = this.fetchBookDetails.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    this.fetchBookDetails(id);
  }

  fetchBookDetails(id) {
    const { actions } = this.props;
    actions.fetchBookDetails(id);
  }

  render() {
    const {
      current, isFetching, error,
    } = this.props;
    if (isFetching) { return (<RenderMessage message="Loading..." />); }
    if (error) { return (<RenderError error={ error } />); }
    if (current) {
      return (
        <Container>
          <Content>
            <BookSearchItemDetailsCard current={ current } />
          </Content>
        </Container>
      );
    }
    return (<RenderMessage message="No data..." />);
  }
}

BookSearchItemDetails.propTypes = {
  current: PropTypes.shape({
    volumeInfo: PropTypes.shape({
      imageLinks: PropTypes.shape({
        smallThumbnail: PropTypes.string,
      }),
      authors: PropTypes.arrayOf(PropTypes.string),
      title: PropTypes.string,
      publishedDate: PropTypes.string,
      publisher: PropTypes.string,
      description: PropTypes.string,
      averageRating: PropTypes.number,
    }),
  }),
  isFetching: PropTypes.bool.isRequired,
  error: PropTypes.shape({
    status: PropTypes.number,
    data: PropTypes.string,
  }),
  actions: PropTypes.shape({
    fetchBookDetails: PropTypes.func,
  }).isRequired,
};

BookSearchItemDetails.defaultProps = {
  current: null,
  error: null,
};

const mapStateToProps = state => ({
  current: state.books.current,
  isFetching: state.books.isFetching,
  error: state.books.error,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ fetchBookDetails }, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BookSearchItemDetails);
