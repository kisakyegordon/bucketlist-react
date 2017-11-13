import React from 'react'
import Breadcrumb from './Breadcrumb'
import Bucket from './Bucket'
import PropTypes from 'prop-types';
import {getBuckets} from "../../actions/buckets";
import {formatDate} from "../../utilities/Utils";
import Pagination from "../pagination/Pagination";
import CreateBucket from "./CreateBucket";
import BucketSearch from "./BucketSearch";
import {withRouter} from 'react-router-dom';
import {BASE_URL} from "../../utilities/Constants";

class Buckets extends React.Component {

  componentDidMount() {
    this.props.dispatch(getBuckets(this.props.bucketUrl, this.props.isAuthenticated, this.props.buckets.search.isSearch))
  }

  /**
   * Fetch the Buckets at the provided URL when a pagination number is clicked.
   * @param url Buckets URL
   */
  onChangeUrl = url => {
    this.props.dispatch(getBuckets(url, this.props.isAuthenticated, this.props.isSearch))
  };

  paginationUrl = () => {
    let url = BASE_URL + "bucketlists/?page=";
    if (this.props.isSearch && this.props.query) {
      url = BASE_URL + `bucketlists/?q=${this.props.query}&page=`;
    }
    return url
  };

  render() {
    const count = this.props.buckets.count;
    const next = this.props.buckets.next;
    const previous = this.props.buckets.previous;
    const isAuth = this.props.isAuthenticated;
    const dispatch = this.props.dispatch;
    const bucketUrl = this.props.bucketUrl;

    if (!this.props.isAuthenticated) {
      this.props.history.push("login");
    }

    return (
        <div className="container main-content">

          <Breadcrumb/>

          <div className="row">
            <CreateBucket dispatch={this.props.dispatch} isAuthenticated={this.props.isAuthenticated}/>

            <BucketSearch dispatch={this.props.dispatch} isAuthenticated={this.props.isAuthenticated}/>
          </div>

          <hr></hr>

          {this.props.buckets
              ?
              <div className="row">
                {this.props.buckets.buckets.map((bucket, index) =>
                    <Bucket key={bucket.id} index={index} id={bucket.id} name={bucket.name} dispatch={dispatch}
                            isAuthenticated={isAuth} modifiedAt={formatDate(bucket.modifiedAt)}/>
                )}
              </div>
              :
              <div className="row">
                <p>Looks like you do not have Buckets yet!</p>
              </div>
          }
          <Pagination count={count} next={next} previous={previous} bucketUrl={bucketUrl} dispatch={dispatch}
                      isAuthenticated={isAuth}  onChangeUrl={this.onChangeUrl} paginationUrl={this.paginationUrl}/>
        </div>
    );
  }
}

Buckets.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  buckets: PropTypes.object,
  bucketUrl: PropTypes.string,
  isSearch: PropTypes.bool,
  query: PropTypes.string,
};


export default withRouter(Buckets)