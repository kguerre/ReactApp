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
    startYear: "",
    endYear: ""
  };

  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res =>
        this.setState({ articles: res.data, topic: "", startYear: "", endYear: "" })
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
              <h1>Search For Articles</h1>
            </Jumbotron>
            <form>
              <Input value={this.state.topic} onChange={this.handleInputChange} name="topic" placeholder="Topic (required)" />
              <Input value={this.state.startYear} onChange={this.handleInputChange} name="start-year" placeholder="Start Year ex. 1997 (required)" />
              <Input value={this.state.endYear} onChange={this.handleInputChange} name="end-year" placeholder="End Year ex. 2007 (required)" />

              <FormBtn disabled={!(this.state.topic && this.state.startYear && this.state.endYear)} onClick={this.handleFormSubmit}>
                Submit Article
              </FormBtn>
            </form>
          </Col>
          <Col size="md-12">
            <Jumbotron>
              <h1>My Saved Articles</h1>
            </Jumbotron>
            {this.state.articles.length ? <List>
                {this.state.articles.map(article => <ListItem key={article._id}>
                    <Link to={"/articles/" + article._id}>
                      <strong>
                        {article.title}
                      </strong>
                    </Link>
                    <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                  </ListItem>)}
              </List> : <h3>No Results to Display</h3>}
          </Col>
        </Row>
      </Container>;
  }
}

export default Articles;