import React, { Component } from "react";
import { Col, PageHeader, Glyphicon, Button, Thumbnail } from "react-bootstrap";
import "./index.css";

class Home extends Component {
  state = {
    isLoading: true,
    deals: [],
    error: null
  };

  render() {
    const { isLoading, deals, error } = this.state;
    return (
      <div id="parent">
        <React.Fragment>
          {error ? <p>{error.message}</p> : null}
          {!isLoading ? (
            deals.tv_shows.map(deal => {
              const {
                id,
                name,
                country,
                network,
                image_thumbnail_path,
                start_date,
                end_date,
                status,
                permalink
              } = deal;

              const extra = (
                <a>
                  <Glyphicon glyph="align-left" />
                  {network}
                </a>
              );
              return (
                <Col
                  xs={12}
                  s={12}
                  md={4}
                  lg={3}
                  key={id}
                  style={{ paddingBottom: "25px", height: "auto" }}
                >
                  <a href="">
                    <Thumbnail>
                      <img
                        src={image_thumbnail_path}
                        alt="242x200"
                        alt=""
                        style={{ width: "100%", height: "350px" }}
                      />
                      <h3>{name}</h3>
                      <p>{status}</p>
                      <p>{country}</p>
                      <p>{extra}</p>
                    </Thumbnail>
                  </a>
                </Col>
              );
            })
          ) : (
            // If there is a delay in data, let's let the deal know it's loading
            <h1 style={{ textAlign: "center", color: "#FFFFFF" }}>
              <Glyphicon glyph="refresh" />
            </h1>
          )}
        </React.Fragment>
      </div>
    );
  }
  fetchDeals() {
    // Where we're fetching data from
    fetch(`https://www.episodate.com/api/most-popular?page=1`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the deals state
      .then(data =>
        this.setState({
          deals: data,
          isLoading: false
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchDeals();
  }
}

export default Home;
