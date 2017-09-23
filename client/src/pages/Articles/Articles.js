import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Articles extends Component {
  state = {
    articles: [],
    topic: "",
    start: "",
    end: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, topic: "", start: "", end: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic && this.state.startYear && this.state.endYear) {
      API.saveArticle()
        .then(res => this.loadArticles())
        .catch(err => console.log(err));
    }
  };

  render() {
    return <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 style={{ fontFamily: "Zilla Slab" }}>
                Search For Articles
              </h1>
            </Jumbotron>
            <form>
              <Input value={this.state.topic} onChange={this.handleInputChange} name="topic" placeholder="Topic (required)" />

              <Input value={this.state.start} onChange={this.handleInputChange} name="start" placeholder="Start Year ex.1997 (required)" />

              <Input value={this.state.end} onChange={this.handleInputChange} name="end" placeholder="End Year ex.2007 (required)" />

              <FormBtn disabled={!(this.state.topic && this.state.start && this.state.end)} onClick={this.handleFormSubmit}>
                Search
              </FormBtn>
            </form>
          </Col>
          <Col size="md-12">
            <Jumbotron>
              <h1 style={{ fontFamily: "Zilla Slab" }}>Results</h1>
            </Jumbotron>
            {this.state.articles.length ? <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>{article.title}</strong>
                    </Link>
                    <DeleteBtn
                      onClick={() => this.deleteArticle(article._id)}
                    />
                  </ListItem>
                ))}
              </List> : <h3 style={{ fontFamily: "Arbutus Slab" }}>
                No Results to Display
              </h3>}
          </Col>
          <Col size="md-12">
            <Jumbotron>
              <h1 style={{ fontFamily: "Zilla Slab" }}>Saved Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? <List>
                {this.state.articles.map(article => (
                  <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>{article.title}</strong>
                    </Link>
                    <DeleteBtn
                      onClick={() => this.deleteArticle(article._id)}
                    />
                  </ListItem>
                ))}
              </List> : <h3 style={{ fontFamily: "Arbutus Slab" }}>
                No Results to Display
              </h3>}
          </Col>
        </Row>
      </Container>;
  }
}

export default Articles;
